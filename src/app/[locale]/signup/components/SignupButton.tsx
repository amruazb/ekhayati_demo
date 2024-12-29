"use client"
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const SignupButton = ({ onClick, type, isLoading } : {type?: "button" | "submit" | "reset" | undefined,  onClick?: () => void, isLoading?: boolean }) => {
  const t = useTranslations("auth");
  return (<Button isLoading={isLoading} type={type} onClick={onClick} className="bg-secondary-800  w-full   sm:h-[48px] xs:h-[49.13px] sm:text-[19px] xs:text-[17px] xs:font-medium text-theme-900 rounded rounded-s">{t("register")}</Button>);
  
}

export default SignupButton;