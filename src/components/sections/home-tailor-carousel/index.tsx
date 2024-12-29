import LinkButton from "@/components/buttons/LinkButton";
import { IconChevronRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { HomeTailorCarousel } from "./components/home-fabric-carousel";

export interface HomeFabricCarouselProps {
  title?: string;
  coloredTitle?: string;
  description?: string;
  link?: string;
  items?: any[];
  px?: string;
  maxW?: string;
  align?: "proper" | "improper";
}
const HomeTailorsCarousel = ({ title, align, description, link, items, coloredTitle, px, maxW }: HomeFabricCarouselProps) => {
  const t = useTranslations("home");

  return (
    <div className={`w-screen mt-12 ${maxW}`}>

      <div className="flex justify-center">
        <div className={`section-header ${maxW ? maxW : "max-w-main"} w-full flex ${align === "proper" ? "sm:flex-row-reverse" : "sm:flex-row"} xs:flex-col-reverse justify-between items-end xs:py-0 ${px ? px : "xs:px-3 md:px-3"}`}>

          <LinkButton to="/shop/tailors" title={t("all_tailors")} thin={true} endIcon={<IconChevronRight />} />
          <div className="sm:hidden xs:flex mt-5"></div>

          <div className={`${align === "proper" ? "sm:text-start" : "sm:text-end"} xs:text-start`}>
            <h1 className="text-white inline-block mx-2 xs:text-[39.94px] xs:font-black sm:text-4xl sm:font-black">{title}</h1>
            <h1 className="text-secondary inline-block xs:text-[39.94px] xs:font-black sm:text-4xl sm:font-black">{coloredTitle}</h1>
            <p className="font-medium text-caption xs:text-[18px] xs:mt-2 sm:mt-2">{description}</p>
          </div>
        </div>
      </div>

      <div className="block">
        <HomeTailorCarousel items={items} />
      </div>
    </div>
  )
}

export default HomeTailorsCarousel;