"use client"
import React, { FC } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'; 
import { useTranslations } from 'next-intl';

interface DropdownProps {
  selectedValue: string;
  onSelectionChange: (value: string) => void;
  items: { key: string; label: string }[];
  describe:string;
  classNames?: {}
  fullHeight?:boolean;
}

const DropdownComponent: FC<DropdownProps> = ({
  selectedValue,
  onSelectionChange,
  items ,
  describe,
  classNames,
  fullHeight,
}) => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([selectedValue]));

  const handleSelectionChange = (selectedItems:any) => {
    const selectedKey = selectedItems.currentKey;      
    setSelectedKeys(selectedKey);
    onSelectionChange(selectedKey);

  };

  const t = useTranslations("shop");

  return (
    <Dropdown aria-labelledby='label' className={`bg-primary-700 ${fullHeight ? 'h-full' : ''}`} classNames={{ trigger: [fullHeight ? 'h-full': '']}}>
      <DropdownTrigger aria-label='label'>
      <Button
          variant="bordered"
          className="capitalize bg-primary-800 border-primary-800 relative"
          style={{ paddingRight: '32px' }} // Add padding for the arrow
          aria-labelledby='label'
        >
         {items.filter(i => i.key === selectedValue)[0]?.label || selectedValue || describe}
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            {/* Dropdown arrow SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 12l-6-6h12l-6 6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        style={{ maxHeight: "150px", overflowY: "auto" }}
        selectedKeys={selectedKeys}
        onSelectionChange={(e) => handleSelectionChange(e)}
      >
        {items.map((item) => (
           
          <DropdownItem description={describe} key={item.key}>{item.label}</DropdownItem>
        
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownComponent;