'use client'
import CardContainer from "@/abstract/CardContainer";
import Image from "next/image";
import { motion } from "framer-motion";

export interface FabricCardGrowableProps {
  attributes: any;
  maxWidth?: number
  image?: string;
  title?: string;
  description?: string;
  link?: string;
  id?: number;
  price?: number;
}

export const FabricCardGrowable = ({ maxWidth, image, title, description, link, price }: FabricCardGrowableProps) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} className="single-card-solitaire-container xs:w-[173px] xs:h-max-[280px] sm:h-full sm:w-[250px] sm:h-[404px] overflow-visible">
      <CardContainer scissors={true}>
        <Image priority={true} unoptimized src={image || ""} width="0" height="0" sizes="100vw" className="xs:w-full xs:h-[118px] object-cover sm:h-[150px] sm:w-full" style={{ maxWidth, }} alt="" />

        <Image priority={true} unoptimized src="/assets/images/Border-desktop.png" className="xs:hidden sm:block mt-2 mb-1 w-[230px] h-[1px]" width="0"
          height="0"
          sizes="100vw" style={{ maxWidth, }} alt="" />

        <Image priority={true} unoptimized src="/assets/images/Border-mobile.png" className="sm:hidden xs:block mt-2 mb-1 w-full" width={230} height={150} style={{ maxWidth, }} alt="" />

        <div className="item-details flex flex-col xs:p-1 xs:pt-0 sm:p-2 sm:pt-0">

          <div className="w-full">
            <h3 className="xs:text-[10px] sm:text-white text-base font-medium ">{title}</h3>
          </div>

          {/* <div className="flex items-center justify-between">
            <div className="flex flex-col items-start justify-center w-[75%]">
              <div className="text-white xs:text-[12px] sm:text-base font-medium  xs:mb-1 sm:my-1">Mekhwar Name</div>
              <div className="text-white xs:text-[9px] sm:text-xs font-light  ">Arabian Tailors Modest</div>
            </div>
            <FavoriteButton />
          </div> */}
        </div>

      </CardContainer>
    </motion.div>
  );
}
