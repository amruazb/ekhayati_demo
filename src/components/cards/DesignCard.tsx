import CardContainer from "@/abstract/CardContainer";
import { Link, truncate } from "@/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Chip } from "@nextui-org/react";

export interface DesignCardProps {
  image: string;
  title: string;
  createdDate: string;
  id: number;
  price?: number;
  description?: string;
  customizable?: boolean;
}

export const DesignCard = ({ image, title, description, price, id, customizable }: DesignCardProps) => {
  const locale = useLocale();
  const t = useTranslations("shop");
  return (
    <CardContainer scissors={false} >
      <Link href={{
        pathname: "/shop/[id]",
        params: {
          id,
        }
      }} locale={locale} prefetch={true}
        className="relative">
        {customizable ? (
                    <Chip
                      className="absolute z-10 left-[10px] top-[10px] text-[10px] rounded-md bg-[#012828] text-white"
                      // variant="primary"
                    >
                      {t("customizable")}
                    </Chip>
                  ) : (
                    <></>
                  )}
      <Image
        unoptimized
        src={image}
        height={164}
        width={164}
        className="aspect-square object-cover w-full rounded-[4px]"
        alt=""
      />

      <Image
        unoptimized
        src={"/assets/images/Border-desktop.png"}
        height={1}
        width={164}
        className="hidden sm:block my-2 w-full"
        alt=""
      />

      <Image
        unoptimized
        src={"/assets/images/Border-mobile.png"}
        width={164}
        height={1}
        className="xs:block sm:hidden my-2 w-full"
        alt=""
      />

      <div className="flex flex-col px-1 py-2">
        <div className="text-secondary text-xl font-medium mb-1 truncate">{title}</div>
        <div className="text-white text-md font-medium my-1">AED {price}</div>
        <div className="text-white text-md font-medium my-1">{truncate(description || "", 40)}</div>
      </div>
      </Link>
    </CardContainer>
  );
}

export const DesignCardSkeleton = () => {

  return (
    <CardContainer scissors={false}>
      <div className="shadow rounded-md p-4 w-full">
        <div className="animate-pulse flex flex-col">
          <div className="bg-slate-700 w-full aspect-square"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}

export default DesignCard;