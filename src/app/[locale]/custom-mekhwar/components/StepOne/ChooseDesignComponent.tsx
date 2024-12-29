"use client";
import CardContainer from "@/abstract/CardContainer";
import { filterMekhwar } from "@/provider";
import { CircularProgress } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import DesignCard from "./DesignCard";

export interface ChooseDesignComponentProps {
  selectedDesign: number | null;
  onSelectDesign: (id: number) => void;
}

export default function ChooseDesignComponent({
  selectedDesign,
  onSelectDesign,
}: ChooseDesignComponentProps) {
  const [designList, setDesignList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const t = useTranslations("customization");
  const locale = useLocale();

  const loadData = async () => {
    setIsLoading(true);
    const { data, error } = await filterMekhwar({
      filters: {
        //@ts-ignore
        customizable: {
          $eq: true,
        },
        //@ts-ignore
      },
      locale,
      populate: "main_image,tailor,images",
    });
    if (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }

    if (data?.data) {
      setDesignList(data.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container xs:w-full sm:w-[45%] min-h-[400px] flex flex-col justify-start items-start xs:mt-3">
      <h1 aria-label="title" className="text-white font-medium text-[18px]">{t("choose_design")}</h1>
      <div className="w-full h-full mt-2 min-h-[400px] max-h-[400px] overflow-y-auto">
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress aria-label="progess" color="secondary" />
          </div>
        )}
        {!isLoading && designList.length === 0 && (
          <div className="w-full h-full flex items-center justify-center">
            <p aria-label="desc" className="text-white">{t("no_designs")}</p>
          </div>
        )}
        {!isLoading && designList.length > 0 && (
          <div className="h-full w-full grid grid-cols-[repeat(auto-fill,_minmax(130px,_1fr))] gap-3">
            {designList.map((design, index) => (
              <DesignCard
                key={index}
                imgUrl={design?.attributes?.main_image?.data?.attributes?.url}
                name={design?.attributes?.title}
                price={design?.attributes?.price}
                id={design.id}
                selectedDesign={selectedDesign}
                onSelectDesign={onSelectDesign}
                otherImages={design?.attributes?.images?.data?.map(
                  (img: any) => img?.attributes?.url
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
