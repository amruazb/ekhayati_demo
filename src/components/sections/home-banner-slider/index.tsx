'use client'
import HomeBannerCard from "@/components/cards/HomeBanner";
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/autoplay';
interface HomeBannerSlider {
  item?: {
    image?: string;
    title?: string;
    subtitle?: string;
    link?: string;
  }[]
}

const HomeBannerSlider = ({ item }: HomeBannerSlider) => {

  return (
    <div className="w-full">
      <Swiper>
        {
          item?.length && item?.map((item, index) => {
            return (
              <SwiperSlide key={"home banner item" + index}>
                <HomeBannerCard image={item.image} title={item.title} subtitle={item.subtitle} link={item.link} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default HomeBannerSlider;