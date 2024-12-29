"use client";
import { getSiteConfig } from "@/provider";
import { useRouter } from "@/utils";
import { Button, CircularProgress } from "@nextui-org/react";
import { IconBrandWhatsapp, IconClock, IconUser } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export interface ThirdStepProps {
  swiperRef?: any;
}

export default function ThirdStep() {
  const [isLoading, setIsLoading] = useState(false);
  const [whatsappNum, setWhatsappNum] = useState("");

  const router = useRouter();
  const t = useTranslations("shop");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const { data, error } = await getSiteConfig();
    //@ts-ignore
    setWhatsappNum(data?.data?.attributes?.whatsapp_number_for_custom_design?.toString());
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center pb-5">
      <div className="w-300">
      <IconClock size={300}  className=" sm:text-4xl md:text-5xl lg:text-6xl"/>

      </div>

      <h1 className="text-5xl xs:text-3xl small:text-4xl medium:4xl font-bold text-center mb-5">
       {t("your_order_is_pending_l")} <span className="text-secondary-800">{t("your_order_is_pending_t")}</span>
      </h1>

      <p className="max-w-md text-center mb-5 px-5">
        {t("your_order_is_pending_description")}
      </p>

      <Button
        onClick={() => {
          window.open(("https://wa.me/" + whatsappNum), "_blank");
        }}
        className="bg-primary-700 text-white max-w-[300px] text-[16px] font-bold w-full min-h-0 py-6 rounded-[6px]"
        startContent={isLoading ? <CircularProgress className="text-secondary-800" classNames={{ svg: "w-[24px]" }} /> : <IconBrandWhatsapp size={24} />}
      >
        {t("chat_with_us")}
      </Button>

      <Button
        onClick={() => {
          router.push("/profile");
        }}
        className="bg-primary-700 text-white max-w-[300px] text-[16px] font-bold w-full min-h-0 py-6 rounded-[6px] mt-5"
        startContent={<IconUser size={24} />}
      >
        {t("view_order")}
      </Button>
    </div>
  );
}
