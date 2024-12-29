import CardContainer from "@/abstract/CardContainer";
import { Button } from "@nextui-org/react";
import { IconCheck, IconEye } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import LightboxZoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { motion } from "framer-motion";
export interface DesignCardProps {
  imgUrl: string;
  name: string;
  price: number;
  id: number;
  selectedDesign?: number | null;
  onSelectDesign?: (id: number) => void;
  otherImages?: string[];
}

export default function DesignCard({
  imgUrl,
  name,
  price,
  id,
  selectedDesign,
  onSelectDesign,
  otherImages,
}: DesignCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleOpenLightbox = () => {
    setLightboxOpen(true);
  };
  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const handleSelectDesign = () => {
    if (onSelectDesign) {
      onSelectDesign(id);
    }
  };

  return (
    <CardContainer scissors={false}>
      <div
        className="w-full h-full flex flex-col justify-start items-start cursor-pointer relative"
        onClick={handleSelectDesign}
      >
        {selectedDesign === id && (
          <motion.div
            initial={selectedDesign === id ? { scale: 0 } : { scale: 1 }}
            animate={
              selectedDesign === id ? { rotate: 360, scale: 1 } : { scale: 0, rotate: -360 }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="absolute top-2 right-2 z-[50] bg-secondary rounded-full p-2 shadow-xl"
            aria-label="selected-design"
          >
            <IconCheck aria-label="icon" size={16} />
          </motion.div>
        )}
        <div className="w-full aspect-square relative choose-design-item-image">
          <Image
            src={imgUrl}
            alt={name || "design"}
            fill
            className="rounded-md w-full h-[125px] max-h-[130px] aspect-square object-cover"
            aria-label="image"
          />

          <Button
            onClick={handleOpenLightbox}
            className="bg-primary text-secondary hidden xs:flex absolute z-50 right-0 bottom-[10px]"
            aria-label="view-image"
          >
            <IconEye size={24} />
          </Button>

          <div className="design-card-image-item-overlay xs:hidden">
            <Button
              onClick={handleOpenLightbox}
              className="bg-primary text-secondary"
              aria-label="view-image"
            >
              <IconEye size={24} />
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-start mt-2">
          <p className="text-white font-medium text-[12px] line-clamp-1">{name}</p>
          <p className="text-secondary font-medium mt-2 text-[12px]">{price} AED</p>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={handleCloseLightbox}
        slides={[
          ...(otherImages?.map((img) => ({ src: img, caption: name })) ?? []),
          { src: imgUrl, caption: name },
        ]}
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
    </CardContainer>
  );
}
