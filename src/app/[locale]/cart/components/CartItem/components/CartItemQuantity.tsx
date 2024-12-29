'use client'
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

export interface CartItemQuantityProps {
  quantity?: number;
  handleAction?: (action: "increment" | "decrement" | "delete", item: any) => void;
  id?: number;
  type?: "mekhwar" | "custom";
}

export default function CartItemQuantity(props: CartItemQuantityProps) {
  const [value, setValue] = useState(props?.quantity || 0);

  const handleIncrement = () => {
    if (props?.handleAction) props.handleAction("increment", { id: props?.id, type: props?.type });
  }

  const handleDecrement = () => {
    if (props?.quantity === 1) return;
    if (props?.handleAction) props.handleAction("decrement", { id: props?.id, type: props?.type });
  }

  const handleManualInput = (e: any) => {
    const v = e.target.value;
    const key = e.key;
    if (v == 0 || v === "") {
      setValue(1);
      return;
    }
    setValue(v);
  }
  return (
    <div className="flex flex-row items-center justify-center w-[90px]">
      <Button onClick={handleDecrement} className="max-w-[25px] min-w-[25px] min-h-[25px] max-h-[25px] bg-transparent px-0 text-[25px]">-</Button>
      <Input
        classNames={{
          mainWrapper: "data-[hover=true]:bg-transparent data-[focus=true]:bg-transparent group[data-fucus=true]:bg-transparent group-data-[focus=true]:bg-transparent group-data-[hover=true]:bg-transparent bg-transparent focus:bg-transparent mx-1 border-1 border-secondary rounded-[5px]",
          inputWrapper: "data-[hover=true]:bg-transparent data-[focus=true]:bg-transparent group[data-fucus=true]:bg-transparent group-data-[focus=true]:bg-transparent group-data-[hover=true]:bg-transparent max-w-[35px] min-w-[35px] min-h-[30px] max-h-[30px] px-0 text-center bg-transparent focus:bg-transparent",
          input: "text-center text-white text-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        }}
        type="number"
        value={props?.quantity?.toString() || "0"}
        disabled={true}
        onKeyDown={handleManualInput}
        onChange={handleManualInput}
      />
      <Button onPress={handleIncrement} onClick={handleIncrement} className="max-w-[25px] min-w-[25px] min-h-[25px] max-h-[25px] bg-transparent px-0 text-[20px] tx-normal">+</Button>
    </div>
  )
}