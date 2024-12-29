"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { IconCloudUp, IconEye, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import CardContainer from "@/abstract/CardContainer";
import Lightbox from "yet-another-react-lightbox";
import LightboxZoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export interface UploadDesignComponentProps {
  handleUpload: (file: File) => void;
  uploadedDesigns: File[] | [];
  handleDelete: (index: number) => void;
}

export default function UploadDesignComponent({ uploadedDesigns, handleUpload, handleDelete}: UploadDesignComponentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("customization");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
      //reset file input to empty the file input from files
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };
  return (
    <div className="container xs:w-full sm:w-[45%] min-h-[400px] flex flex-col justify-start items-start xs:mt-5">
      <h1 aria-label="title" className="text-white font-medium text-[18px]">{t("upload_design")}</h1>
      <CardContainer
        scissors={false}
        extraClasses="w-full h-full min-h-[400px] mt-2"
      >
        {/* <div className="uploader flex justify-start items-start flex-wrap"> */}
        <div className="h-full w-full grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-1">
          {uploadedDesigns.map((file, index) => (
            <div
              key={index}
              className={`w-[100px] h-[100px] flex flex-col justify-center items-center border-small border-black/15 rounded-md select-none cursor-pointer hover:shadow-sm hover:shadow-secondary/20 transition-shadow relative upload-item`}
            >
              <Image
                src={URL.createObjectURL(file)}
                alt="design"
                className="w-full h-full object-cover rounded-md"
                fill
                aria-label="image"
              />

              <div className="upload-item-overlay">
                <Button
                  className="min-w-[25px] min-h-[25px] w-[30px] h-[30px] text-secondary mr-2 bg-primary"
                  isIconOnly
                  onClick={() => {
                    setCurrentSlide(index);
                    setLightboxOpen(true);
                  }}
                >
                  <IconEye size={16} />
                </Button>
                <Button
                  className="min-w-[25px] min-h-[25px] w-[30px] h-[30px] text-danger bg-primary"
                  isIconOnly
                  onClick={() => handleDelete(index)}
                >
                  <IconTrash size={16} />
                </Button>
              </div>
            </div>
          ))}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />

          {uploadedDesigns.length < 4 && (
            <div
              className={`w-[100px] h-[100px] flex flex-col justify-center items-center border-small border-black/15 rounded-md select-none cursor-pointer hover:shadow-sm hover:shadow-secondary/20 transition-shadow relative`}
            >
              <Button
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.click();
                  }
                }}
                className="w-full h-full flex items-center justify-center bg-primary text-white rounded-md"
              >
                <IconCloudUp size={24} />
              </Button>
            </div>
          )}
        </div>
      </CardContainer>

      <Lightbox
        slides={uploadedDesigns.map((file) => ({ src: URL.createObjectURL(file) }))}
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentSlide}
        plugins={[LightboxZoom]}
        animation={{ zoom: 500 }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: false,
        }}
      />
    </div>
  );
}
