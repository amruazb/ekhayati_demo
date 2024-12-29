"use client";
import { motion } from "framer-motion";

import CardContainer from "@/abstract/CardContainer";
import Image from "next/image";
import { FavoriteButton } from "../../../../../buttons/FavouriteButton";
import { Link } from "@/utils/navigation";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Chip } from "@nextui-org/react";
import { useTranslations } from "next-intl";

export interface SolitaireCardSingleGrowableProps {
  maxWidth?: number;
  image?: string;
  price?: number;
  id?: number;
  title?: string;
  tailorName?: string;
  rating?: number;
  customizable?: boolean;
}

const SolitaireCardSingleGrowable = ({
  maxWidth,
  image,
  price,
  id,
  title,
  tailorName,
  rating,
  customizable,
}: SolitaireCardSingleGrowableProps) => {
  const t = useTranslations("shop");
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      className="single-card-solitaire-container xs:w-[173px] xs:h-max-[280px] sm:h-full sm:w-[250px] sm:h-[404px]"
    >
      <CardContainer scissors={true}>
        <Link
          href={{
            pathname: "/shop/[id]",
            params: { id: id?.toString() || "" },
          }}
          scroll={true}
          prefetch={true}
          className="relative"
        >
          {customizable ? (
            <Chip
              className="absolute z-10 left-[10px] top-[10px] text-[10px] rounded-md bg-[#012828] text-white"
              variant="shadow"
            >
              {t("customizable")}
            </Chip>
          ) : (
            <></>
          )}

          <Image
            priority={true}
            unoptimized
            src={image || ""}
            width="0"
            height="0"
            sizes="100vw"
            className="prod-card-img xs:w-[164px] xs:h-[164px] object-cover sm:h-[230px] sm:w-full"
            style={{ maxWidth }}
            alt=""
          />

          <Image
            priority={true}
            unoptimized
            src="/assets/images/Border-desktop.png"
            className={`xs:hidden sm:block mt-2 mb-1 w-full h-[2px]`}
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
            className={`sm:hidden sm:block mt-2 mb-1 w-full h-[2px]`}
            width="0"
            height="0"
            sizes="100vw"
            style={{ maxWidth }}
            alt=""
          />

          <div className="item-details flex flex-col p-2 mt-3">
            <div className="w-full h-6">
              <div className="text-white xs:text-[12px] sm:text-base font-medium my-1 truncate">
                {title}
              </div>
              <div className="prod-card-old-price ml-2 inline-block text-stone-300 text-sm font-normal line-through"></div>
            </div>

            <div className="my-3 flex items-center">
              <Rating
                value={rating || 0}
                readOnly
                isDisabled
                items={5}
                style={{ maxWidth: "80px" }}
              />
              <div className="ml-2 text-center align-center text-secondary text-md font-normal">
                {rating}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start justify-center w-[75%]">
                <div className="prod-card-price inline-block  text-white xs:text-m  sm:text-xl font-semibold">
                  AED {price}
                </div>
                <div className="text-white xs:text-[9px] sm:text-xs font-light my-1 h-[1rem] whitespace-nowrap text-ellipsis overflow-hidden w-full">
                  {/* {truncate(tailorName || "", 25)} */}
                  {tailorName}
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

export default SolitaireCardSingleGrowable;
