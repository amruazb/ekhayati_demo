"use client"
import CardContainer from "@/abstract/CardContainer";
import Image from "next/image";
import LinkButton from "../buttons/LinkButton";
import { IconChevronRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

interface HomeBannerCardProps {
  image?: string;
  title?: string;
  subtitle?: string;
  link?: string;
}

export const HomeBannerCard = ({image, title, subtitle, link}: HomeBannerCardProps) => {
  const t = useTranslations("home");

  return (
    <>
    <CardContainer scissors={true}>
      <div className="w-full h-full flex items-center justify-center relative">
        <Image priority={true} unoptimized className="w-full h-full xs:min-h-[205px] xs:max-h-[205px] min-h-[390px] max-h-[390px] object-cover" src={image || "/assets/images/banner-1-demo.png"}     width="0"
    height="0"
    sizes="100vw" alt={""}/>
        <div className="w-full h-full absolute top-0 left-0 p-6 flex flex-col items-start justify-end">
        <div className="w-96 md:mb-5">
          <span className="xs:text-3xl text-amber-200 md:text-5xl font-black ">{title}<br className="xs:hidden"/>
          </span><span className="xs:text-3xl xs:ml-2 text-white text-5xl font-black  leading-10">{subtitle}</span>
        </div>
          <LinkButton to={link}  title={t("browse_catalog")} paddingLeft={0} endIcon={<IconChevronRight />}/>
        </div>
      </div>
    </CardContainer>
    </>
  )
}

export default HomeBannerCard;