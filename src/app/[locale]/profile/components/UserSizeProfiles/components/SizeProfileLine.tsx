"use client";
import { Button } from "@nextui-org/react";
import {
  IconEdit,
  IconScan,
  IconTrash,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export interface SizeProfileLineProps {
  title: string;
  shoulder: string;
  bust: string;
  neck:string;
  hips:string;
  height:string;
  sleeves_length:string;
  wrist: string;
  arm_width: string;
  cup:string;
  chest_point:string;
  onDelete: (v: any) => void;
  onEdit: (v: any) => void;
  selectedValue?: string;
  id: number;
}
export default function SizeProfileLine(props: SizeProfileLineProps) {

  const t = useTranslations("shop");

  return (
    <div className="flex flex-row w-full bg-primary-700 p-6 select-none cursor-pointer">
      <div className="p-1 flex items-start justify-center w-[40px] h-[40px]">
        <IconScan
          size={20}
          className="text-secondary"
        />
      </div>
      <div className="address-details flex flex-col items-start justify-start my-0 ml-2 w-full">
        <div className="flex flex-row w-full">
          <p className="text-white flex text-xl font-bold mb-3">
            {props.title}
          </p>
        </div>
        <p className="text-white mb-3 text-sm">
          <span className="mr-1">{props.arm_width} {t("in")} {t("arm_width")}</span>
          -
          <span className="mx-1">{props.height} {t("in")} {t("height")}</span>
          -
          <span className="mx-1">{props.sleeves_length} {t("in")} {t("sleeves_length")}</span>
          -
          <span className="mx-1">{props.bust} {t("in")} {t("bust")}</span>
          -
          <span className="mx-1">{props.wrist} {t("in")} {t("wrist")}</span> 
          -
          <span className="mx-1">{props.shoulder} {t("in")} {t("shoulder")}</span>
          -
          <span className="mx-1">{props.neck} {t("in")} {t("neck")}</span>
          -
          <span className="mx-1">{props.cup} {t("cup_size")}</span>
          -
          <span className="mx-1">{props.chest_point} {t("in")} {t("chest_point")}</span>
        </p>
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
