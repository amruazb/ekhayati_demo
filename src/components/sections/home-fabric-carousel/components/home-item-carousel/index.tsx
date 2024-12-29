'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { FabricCardGrowableProps, FabricCardGrowable } from "./components/FabricCardGrowable";
import { Link } from "@/components";
import { useLocale } from "next-intl";

export interface HomeItemCarouselProps {
  title?: string
  description?: string
  link?: string
  items?: FabricCardGrowableProps[]
  id?: number;
}

export const HomeItemCarousel = ({ title, description, link, items }: HomeItemCarouselProps) => {
  const locale = useLocale();

  return (
    <div className="w-full flex flex-col mt-0 mb-10">

      <div className="w-screen mt-10 mb-10 flex justify-start xs:hidden desktop-fabric-carousel">
        <Swiper spaceBetween={20} slidesPerView={"auto"} dir={locale === "ar" ? "ltr" : "ltr"}>
          {
            items?.length && items.map((_item, index) => {
              return (
                <SwiperSlide key={"swiper-slider-fabric-desktop" + index}>
                  <div className="item-container">
                    <div className="item">
                      {/* <Link key={"home-fabric-carousel-big-swiper-link-item" + index} prefetch={true} href={{ pathname: "/shop/fabric/[fabricId]", params: { fabricId: _item.id?.toString() || "" } }} scroll={true} > */}
                        <FabricCardGrowable
                          id={_item.id}
                          title={_item.title}
                          description={_item.description}
                          link={_item.link}
                          image={_item.image}
                          price={_item.price}
                        />
                      {/* </Link> */}
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