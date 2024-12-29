'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import {
  GlassMagnifier,
  MagnifierContainer
} from "react-image-magnifiers";
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useState } from "react";
import Image from "next/image";
import CardContainer from "@/abstract/CardContainer";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export interface ProductImageSwiperListProps {
  images: string[]
}

export const ProductImageSwiperList = (props: ProductImageSwiperListProps) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const { images } = props;

  return (
    <div className="sm:w-[500px] sm:h-[500px] xs:w-full">
      <Swiper
        style={{
          //@ts-ignore
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{swiper: thumbsSwiper && !thumbsSwiper?.destroyed ? thumbsSwiper : null}}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {
          images?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <CardContainer relative={false} scissors={false} noPadding={true} borderRadius={18}>
                <div className="magincont w-auto xs:min-w-[350px] xs:w-full xs:h-[90vw] xs:min-h-[350px] sm:min-w-[500px] sm:min-h-[500px] sm:max-h-[500px] sm:max-w-[500px] object-cover">
                  {/* <Image priority={true} unoptimized 
                    src={item} 
                    width={100} 
                    height={100} 
                    className="p-[2px] rounded-[18px] w-auto xs:min-w-[350px] xs:w-[98vw] xs:h-[90vw] xs:min-h-[350px] sm:min-w-[500px] sm:min-h-[500px] sm:max-h-[500px] sm:max-w-[500px] object-cover" alt="product image" fetchPriority="high" /> */}
                    <MagnifierContainer className="w-auto xs:min-w-[350px] xs:w-full xs:h-[90vw] xs:min-h-[350px] sm:min-w-[500px] sm:min-h-[500px] sm:max-h-[500px] sm:max-w-[500px] object-cover">
                      <GlassMagnifier
                        className="p-[2px] rounded-[18px] w-auto xs:min-w-[350px] xs:w-full xs:h-[90vw] xs:min-h-[350px] sm:min-w-[500px] sm:min-h-[500px] sm:max-h-[500px] sm:max-w-[500px] object-cover overflow-hidden"
                        magnifierSize={"60%"}
                        magnifierBorderColor="#FFD992"
                        allowOverflow={false}
                        square
                        imageSrc={item}
                      />
                  </MagnifierContainer>
                </div>
                </CardContainer>
              </SwiperSlide>
            )
          })
        }
      </Swiper>

      <div className="my-7"></div>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={32}
        slidesPerView={6}
        freeMode={true}
        watchSlidesProgress={true}
        navigation={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="productPageThumbs"
      >
        {
          images?.map((item, index) => {
            return (
              <SwiperSlide 
                key={index + "thumb"}
                className="sm:min-w-[100px] sm:min-h-[100px] sm:max-h-[100px] sm:max-w-[100px] thumbsSwiperSlide"
              >
                <Image
                  src={item} 
                  width={100} 
                  height={100} 
                  className="w-auto rounded-[9px] xs:min-w-[60px] xs:max-h-[60px] sm:min-w-[100px] sm:min-h-[100px] sm:max-h-[100px] sm:max-w-[100px] object-cover" 
                  alt="product image" 
                  fetchPriority="high"
                />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}
