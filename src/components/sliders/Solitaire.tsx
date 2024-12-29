'use client'
import SolitaireCard, { SolitaireCardProps } from "../cards/SolitaireCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/effect-cards';
import { EffectCards } from "swiper/modules";

interface SolitaireProps {
  items?: SolitaireCardProps[]
}

const Solitaire = (props: SolitaireProps) => {
  
  return (
    <div className="w-full h-full flex justify-center">
      <div style={{width: "250px"}}>
      <Swiper 
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        cardsEffect={{
          perSlideOffset: 12
        }}
        >
        {
          props.items?.length && props.items.map((item, index) => {
            return <SwiperSlide key={index}>
              <SolitaireCard
                maxWidth={230}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
                id={item.id}
                tailorName={item.tailorName}
                customizable={item.customizable}
              />
            </SwiperSlide>
          })
        }
      </Swiper>
      </div>
    </div>
  )
}

export default Solitaire;