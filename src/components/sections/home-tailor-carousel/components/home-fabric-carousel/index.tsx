"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { FabricCardGrowableProps, FabricCardGrowable } from "./components/FabricCardGrowable";
import { Link, TailorCard } from "@/components";
import { useLocale } from "next-intl";

export interface HomeItemCarouselProps {
  title?: string;
  description?: string;
  link?: string;
  items?: any[];
  id?: number;
}

export const HomeTailorCarousel = ({
  title,
  description,
  link,
  items,
}: HomeItemCarouselProps) => {
  const locale = useLocale();

  return (
    <div className="w-full flex flex-col mt-0 mb-10">
      <div className="w-screen mt-10 mb-10 flex justify-start desktop-tailor-carousel">
        <Swiper
          spaceBetween={20}
          slidesPerView={"auto"}
          dir={locale === "ar" ? "ltr" : "ltr"}
          autoplay={true}
          loop={true}
          pagination={{ clickable: true }}
          // modules={[Pagination, Autoplay]}
          className="tailor-home-carousel"
          breakpoints={{
            600: {
              slidesPerView: 1,
              spaceBetween: 20,
              centeredSlides: true,
            },
            800: {
              slidesPerView: 2,
              spaceBetween: 20,
              centeredSlides: true,
            },
            1500: {
              slidesPerView: 3,
              spaceBetween: 20,
              centeredSlides: false,
            },
            3000: {
              slidesPerView: 5,
              spaceBetween: 20,
              centeredSlides: false,
            },
          }}
        >
          {items?.length &&
            items.map((_item, index) => {
              return (
                <SwiperSlide key={"swiper-slider-tailor-desktop" + index}>
                  <div className="item-container">
                    <div className="item">
                      <TailorCard
                        image={_item?.attributes?.image?.data?.attributes?.url || ""}
                        name={_item?.attributes?.name || ""}
                        id={_item.id}
                        description={_item.attributes?.description || ""}
                        rating={_item.attributes?.rating || 0}
                        key={_item.id}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};
