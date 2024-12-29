
import LinkButton from "@/components/buttons/LinkButton"
import SolitaireCardSingle, { SolitaireCardSingleProps } from "@/components/cards/SolitaireCardSingle"
import HomeItemCarousel from "@/components/sections/home-product-carousel/components/home-item-carousel"
import { IconChevronRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

interface HomeProductCarouselProps {
  title?: string;
  coloredTitle?: string;
  description?: string;
  link?: string;
  items?: SolitaireCardSingleProps[],
  px?: string;
  screenFull?: boolean;
}

const HomeProductCarousel = (props: HomeProductCarouselProps) => {
  const t = useTranslations("shop");

  return (
    <div className={`${props.screenFull ? "w-full" : "w-screen"} mt-12`}>

      <div className="flex justify-center">
        <div className={`section-header max-w-main w-full flex sm:flex-row xs:flex-col justify-between items-end xs:py-0 ${props?.px ? props.px : "xs:px-3 md:px-3"}`}>
          <div className="">
            <h1 className="text-white inline-block mx-2 xs:text-[39.94px] xs:font-black sm:text-4xl sm:font-black">{props?.title ? props.title : "Browse"}</h1>
            <h1 className="text-secondary inline-block xs:text-[39.94px] xs:font-black sm:text-4xl sm:font-black">{props?.coloredTitle ? props.coloredTitle : "Mekhwar"}</h1>
            <p className="font-medium text-caption xs:text-[18px] xs:mt-2 sm:mt-2">{props?.description ? props.description : "Browse our wide collection of Mekhwar design, made only for your style and luxury"}</p>
          </div>

          <div className="sm:hidden xs:flex mt-5"></div>
          <LinkButton to="/shop" title={t("browse_mekhwar")} thin={true} endIcon={<IconChevronRight />} />
        </div>
      </div>

      <div className="xs:hidden sm:block">
        <HomeItemCarousel
          items={props?.items || []}
          screenFull={props?.screenFull}
        />
      </div>

      <div className="xs:grid xs:grid-cols-2 justify-center justify-items-center	 gap-y-5 mt-3 items-center  w-full sm:hidden">
        {
          typeof props?.items?.length === "number" && props?.items?.length > 0 && props.items.map((item, index) => {
            if (index < 4) {
              return <SolitaireCardSingle key={"solitare-singe-lcard" + index} {...item} />
            }
          })
        }
      </div>
    </div>
  )
}

export default HomeProductCarousel;