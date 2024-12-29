'use client'
import { applyCoupon, extractError } from "@/provider";
import { useAuth } from "@/provider/AuthContext";
import { Button, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export interface ApplyCouponProps {
  onApply: (data: { type: "Flat" | "Percentage", amount: number }, code?: string) => void;
  onRemove: () => void;
}
export default function ApplyCoupon(props: ApplyCouponProps) {

  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponType, setCouponType] = useState<"Flat" | "Percentage" | null>(null);
  const [couponAmount, setCouponAmount] = useState(0);

  const ctx = useAuth();
  const t = useTranslations("shop");

  const handleApply = async () => {
    try {
      if (!couponCode) return;
      setLoading(true);
      const { data, error } = await applyCoupon(ctx.token, { code: couponCode });

      if (data != undefined) {
        //@ts-ignore
        setCouponType(data?.type);
        //@ts-ignore
        setCouponAmount(data?.amount);
        //@ts-ignore
        props.onApply(data);
        toast.success("Coupon applied successfully");
      }
      if (error) {
        toast.error(extractError(error));
      }
    } catch (err) {
      toast.error(extractError(err));
    }
    setLoading(false);
  }

  const handleRemove = () => {
    props.onRemove();
    setCouponCode("");
    setCouponType(null);
    setCouponAmount(0);
  }

  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      <h3>{t("dicount_promo_code")}</h3>

      <div className="my-1"></div>

      <div className="flex flex-row justify-between items-center bg-primary px-2 py-2 rounded-[8px] w-full min-h-[50px]">
        <Input
          classNames={{
            mainWrapper: "py-0 h-[30px] max-h-[30px]",
            innerWrapper: " py-0 h-[30px] max-h-[30px]",
            inputWrapper: "h-[30px] min-h-[30px] max-h-[30px] text-white bg-transparent active:bg-transparent data-[hover=true]:bg-transparent data-[focus=true]:bg-transparent group[data-fucus=true]:bg-transparent group-data-[focus=true]:bg-transparent group-data-[hover=true]:bg-transparent py-0",
            helperWrapper: "py-0 h-[30px] max-h-[30px]",
            input: "h-[30px] max-h-[30px]",
            label: "hidden"
          }}
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          disabled={loading}
        />
        {
          couponType !== null ? <Button onClick={handleRemove} isLoading={loading} variant="bordered" className="bg-primary text-sm text-white/50 border-white/20 font-medium rounded-[6px] min-h-[5px] h-[30px] text-[12px] active:border-secondary active:text-secondary">Remove</Button> :
          <Button onClick={handleApply} isLoading={loading} variant="bordered" className="bg-primary text-sm text-white/50 border-white/20 font-medium rounded-[6px] min-h-[5px] h-[30px] text-[12px] active:border-secondary active:text-secondary">{t("apply")}</Button>
        }
      </div>

      <ToastContainer />
    </div>
  )
}