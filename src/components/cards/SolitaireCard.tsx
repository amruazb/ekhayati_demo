"use client";
import CardContainer from "@/abstract/CardContainer";
import Image from "next/image";
import { FavoriteButton } from "../buttons/FavouriteButton";
import { Link } from "../../utils/navigation";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Chip } from "@nextui-org/react";
import { useTranslations } from "next-intl";

export interface SolitaireCardProps {
  maxWidth?: number;
  image?: string;
  title?: string;
  price?: number;
  rating?: number;
  id?: number;
  tailorName?: string;
  customizable?: boolean;
}

export const SolitaireCard = ({
  maxWidth,
  image,
  title,
  price,
  rating,
  id,
  tailorName,
  customizable,
}: SolitaireCardProps) => {
  const t = useTranslations("shop");
  return (
    <div className="h-full">
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
            // color="secondary"
            variant="shadow"
          >
            {t("customizable")}
          </Chip>
        ) : (
          <></>
        )}

        <CardContainer scissors={true}>
          <Image
            priority={true}
            unoptimized
            src={image || ""}
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "100%", height: 230, objectFit: "cover", maxWidth }}
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
            className={`xs:block sm:hidden mt-2 mb-1 w-full h-[3px]`}
            width="0"
            height="0"
            sizes="100vw"
            style={{ maxWidth }}
            alt=""
          />

          <div className="item-details flex flex-col p-2 mt-3">
            <div className="Group1000 w-full h-6">
              <div className="text-white text-base font-medium  leading-tight my-1 truncate">
                {title}
              </div>
              <div className="Text w-full left-[105px] top-[6.91px] absolute text-stone-300 text-sm font-normal line-through">
                {/*TODO: fix on discount application */}
              </div>
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
                {rating || 0}
              </div>
            </div>

            <div className="flex">
              <div className="flex flex-col items-start justify-center w-[75%]">
                <div className="text-white text-xl font-semibold">
                  AED {price}
                </div>
                <div className="text-white text-xs font-light  leading-tight my-1 line-clamp-1">
                  {tailorName}
                </div>
              </div>

              <FavoriteButton id={id} />
            </div>
          </div>
        </CardContainer>
      </Link>
    </div>
  );
};

export default SolitaireCard;
