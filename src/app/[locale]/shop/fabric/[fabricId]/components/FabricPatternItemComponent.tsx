"use client";
import { useRouter } from "@/utils";
import { Avatar, Button, Card, CardHeader } from "@nextui-org/react";
import { IconEye } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import LightboxZoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export interface FabricPatternItemComponentProps {
  image: string;
  title: string;
  categoryName: string;
}

export function FabricPatternItemComponent({
  image,
  title,
  categoryName,
}: FabricPatternItemComponentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const router = useRouter();

  const handleOpenLightbox = () => {
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <Card className="max-w-[340px] bg-transparent shadow-sm px-0">
      <CardHeader className="justify-between pr-0 pl-1">
        <div className="flex gap-5">
          <Avatar isBordered radius="sm" size="lg" src={image} />
          <Lightbox
            open={lightboxOpen}
            close={handleCloseLightbox}
            index={0}
            slides={[{ src: image }]}
            render={{
              slide: ({ slide }) => (
                <div
                  className="w-full h-full flex flex-col justify-start items-start cursor-pointer relative"
                  onClick={handleOpenLightbox}
                >
                  <div className="w-full h-full relative">
                    <Image
                      className="h-full object-cover"
                      src={image}
                      alt={slide.src}
                      layout="fill"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              ),
            }}
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
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{title}</h4>
            <h5 className="text-small tracking-tight text-default-400">{categoryName}</h5>
          </div>
          <div className="h-full flex justify-center items-center my-auto">
            <Button
              className="bg-transparent text-secondary min-w-[25px]"
              onClick={handleOpenLightbox}
            >
              <IconEye size={20} />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
