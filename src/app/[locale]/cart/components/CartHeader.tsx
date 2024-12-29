'use client'
import ShopPageHeader from "@/components/shop/shop-page-header"
import { useTranslations } from "next-intl"

export const CartHeader = () => {
  const t = useTranslations("shop");
  return <ShopPageHeader title="" coloredTitle={t("cart")} description={t("cart_description")} />
}