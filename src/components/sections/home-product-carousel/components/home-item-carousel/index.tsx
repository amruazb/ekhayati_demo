'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import SolitaireCardSingleGrowable from "./components/SolitaireCardSingleGrowable";
import { useLocale } from "next-intl";
import { SolitaireCardSingleProps } from "@/components/cards/SolitaireCardSingle";

export interface HomeItemCarouselProps {
  items: SolitaireCardSingleProps[];
  screenFull?: boolean;
}
const HomeItemCarousel = (props: HomeItemCarouselProps) => {
  const locale = useLocale();

  return (
    <div className="w-full flex flex-col mt-0 mb-10">
      
      <div className={`${props?.screenFull ? "w-full" : "w-screen"} mt-10 mb-10 flex justify-start xs:hidden desktop-item-carousel`}>
        <Swiper spaceBetween={20} slidesPerView={"auto"} dir={locale === "ar" ? "rtl" : "ltr"}>
          {
            typeof props?.items?.length === "number" && props?.items?.length > 0 && props?.items?.map((_item, index) => {
              return (
                  <SwiperSlide key={"mekhwar-desktop-" + index}>
                    <div className="item-container">
                      <div className="item">
                        <SolitaireCardSingleGrowable
                          title={_item?.title}
                          price={_item?.price}
                          image={_item?.image}
                          rating={_item?.rating}
                          id={_item?.id}
                          tailorName={_item?.tailorName}
                          customizable={_item?.customizable}
                          // maxWidth={_item?.maxWidth}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </div>
  )
}

export default HomeItemCarousel;