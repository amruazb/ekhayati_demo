"use client"
import CartItemPrice from "./CartItemPrice";
import CartItemQuantity from "./CartItemQuantity";
import CartItemRemoveButton from "./CartItemRemoveButton";

export interface CartItemDescriptionProps {
  name?: string;
  code?: string;
  type?: "mekhwar" | "custom";
  action?: (action: "increment" | "decrement" | "delete", item: any) => void;
  id?: number;
  quantity?: number;
  price?: number;
  onClick?: (action: "increment" | "decrement" | "delete", item: any) => void;
}

export default function CartItemDescription (props: CartItemDescriptionProps) {
  return (
    <div className="xs:mx-6 sm:mx-7 lg:mx-4 flex flex-col justify-center items-start xs:w-full xs:w-full">
      <h2 className="font-medium sm:text-l xs:text-l">{props.name}</h2>
      <div className="my-1"></div>
      <h3 className="font-normal text-sm">{props.code}</h3>
      <div className="my-1"></div>
      <div className="lg:hidden md:hidden xs:flex righti flex flex-row items-center justify-between">
        <CartItemQuantity 
          type={props.type}
          handleAction={props?.action || (() => { })}
          quantity={props.quantity}
          id={props?.id}
        />
        <CartItemPrice price={props.price} quantity={props.quantity}  />
        <CartItemRemoveButton id={props?.id} onClick={props?.action || (() => { })} type={props?.type} />
      </div>
    </div>
  )
}