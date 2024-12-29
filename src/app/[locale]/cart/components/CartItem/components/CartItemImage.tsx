import CardContainer from "@/abstract/CardContainer";
import Image from "next/image";

export interface CartItemImageProps {
  src?: string;
}
export default function CartItemImage(props: CartItemImageProps) {
  return (
    <div className="w-[97px] aspect-square">
      <CardContainer noPadding borderRadius={12} scissors={false}>
        <div className="p-1">
          <Image
            src={props?.src || ""}
            width={97}
            height={97}
            alt="cart-item"
            className="aspect-square object-cover rounded-[12px]"
          />
        </div>
      </CardContainer>
    </div>
  )
}