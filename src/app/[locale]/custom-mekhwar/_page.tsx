"use client";
import {
  IconUpload,
  IconClock,
  IconDragDrop,
  IconCheck,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import FirstStep from "./components/FirstStep";
import { ToastContainer } from "react-toastify";
import { SwiperSlide, Swiper, SwiperRef } from "swiper/react";
import SecondStep from "./components/SecondStep";
import { Swiper as Swiper2 } from "swiper/types";
import { Button } from "@nextui-org/react";
import ThirdStep from "./components/ThirdStep";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function CustomMekhwarPage() {
  const [step, setStep] = useState(0);
  const [fabricID, setFabricID] = useState(0);
  const [swiper, setSwiper] = useState<Swiper2>();
  const [orderData, setOrderData] = useState<any>();

  const swiperRef = useRef<SwiperRef>(null);

  const t = useTranslations("shop");

  const handleNext = (data: any) => {
    if (step === 0) {
      setStep(2);
      setOrderData(data);
      swiper?.slideNext();
      return;
    }

    if (step === 2) {
      if(data==="prev"){
        setStep(0)
        swiper?.slidePrev();
        return
      }else {
      setStep(3);
      setFabricID(data.id);
      swiper?.slideNext();
      
      return;
      }
    }
  };

  const handlePrevious = () => {
    swiper?.slidePrev();
  }

  return (
    <main className=" w-full flex flex-col items-center justify-center mt-10">
      <section className="max-w-main w-full flex flex-col items-center p-1">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="bg-white rounded-full p-3 text-primary primary">
              <IconUpload
                size={20}
                className="text-primary-900 primary"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className={`text-[14px] font-medium sm:text-secondary`}>
                {t("step_1")}
              </div>
              <div className={`text-[19px] font-medium sm:text-secondary`}>
                {t("upload_info")}
              </div>
            </div>
          </div>
          <div className="flex">
            <img
              className="hidden sm:block flex-1"
              alt="Line"
              src="/assets/images/Line.svg"
            />
          </div>

          <div className="flex items-center gap-1">
            <div
              className={`bg-white rounded-full p-3 text-primary primary ${
                step === 0 ? "opacity-60" : ""
              }`}
            >
              <IconCheck
                size={20}
                className="text-primary-900 primary"
              />
            </div>
            <div className="flex flex-col items-start">
              <div
                className={`text-[14px] font-medium sm:text-secondary ${
                  step === 2 || step === 0 ? "opacity-60" : ""
                }`}
              >
                {t("step_2")}
              </div>
              <div
                className={`text-[19px] font-medium sm:text-secondary ${
                  step === 2 || step === 0 ? "opacity-60" : ""
                }`}
              >
                {t("choose_fabric")}
              </div>
            </div>
          </div>
          <div className="flex">
            <img
              className="hidden sm:block flex-1 h-px"
              alt="Line"
              src="/assets/images/Line.svg"
            />
          </div>

          <div className="flex items-center gap-1">
            <div
              className={`bg-white rounded-full p-3 text-primary primary ${
                step === 0 || step === 2 ? "opacity-60" : ""
              }`}
            >
              <IconClock
                size={20}
                className="text-primary-900 primary"
              />
            </div>
            <div className="flex flex-col items-start">
              <div
                className={`text-[14px] font-medium leading-[16px] ${
                  step === 3 ? "text-secondary" : "text-white"
                } ${step === 0 || step === 2 ? "opacity-60" : ""}`}
              >
                {t("step_3")}
              </div>
              <div
                className={`text-[19px] font-medium leading-[24px] ${
                  step === 3 ? "text-secondary" : "text-white"
                } ${step === 0 || step === 2 ? "opacity-60" : ""}`}
              >
                {t("pending")}
              </div>
            </div>
          </div>
        </div>

        <div className="my-5"></div>
      </section>

      <section className="w-full flex flex-row items-center justify-center mt-2">
        <Swiper
          onSwiper={(swiper) => setSwiper(swiper)}
          slidesPerView={1}
          autoHeight={true}
          className="max-w-main"
          preventInteractionOnTransition={true}
          initialSlide={step}
          ref={swiperRef}
          allowTouchMove={false}
        >
          <SwiperSlide>
            <FirstStep
              onNext={handleNext}
              handResize={() => swiper?.slideTo(step)}
            />
          </SwiperSlide>

          <SwiperSlide>
            <SecondStep
              onNext={handleNext}
              orderData={orderData}
              handResize={() => swiper?.slideTo(step)}
              onPrevious={handlePrevious}
            />
          </SwiperSlide>

          <SwiperSlide>
            <ThirdStep />
          </SwiperSlide>
        </Swiper>
      </section>

      <ToastContainer />
    </main>
  );
}
