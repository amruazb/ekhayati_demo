'use client'
import React from "react";

export interface CartItemPriceProps {
  price?: number;
  quantity?: number;
}

export default function CartItemPrice(props: CartItemPriceProps) {

  return (
    <div className="flex flex-row items-center justify-start">
      <p className="text-white font-medium sm:text-l xs:text-[12px]">AED {(props?.price || 0) * (props?.quantity || 0)}</p>
    </div>
  )
}