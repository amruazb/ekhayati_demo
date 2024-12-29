'use client'
import CardContainer from "@/abstract/CardContainer";
import { motion, useAnimate } from "framer-motion";
import { useLocale } from "next-intl";

interface SmallTextCardProps {
  title?: string;
  description?: string;
  link?: string;
}

export const SmallTextCard = (props: SmallTextCardProps) => {
  const [scope, animate] = useAnimate();
  const locale = useLocale();

  return (
    <motion.div ref={scope} transition={{ duration: 3 }} onHoverStart={() => animate(scope.current, { filter: "drop-shadow(0 0 1.25rem rgba(255, 218, 148, 0.28))" })} onHoverEnd={() => animate(scope.current, { filter: "drop-shadow(0 0 0.75rem rgba(255, 218, 148, 0))"})} className='xs:w-[45vw]'>
      <CardContainer scissors={true}>
        <div  className="w-full flex flex-col justify-center sm:py-3 xs:py-2 xs:w-[auto] cursor-pointer" onClick={() => {
          window.open(props?.link, "_blank");
        }}>
          <span className={`text-secondary ${
          locale === "en" ? "text-left" : "text-right"
        } text-3xl font-medium  sm:my-1`}>{props?.title}</span>
          <div className={`text-[17.96px] ${
          locale === "en" ? "text-left" : "text-right"
        } font-medium font-roboto text-white inline-block`}>{props?.description}</div>
        </div>
      </CardContainer>
    </motion.div>
  )
}

export default SmallTextCard;