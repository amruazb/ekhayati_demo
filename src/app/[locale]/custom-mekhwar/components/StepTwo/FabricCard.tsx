"use client";
import CardContainer from "@/abstract/CardContainer";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Avatar, Button, Card, CardHeader, Modal, ModalContent } from "@nextui-org/react";
import { IconCheck, IconEye } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Lightbox from "yet-another-react-lightbox";
import LightboxZoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export interface FabricCardProps {
  selectedFabricId: number | null;
  id: number;
  name: string;
  price: number;
  patterns: any[];
  onSelectFabric: (id: number) => void;
  onSelectPattern: (id: any) => void;
  imageUrl: string;
  otherImages: any;
  selectedPattern: number | null;
}

export default function FabricCard({
  selectedFabricId,
  id,
  name,
  price,
  patterns,
  onSelectFabric,
  imageUrl,
  otherImages,
  onSelectPattern,
  selectedPattern,
}: FabricCardProps) {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [patternDialogOpen, setPatternDialogOpen] = React.useState(false);
  const [patternLightboxOpen, setPatternLightboxOpen] = React.useState(false);
  const [openPattern, setOpenPattern] = React.useState<any>(null);

  const t = useTranslations("customization");

  const handleOpenLightbox = () => {
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const handleSelectFabric = () => {
    onSelectPattern(null);
    if (patterns?.length) {
      setPatternDialogOpen(true);
      return;
    }

    onSelectFabric(id);
  };

  const handleSelectPattern = (patternId: number) => {
    setPatternDialogOpen(false);
    onSelectFabric(id);
    onSelectPattern(patternId);
  };

  return (
    <CardContainer scissors={false}>
      <div
        className="w-full h-full flex flex-col justify-start items-start cursor-pointer relative"
        onClick={handleSelectFabric}
      >
        {selectedFabricId === id && (
          <motion.div
            initial={selectedFabricId === id ? { scale: 0 } : { scale: 1 }}
            animate={
              selectedFabricId === id ? { rotate: 360, scale: 1 } : { scale: 0, rotate: -360 }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="absolute top-2 right-2 z-[50] bg-secondary rounded-full p-2 shadow-xl"
          >
            <IconCheck size={16} />
          </motion.div>
        )}
        <div className="w-full aspect-square  relative choose-design-item-image">
          <Image
            src={imageUrl}
            alt={name || "design"}
            fill
            objectFit="cover"
            className="rounded-md w-[100px] h-[100px] object-cover"
            aria-label="design-image"
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
          {price ? (
            <p className="text-secondary font-medium mt-2 text-[12px]">{price} AED</p>
          ) : (
            <span className="text-secondary text-[12px]">{t("price_after_confirmation")}</span>
          )}
        </div>
        <div className="w-full flex-row items-start justify-start mt-2 hidden">
          {patterns?.map((pattern) => (
            <div key={pattern.id} className="flex items-center justify-start">
              <Image
                src={pattern.image?.data?.attributes?.formats?.small?.url}
                alt={pattern?.name || "fabric"}
                width={30}
                height={30}
                objectFit="cover"
                className="rounded-md w-[30px] h-[30px] max-h-[30px] object-cover"
              />
              <p className="text-white font-medium text-[12px] line-clamp-2 ml-2">
                {pattern.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={handleCloseLightbox}
        slides={[
          ...(otherImages?.data?.map((img: any) => ({
            src: img?.attributes?.formats?.medium?.url,
            caption: name,
          })) ?? []),
          { src: imageUrl, caption: name },
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

      <Modal isOpen={patternDialogOpen} onClose={() => setPatternDialogOpen(false)} size="sm">
        <ModalContent>
          <CardContainer scissors={false}>
            <div className="w-full h-full flex flex-col items-start justify-start p-3">
              <h1 className="text-xl font-bold text-secondary text-[16px]">Select Pattern</h1>
              <div className="w-full h-full flex flex-col">
                {patterns?.map((pattern) => (
                  <Card
                    key={pattern.id}
                    className="max-w-[340px] bg-transparent shadow-sm px-0"
                  >
                    <CardHeader className="justify-between pr-0 pl-1">
                      <div className="flex gap-5">
                        <Avatar
                          isBordered
                          radius="sm"
                          size="md"
                          src={pattern?.image?.data?.attributes?.url}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {pattern?.title}
                          </h4>
                          {/* <h5 className="text-small tracking-tight text-default-400">
                            {pattern?.price} AED
                          </h5> */}
                        </div>
                      </div>
                      <Button
                        color="primary"
                        radius="full"
                        size="sm"
                        onClick={() => {
                          setOpenPattern(pattern);
                          setPatternLightboxOpen(true);
                        }}
                      >
                        <IconEye size={20} />
                      </Button>
                      <Button
                        color="primary"
                        radius="full"
                        size="sm"
                        onClick={() => handleSelectPattern(pattern.id)}
                      >
                        {t("select")}
                      </Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </CardContainer>
        </ModalContent>
      </Modal>
      <Lightbox
        open={patternLightboxOpen && openPattern}
        close={() => {
          setPatternLightboxOpen(false);
          setPatternDialogOpen(true);
        }}
        slides={[
          {
            src: openPattern?.image?.data?.attributes.url || "",
            alt: openPattern?.title || "fabric image",
          },
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
