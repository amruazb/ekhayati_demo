'use client'
import CardContainer from "@/abstract/CardContainer";
import ApplyCoupon from "./ApplyCoupon";
import CheckoutBreakdown from "./CheckoutBreakdown";
import { Button } from "@nextui-org/react";
import DeliveryNote from "./DeliverNote";
import { useEffect, useState } from "react";
import { useRouter } from "@/utils";
import { getUserCart,  saveCartItems } from "@/utils/cart";
import { useAuth } from "@/provider/AuthContext";
import qs from "qs";
import { useTranslations } from "next-intl";
export interface CartSummaryProps {
  mekhwars?: any[];
  custom?: any[];
  deliveryNote?: string;
  tax?: number;
  deliveryCharge?: number;
}

export default function CartSummary(props: CartSummaryProps) {

  const [totalItems, setTotalItems] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState("");
  const [discount, setDiscount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [tax, setTax] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  const router = useRouter();
  const authCtx = useAuth();
  const t = useTranslations("shop");

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.custom]);

  const handleCheckout = () => {
    const cart = getUserCart();
    if (!authCtx.isAuthenticated) {
      sessionStorage.setItem("redirectTo", "/en/cart");
      router.push("/login");
      return;
  }

    router.push({
      pathname: "/checkout/address",
      query: {
        cartId: cart?.id,
        couponCode,
        deliveryNote,
        deliveryCharge,
        tax,
        discount,
      },
    })
  }

  const loadData = () => {
    setDeliveryCharge(props.deliveryCharge || 0);
    setDeliveryDetails(props?.deliveryNote ?? "");
    if (props.custom) {
      let t = 0;
      let st = 0;

      props.custom.forEach((item: any) => {
        t += item?.quantity;
        st += item.mekhwar?.price * item?.quantity;
      });

      setTotalItems(t);
      setSubtotal(st);
    }
  }

  useEffect(() => {
    setDeliveryCharge(props?.deliveryCharge || 0);
    if (props?.tax) {
      setTax((props?.tax / 100) * subTotal);
    }
  }, [props?.tax, subTotal, props?.deliveryCharge]);

  const handleAddCoupon = (data: { type: "Flat" | "Percentage", amount: number }, code?: string) => {
    setCouponCode(code || "");
    if (data.type === "Flat") {
      if (data.amount > subTotal) {
        setDiscount(subTotal);
      } else {
        setDiscount(data.amount);
      }
    } else if (data.type === "Percentage") {
      setDiscount(data.amount * subTotal / 100);
    }
  }

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setDiscount(0);
  }

  return (
    <CardContainer scissors={false}>
      <div className="price p-8 xs:p-4">
        <h1 className="text-white font-bold text-lg mb-5">{t("order_summary")}</h1>

        <CheckoutBreakdown items={[
          { name: t("items"), value: totalItems.toString() },
          { name: t("subtotal"), value: "AED " + subTotal },
        ]} />

        <div className="my-6"></div>

        <ApplyCoupon onApply={handleAddCoupon} onRemove={handleRemoveCoupon} />

        <div className="my-6"></div>

        <DeliveryNote value={deliveryNote} onChange={setDeliveryNote} />

        <div className="my-6"></div>

        <CheckoutBreakdown items={[
          { name: t("discount"), value: "AED " + discount },
          { name: t("tax"), value: "AED " + tax },
          { name: t("delivery_charge"), value: "AED " + deliveryCharge },
          { name: t("total"), value: "AED " + (subTotal + deliveryCharge - discount + tax) },
        ]} />

        <div className="my-6"></div>

        <p className="text-caption font-italic text-italic">{deliveryDetails}</p>

        <div className="my-6"></div>

        <Button onClick={handleCheckout} className="w-full bg-secondary-800 text-black py-5 px-7 rounded-[6px] text-[15px] min-h-[50px] max-h-[50px]">{t("checkout")}</Button>
      </div>
    </CardContainer>
  );
}