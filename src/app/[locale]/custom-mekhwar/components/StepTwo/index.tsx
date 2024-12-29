"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useState, useEffect, useCallback } from "react";
import FabricCard from "./FabricCard";
import { CircularProgress } from "@nextui-org/react";
import { filterFabric } from "@/provider";

export interface StepTwoProps {
  selectedFabricId: number | null;
  onSelectFabric: (id: number) => void;
  selectedFabricPattern: number | null;
  onSelectFabricPattern: (id: number) => void;
}

export default function StepTwo({
  selectedFabricId,
  onSelectFabric,
  selectedFabricPattern,
  onSelectFabricPattern
}: StepTwoProps) {
  const [fabrics, setFabrics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const t = useTranslations("customization");
  const locale = useLocale();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await filterFabric({
        populate: "main_image,images,fabric_pattern,fabric_pattern.image",
        "pagination[limit]": 200,
        locale,
      });
  
      if (error) {
        console.error(error);
        return;
      }
  
      setFabrics(data?.data ?? []);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [setIsLoading, setFabrics, locale]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <div className="w-full min-h-[400px] flex flex-col justify-start items-start">
      <h1 className="text-white font-medium text-[18px]">{t("choose_your_fabric")}</h1>

      <div className="w-full h-full mt-2 min-h-[400px] max-h-[400px] overflow-y-auto">
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="secondary" />
          </div>
        )}
        {!isLoading && fabrics.length === 0 && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-white">{t("no_designs")}</p>
          </div>
        )}
        {!isLoading && fabrics.length > 0 && (
          <div className="h-full w-full grid grid-cols-[repeat(auto-fill,_minmax(135px,_1fr))] gap-3">
            {fabrics.map((fabric: any) => (
              <FabricCard
                key={fabric.id}
                selectedFabricId={selectedFabricId}
                onSelectFabric={onSelectFabric}
                name={fabric?.attributes?.name}
                imageUrl={fabric.attributes.main_image?.data?.attributes?.formats?.medium?.url}
                price={fabric?.attributes?.price}
                otherImages={fabric?.attributes?.images}
                id={fabric.id}
                patterns={fabric?.attributes?.fabric_pattern}
                onSelectPattern={onSelectFabricPattern}
                selectedPattern={selectedFabricPattern}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
