"use client";
import React from "react";
import CartItemDescription from "./components/CartItemDescription";
import CartItemImage from "./components/CartItemImage";
import CartItemPrice from "./components/CartItemPrice";
import CartItemQuantity from "./components/CartItemQuantity";
import CartItemRemoveButton from "./components/CartItemRemoveButton";

export interface CartItemProps {
  index: number;
  image?: string;
  name?: string;
  price?: number;
  quantity?: number;
  id?: number;
  action?: (action: "increment" | "decrement" | "delete", item: any) => void;
  type: "mekhwar" | "custom";
}

export default function CartItem(props: CartItemProps): JSX.Element {
  return (
    <div
      className={`cart-item w-full grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 py-8 ${
        props.index === 0 ? "border-t-0" : "border-t-1"
      } border-secondary-800`}
    >
      <div className="lefti flex flex-row">
        <CartItemImage src={props.image} />
        {/* @ts-ignore */}
        <CartItemDescription
          action={props?.action}
          price={props.price}
          quantity={props.quantity}
          onClick={props?.action || (() => {})}
          type={props.type}
          name={props.name}
          code={"#" + Date.now()}
          id={props.id}
        />
      </div>

      <div className="lg:flex md:flex xs:hidden righti flex flex-row items-center justify-between">
        <CartItemQuantity
          type={props.type}
          handleAction={props?.action || (() => {})}
          quantity={props.quantity}
          id={props.id}
        />
        <CartItemPrice price={props.price} quantity={props.quantity} />
        <CartItemRemoveButton
          type={props.type}
          onClick={props?.action || (() => {})}
          id={props.id}
        />
      </div>
    </div>
  );
}
