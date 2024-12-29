import { Button } from "@nextui-org/react";
import { IconX } from "@tabler/icons-react";

export interface CartItemRemoveButtonProps {
  id?: number;
  onClick: (action: "increment" | "decrement" | "delete", item: any) => void;
  type?: "mekhwar" | "custom";
}

export default function CartItemRemoveButton(props: CartItemRemoveButtonProps) {
  return (
    <Button onClick={() => props.onClick("delete", { id: props?.id, type: props?.type})} isIconOnly className="h-[25px] w-[25px] bg-transparent rounded-full"><IconX color="red" className="text-red/100 text-danger" /></Button>
  )
}