'use client'
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import React from "react";

interface ThemeInputProps {
  value?: string;
  color?: string;
  label?: string;
  type?: "email" | "text" | "password" | "number";
  endItem?: any;
  placeholder?: string;
  className?: string;
  radius?: string;
  name?: string;
  errorMessage?: string;
  classNames?: {
    inputWrapper?: string[];
    label?: string[];
    trigger?: string[];
  };
  extras?: any;
  onChange?: (e: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
  onEnter?: () => void;
  onClear?: () => void;
  onPaste?: () => void;
  items?: {label: string; value: string}[]
}
const ThemeSelect = (props: ThemeInputProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const className = "bg-primary-800 rounded-xl xs:rounded-md focus:outline-none";
  const classnames = {
    inputWrapper: [
      "h-[48px]",
      "text-white border-primary-800",
      "bg-transparent active:bg-primary-800",
      "data-[hover=true]:bg-primary-800 data-[hover=true]:border-primary",
      "data-[focus=true]:bg-primary-800",
      "group[data-fucus=true]:bg-primary-800",
      "group-data-[focus=true]:bg-primary-800",
      "group-data-[hover=true]:bg-primary-800",
      props?.classNames?.inputWrapper?.length ? props.classNames!.inputWrapper : ""
    ],
    label: [
      "text-white/50",
      "xs:text-[12px]",
    ],
    mainWrapper: [
        "border-secondary"
    ],
    trigger: [
        "text-white border-primary-800",
        "bg-transparent active:bg-primary-800",
        "data-[hover=true]:bg-primary-800 data-[hover=true]:border-primary",
        "data-[focus=true]:bg-primary-800",
        "group[data-fucus=true]:bg-primary-800",
        "group-data-[focus=true]:bg-primary-800",
        "group-data-[hover=true]:bg-primary-800",
        props?.classNames?.trigger?.length ? props.classNames?.trigger : ""
    ],
    value: ["text-white"]
  };
  return (
    <>
    <Select 
      color="secondary"
      variant="bordered"
      label={props.label}
      type={props.type === "password" ? (isVisible ? "text" : "password") : props.type}
      // onChange={props.onChange}
      placeholder={props.placeholder}
      className={className}
      radius="lg"
      name={props?.name}
      classNames={classnames}
      {...props?.extras}
      errorMessage={props?.errorMessage}
      isInvalid={props?.errorMessage ? true : false}
      items={props?.items}
      defaultSelectedKeys={props?.value ? [props?.value] : null}
    >
        {
            props.items ? props.items.map((item: any) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>) : null
        }
    </Select>
    </>
  );
}

export default ThemeSelect;