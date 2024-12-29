import { Button, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";

export interface DeliveryNoteProps {
  onChange?: (value: string) => void;
  value?: string;
}
export default function DeliveryNote(props: DeliveryNoteProps) {

  const t = useTranslations("shop")

  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      <h3>{t("delivery_note")}</h3>

      <div className="my-1"></div>

      <div className="flex flex-row justify-between items-center bg-primary px-2 py-2 rounded-[8px] w-full min-h-[50px]">
        <Input
          classNames={{
            mainWrapper: "py-0",
            innerWrapper: " py-0",
            inputWrapper: "text-white bg-transparent active:bg-transparent data-[hover=true]:bg-transparent data-[focus=true]:bg-transparent group[data-fucus=true]:bg-transparent group-data-[focus=true]:bg-transparent group-data-[hover=true]:bg-transparent py-0",
            helperWrapper: "py-0",
            input: "",
            label: "hidden"
          }}
          multiple={true}
          onChange={(e) => props.onChange?.(e.target.value)}
          value={props.value}
        />
      </div>
    </div>
  )
}