"use client";
import CardContainer from "@/abstract/CardContainer";
import Image from "next/image";
import { FavoriteButton } from "../buttons/FavouriteButton";
import { motion } from "framer-motion";
import { Link } from "..";
import { useTranslations } from "next-intl";

export const FabricCardHomePage = ({
  name,
  image,
  price,
  id,
  tailorName,
  preventDefault,
}: {
  preventDefault?: boolean;
  name?: string;
  image?: string;
  price?: number;
  id?: number;
  tailorName?: string;
}) => {
  const t = useTranslations("shop");

  return (
    <motion.div
      whileHover={{ scale: 0.99, filter: "brightness(110%)" }}
      transition={{ duration: 0.2 }}
      className="single-card-solitaire-container xs:w-[155px] xs:h-[100%] small:max-w-[270px] small:h-[240px]  medium:max-w-[270px] medium:h-[240px] large:max-w-[290px] large:h-[270px] overflow-visible cursor-pointer"
    >
      <CardContainer scissors={true}>
        <Link
          onClick={(e) => preventDefault && e.preventDefault()}
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
            src={image ?? ""}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-[150px] object-cover"
            alt=""
          />
          <Image
            priority={true}
            unoptimized
            src="/assets/images/Border-desktop.png"
            className="hidden  mt-2 mb-1 w-[230px] h-[1px]"
            width="0"
            height="0"
            sizes="100vw"
            alt=""
          />
          <Image
            priority={true}
            unoptimized
            src="/assets/images/Border-mobile.png"
            className="mt-2 mb-1 w-full"
            width={230}
            height={150}
            alt=""
          />
          <div className="item-details flex flex-col">
            <div>
              <h3 className="text-base font-medium truncate">{name}</h3>
            </div>
            <div>
              <div className="flex flex-col items-start justify-center w-full">
                <div className="text-base font-medium text-[10px] mt-3 line-clamp-1">
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

export default FabricCardHomePage;
