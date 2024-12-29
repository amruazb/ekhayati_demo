"use client";
import { motion } from "framer-motion";

import CardContainer from "@/abstract/CardContainer";
import Image from "next/image";
import { FavoriteButton } from "../buttons/FavouriteButton";
import { Link } from "../../utils/navigation";
import { truncate } from "@/utils";
import { useEffect } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Chip } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";

export interface SolitaireCardSingleProps {
  maxWidth?: number;
  autWidth?: boolean;
  title?: string;
  image?: string;
  price?: number;
  rating?: number;
  tailorName?: string;
  id?: number;
  query?: any;
  design?: boolean;
  customizable?: boolean;
}

export const SolitaireCardSingle = ({
  maxWidth,
  autWidth,
  title,
  price,
  rating,
  tailorName,
  image,
  id,
  query,
  design,
  customizable,
}: SolitaireCardSingleProps) => {
  const t = useTranslations("shop");

  const locale = useLocale();

  return (
    <motion.div
      whileHover={{ scale: 0.99, filter: "brightness(110%)" }}
      transition={{ duration: 0.2 }}
      className={`single-card-solitaire-container ${autWidth ? "w-[100%]" : "xs:w-[45vw]"} xs:h-max-[280px] sm:w-[250px]  overflow-visible h-min-[580px]`}
    >
      <CardContainer scissors={true}>
        <Link
          href={{
            pathname: design ? "/shop/design/[id]" : "/shop/[id]",
            params: { id: id?.toString() || "" },
            query: query ? query : {},
          }}
          scroll={true}
          prefetch={true}
          className="relative"
        >
          {customizable ? <Chip className={`absolute z-10 ${locale === "en" ? 'left-[10px]' : 'right-[10px]'} top-[10px] text-[10px] rounded-md bg-[#012828] text-white`} variant="shadow">{t("customizable")}</Chip> :  <></>}
          <Image
            priority={true}
            unoptimized
            src={image || ""}
            width="0"
            height="0"
            sizes="100vw"
            className={` ${
              autWidth ? "w-[100%]" : "xs:w-[45vw]"
            } xs:h-[164px] object-cover sm:h-[230px] sm:w-full`}
            style={{ maxWidth }}
            alt=""
          />

          <Image
            priority={true}
            unoptimized
            src="/assets/images/Border-desktop.png"
            className={`xs:hidden sm:block mt-2 mb-1 w-[100%] h-[3px]`}
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
            className={`sm:hidden xs:block mt-2 mb-1 w-[100%] h-[3px]`}
            width="0"
            height="0"
            sizes="100vw"
            style={{ maxWidth }}
            alt=""
          />

          <div className="item-details flex flex-col p-2 mt-3">
            <div className="Group1000 w-full h-6 relative">
              <div className="text-white xs:text-[12px] sm:text-base font-medium  my-1 truncate">
                {title}
              </div>
              {/* <div className="Text w-full sm:left-[105px] sm:top-[6.91px] absolute text-stone-300 text-sm font-normal font-['Inter'] line-through">AED 1128.00</div> */}
            </div>

            <div className="my-3 flex items-center">
              <Rating
                value={rating || 0}
                readOnly
                isDisabled
                items={5}
                style={{ maxWidth: "80px" }}
              />
              <div className="ml-2 text-center align-center text-secondary text-md font-normal font-['Inter']">
                {rating || 0}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start justify-center w-[75%]">
                <div className="left-0 top-0 text-white xs:text-m  sm:text-xl font-semibold font-['Inter']">
                  AED {price}
                </div>
                <div className="text-white xs:text-[9px] sm:text-xs font-light   my-1">
                  {truncate(tailorName || "", 20)}
                </div>
              </div>

              <FavoriteButton id={id} />
            </div>
          </div>
        </Link>
      </CardContainer>
    </motion.div>
  );
};

export default SolitaireCardSingle;
