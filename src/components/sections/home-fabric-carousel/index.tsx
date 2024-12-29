import LinkButton from "@/components/buttons/LinkButton"
import FabricCard from "@/components/cards/FabricCard"
import {HomeItemCarousel} from "@/components/sections/home-fabric-carousel/components/home-item-carousel"
import { IconChevronRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export interface HomeFabricCarouselProps {
  title?: string;
  coloredTitle?: string;
  description?: string;
  link?: string;
  items?: any;
  px?: string;
  maxW?: string;
  align?: "proper" | "improper";
}
const HomeFabricCarousel = ({ title, align, description, link, items, coloredTitle, px, maxW }: HomeFabricCarouselProps) => {
  const t = useTranslations("home");


  if (!items?.length) {
    return <></>
  }

  return (
    <div className={`w-screen mt-12 ${maxW}`}>

      <div className="flex justify-center">
        <div className={`section-header ${maxW ? maxW : "max-w-main"} w-full flex ${align === "proper" ? "sm:flex-row-reverse" : "sm:flex-row"} xs:flex-col-reverse justify-between items-end xs:py-0 ${px ? px : "xs:px-3 md:px-3"}`}>

          <LinkButton to="/shop/fabric" title={t("all_fabric")} thin={true} endIcon={<IconChevronRight />} />
          <div className="sm:hidden xs:flex mt-5"></div>

          <div className={`${align === "proper" ? "sm:text-start" : "sm:text-end"} xs:text-start`}>
            <h1 className="text-white inline-block mx-2 xs:text-[39.94px] xs:font-black sm:text-4xl sm:font-black">{title}</h1>
            <h1 className="text-secondary inline-block xs:text-[39.94px] xs:font-black sm:text-4xl sm:font-black">{coloredTitle}</h1>
            <p className="font-medium text-caption xs:text-[18px] xs:mt-2 sm:mt-2">{description}</p>
          </div>
        </div>
      </div>

      <div className="xs:hidden sm:block">
        <HomeItemCarousel items={items} />
      </div>

      <div className="xs:grid xs:grid-cols-2 justify-center items-center gap-y-5 mt-3 items-center w-full sm:hidden">
        {
          items?.length > 0 && items.map((item: any, index: number) => {
            if (index < 4) {
              return (
                <div key={"fabric-moible-home-item-" +index} className="grid-span-1 flex justify-center items-center">
                  <div className="w-[173px]">
                    <FabricCard
                      image={item.image}
                      name={item.title}
                      price={item.price}
                      id={item.id}
                    /></div>
                </div>
              );
            }
          })
        }
      </div>
    </div>
  )
}

export default HomeFabricCarousel;