"use client";
import CardContainer from "@/abstract/CardContainer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/utils";
import { useTranslations } from "next-intl";

export interface FabricCardGrowableProps {
  maxWidth?: number;
  image?: string;
  title?: string;
  description?: string;
  link?: string;
  id?: number;
  price?: number;
}

export const FabricCardGrowable = ({
  maxWidth,
  image,
  title,
  description,
  link,
  price,
  id,
}: FabricCardGrowableProps) => {
  const t = useTranslations("shop");
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      className="single-card-solitaire-container xs:w-[173px] xs:h-max-[280px] sm:w-[250px] overflow-visible"
    >
      <CardContainer scissors={true}>
        <Link
          href={{
            pathname: "/shop/fabric/[fabricId]",
            params: { fabricId: id?.toString() || "" },
          }}
          prefetch={true}
          scroll={true}
        >
          <Image
            priority={true}
            unoptimized
            src={image || ""}
            width="0"
            height="0"
            sizes="100vw"
            className="xs:w-full xs:h-[118px] object-cover sm:h-[150px] sm:w-full"
            style={{ maxWidth }}
            alt=""
          />

          <Image
            priority={true}
            unoptimized
            src="/assets/images/Border-desktop.png"
            className="xs:hidden sm:block mt-2 mb-1 w-[230px] h-[1px]"
            width="0"
            height="0"
            sizes="100vw"
            style={{ maxWidth }}
            alt=""
          />

          <Image
            priority={true}
            unoptimized
            src="/assets/images/Border-mobile.png"
            className="sm:hidden xs:block mt-2 mb-1 w-full"
            width={230}
            height={150}
            style={{ maxWidth }}
            alt=""
          />

          <div className="item-details flex flex-col xs:p-1 xs:pt-0 sm:p-2 sm:pt-0">
            <div className="w-full">
              <h3 className="xs:text-[10px] sm:text-white text-base font-medium ">
                {title}
              </h3>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start justify-center w-full">
                <div className="text-white text-[12px] sm:text-base font-medium  xs:mb-1 sm:my-1">
                  {price ? <>AED {price}</> : <>{t("price_after_confirmation")}</>}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </CardContainer>
    </motion.div>
  );
};
