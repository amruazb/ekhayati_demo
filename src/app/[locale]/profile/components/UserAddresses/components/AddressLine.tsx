"use client";
import { Button, Chip, Radio, RadioGroup, chip } from "@nextui-org/react";
import { IconEdit, IconLocation, IconLocationPin, IconMapPin, IconPin, IconTrash } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export interface AddressLineProps {
  title: string;
  value: string;
  mobile: string;
  type: string;
  onDelete: (v: any) => void;
  onEdit: (v: any) => void;
  selectedValue?: string;
  id: number;
}
export default function AddressLine(props: AddressLineProps) {

  const t = useTranslations("profile");

  return (
    <div
      className="flex flex-row w-full bg-primary-700 p-6 select-none cursor-pointer"
    >
      <div className="p-1 flex items-start justify-center w-[40px] h-[40px] relative">
        <IconMapPin size={25} className="text-secondary absolute left-0 top-[-1px]" />
      </div>
      <div className="address-details flex flex-col items-start justify-start my-0 ml-2 w-full">
        <div className="flex flex-row w-full">
          <p className="text-white flex text-xl font-bold mb-3">
            {props.title}
          </p>
          <Chip style={{textTransform: "capitalize"}} className="bg-secondary-800 rounded-md mx-5 text-primary-900 text-[12px] py-1 px-1 p-1">
            {t(props.type)}
          </Chip>
        </div>
        <p className="text-white mb-3">{props.value}</p>
        <p className="text-caption">{props.mobile}</p>
      </div>
      <div className="flex flex-row min-h-full justify-center items-center">
        <Button
          size="sm"
          className="bg-transparent hover:bg-white/5 color-secondary"
          isIconOnly
          onClick={() => props.onEdit(props.id.toString())}
        >
          <IconEdit size={18} />
        </Button>
        <Button
          size="sm"
          className="bg-transparent hover:bg-white/5 color-danger"
          isIconOnly
          onClick={() => props.onDelete(props.id.toString())}
        >
          <IconTrash className="text-danger" size={18} />
        </Button>
      </div>
    </div>
  );
}
