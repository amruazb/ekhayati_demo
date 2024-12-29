'use client'
import { Button } from "@nextui-org/react";
import CartItem from "./CartItem";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { IconSquareRoundedArrowDown } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";

export interface ItemListContainerProps {
  items?: any[];
  customItems?: any[];
  handleAction?: (action: "increment" | "decrement" | "delete", item: any) => void;
}

export default function ItemListContainer(props: ItemListContainerProps) {

  const [hideArrow, setHideArrow] = useState(false);

  const controls = useAnimationControls();

  const containerRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("shop");
  const locale = useLocale();

  useEffect(() => {
    if (containerRef?.current != undefined) {
      if (containerRef?.current?.scrollHeight - 10 >= containerRef?.current?.offsetHeight) setHideArrow(true)
    }
  }, [containerRef?.current?.scrollHeight])
  
  const handleScroll = (e: any) => {
    if (e.target.scrollTop > 0) controls.start({ opacity: '0'}, {duration: 0.5, ease: 'easeInOut'})
    else controls.start({ opacity: '1'}, { duration: 0.5, ease: 'easeInOut' })
  }

  const handleScrollDown = () => {
    if (containerRef.current) containerRef.current.scrollTo({top: containerRef.current.scrollHeight, behavior: 'smooth'})
  }
  
  return (
    <div style={{
      overflowX: "hidden"
    }} className="items max-w-full xs:max-h-full sm:max-h-full lg:overflow-scroll relative lg:max-h-[638px]" onScroll={handleScroll} ref={containerRef}>
      <div className="w-full flex flex-row justify-start items-start">
        <h1 className="text-white font-medium text-xl">{t("shopping_cart")}</h1>
      </div>

      <div className="item-list">
        {
          props?.items?.map((item, index) => <CartItem
          index={index}
          key={"mekhwar-" + index}
          image={item?.mekhwar?.main_image?.url}
          name={locale == item?.mekhwar?.locale ? item?.mekhwar?.title : item?.mekhwar?.localizations?.[0]?.title}
          price={item?.mekhwar?.price}
          quantity={item?.quantity}
          action={props.handleAction}
          id={item?.id}
          type={"custom"}
          />)
        }
      </div>

      <motion.div animate={controls} transition={{duration: 0.5, ease: 'easeInOut'}} className={`${!hideArrow ? 'hidden xs:hidden sm:hidden md:hidden lg:hidden' : ''} xs:hidden sm:hidden md:hidden lg:flex bg-gradient-to-b from-transparent from-10% to-black/30 rounded-[8px] to-100% w-full flex-row justify-center items-center sticky  bottom-0 left-0 h-[60px]`}>
        <Button onClick={handleScrollDown} className="animate-bounce bg-transparent rounded-full" isIconOnly><IconSquareRoundedArrowDown className="text-secondary-800 text-3xl" /></Button>
      </motion.div>
    </div>
  )
}