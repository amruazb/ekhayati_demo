import { filterFabric, filterMekhwar, getSiteConfig } from "@/provider";
import { CircularProgress } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface StepFourProps {
  selectedDesign: any;
  uploadedDesign: any;
  sizes: any;
  selectedFabricId: any;
  selectedFabricPattern: any;
  handleHasPrice: any;
}

export default function StepFour({
  selectedDesign,
  uploadedDesign,
  selectedFabricId,
  selectedFabricPattern,
  handleHasPrice,
  sizes,
}: StepFourProps) {
  const [fabric, setFabric] = useState<any>(null);
  const [design, setDesign] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [siteConfig, setSiteConfig] = useState<any>({});
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [designPrice, setDesignPrice] = useState(0);
  const [fabricPrice, setFabricPrice] = useState(0);

  const t = useTranslations("customization");
  const locale = useLocale();

  const loadData = async () => {
    const fabricObj: any = {};
    const designObj: any = {};
    let siteCnf: any = {};

    setIsLoading(true);

    if (selectedFabricId) {
      const fabricFilters: any = {
        filters: {
          id: {
            $eq: selectedFabricId,
          },
        },
        populate: ["fabric_pattern", "main_image", "fabric_pattern.image", "localizations"],
        locale,
      };

      let { data: fabrics, error: fabricError }: any = await filterFabric(fabricFilters);

      if (fabric?.attributes?.locale != "en") {
        const enFab = fabrics?.data?.[0]?.attributes?.localizations?.data?.find(
          (fab: any) => fab?.attributes?.locale === "en"
        );
        console.log("enFab", enFab);
        if (enFab && fabric?.data?.[0]) {
          fabrics.data[0].id = enFab?.id;
        }
      }

      const fabricRes = fabrics?.data[0];
      fabricObj["id"] = fabricRes?.id;
      fabricObj["name"] = fabricRes.attributes?.name;
      fabricObj["price"] = fabricRes.attributes?.price;
      fabricObj["image"] = fabricRes.attributes?.main_image;
      fabricObj["pattern"] = {};

      if (
        fabricRes?.attributes?.children_price > 0 &&
        fabricRes?.attributes?.children_length > 0
      ) {
        if (sizes?.height <= fabricRes?.attributes?.children_length) {
          fabricObj["price"] = fabricRes?.attributes?.children_price;
        }
      }

      if (selectedFabricPattern) {
        const pattern = fabricRes.attributes.fabric_pattern.find(
          (pattern: any) => pattern?.id === selectedFabricPattern
        );
        fabricObj["pattern"]["id"] = pattern?.id;
        fabricObj["pattern"]["name"] = pattern.title;
        fabricObj["pattern"]["price"] = pattern.price;
        fabricObj["pattern"]["image"] = pattern.image;
      }
      setFabric(fabricObj);
    }

    if (selectedDesign) {
      const mekhwarFilters: any = {
        filters: {
          id: {
            $eq: selectedDesign,
          },
        },
        populate: ["main_image", "localizations"],
        locale,
      };

      let { data: mekhwarData, error: mekhwarError }: any = await filterMekhwar(
        mekhwarFilters
      );

      const selectedDesignRes = mekhwarData?.data[0];

      if (selectedDesignRes?.attributes?.locale != "en") {
        const enFab = selectedDesignRes?.attributes?.localizations?.data?.find(
          (fab: any) => fab?.attributes?.locale === "en"
        );
        if (enFab) {
          selectedDesignRes.id = enFab?.id;
        }
      }

      designObj["id"] = selectedDesignRes.id;
      designObj["name"] = selectedDesignRes.attributes.title;
      designObj["price"] = selectedDesignRes.attributes.price;
      designObj["image"] = selectedDesignRes.attributes.main_image;
      setDesign(designObj);
    }

    const { data: siteConfigData, error: siteConfigError } = await getSiteConfig();

    if (siteConfigData?.data?.attributes) {
      setSiteConfig(siteConfigData.data.attributes);
      siteCnf = siteConfigData.data.attributes;
    }

    calculatePrice(fabricObj, designObj, siteCnf);
  };

  const calculatePrice = (fb: any, ds: any, st: any) => {
    //set delivery
    setDeliveryCharge(st?.delivery_charge);

    //set design price
    if (ds?.price) {
      setDesignPrice(ds?.price);
    }

    //set fabric price
    if (fb?.price) {
      setFabricPrice(fb?.price);
    }

    //set tax
    if (st?.tax) {
      setTax((ds?.price + fb?.price) * (st?.tax / 100));
    }

    //set total
    const t =
      ds?.price +
      fb?.price +
      (ds?.price + fb?.price) * ((st?.tax || 0) / 100);

    if (t && ds?.price && fb?.price) {
      setTotal(t);
      handleHasPrice(true);
      setIsLoading(false);
    } else {
      handleHasPrice(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex justify-between items-start">
        <div className="container w-full min-h-[400px] flex flex-col justify-center items-center">
          <CircularProgress color="secondary" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="container w-full max-w-[750px] min-h-[400px] flex flex-col justify-center items-start">
        <div className="w-full flex flex-col items-start justify-start">
          {uploadedDesign?.length > 0 && (
            <div className="w-full h-[70px] bg-primary-700 rounded-md p-3 flex justify-between items-center">
              <div className="items-cont flex justify-start items-center h-full">
                {uploadedDesign.map((design: any, index: number) => (
                  <div
                    className="relative h-full aspect-square border-secondary border-solid rounded-md border-2 mx-1"
                    key={`design-image-${index}`}
                  >
                    <Image
                      src={URL.createObjectURL(design)}
                      alt="design"
                      fill
                      className="w-full h-full aspect-square object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="items-price text-[14px] font-medium">
                {t("price_after_confirmation")}
              </p>
            </div>
          )}

          {design && (
            <div className="w-full h-[70px] bg-primary-700 rounded-md p-3 flex justify-between items-center">
              <div className="items-cont flex justify-start items-center h-full">
                <div className="relative h-full aspect-square border-secondary border-solid rounded-md border-2 mx-1">
                  <Image
                    src={design?.image?.data?.attributes?.url}
                    alt="design"
                    fill
                    className="w-full h-full aspect-square object-cover"
                  />
                </div>
                <p className="text-white font-medium text-[14px] w-auto">{design.name}</p>
              </div>
              <p className="items-price text-[14px] font-medium">{design.price} AED</p>
            </div>
          )}

          {fabric && !selectedFabricPattern && (
            <div className="w-full h-[70px] bg-primary-700 rounded-md p-3 flex justify-between items-center mt-3">
              <div className="items-cont flex justify-start items-center h-full">
                <div className="relative h-full aspect-square border-secondary border-solid rounded-md border-2 mx-1">
                  <Image
                    src={fabric?.image?.data?.attributes?.url}
                    alt="fabric"
                    fill
                    className="w-full h-full aspect-square object-cover"
                  />
                </div>
                <p className="text-white font-medium text-[14px] w-auto">{fabric.name}</p>
              </div>
              {fabricPrice ? (
                <p className="items-price text-[14px] font-medium">{fabricPrice} AED</p>
              ) : (
                <p className="items-price text-[14px] font-medium">
                  {t("price_after_confirmation")}
                </p>
              )}
            </div>
          )}

          {selectedFabricPattern && (
            <div className="w-full h-[70px] bg-primary-700 rounded-md p-3 flex justify-between items-center mt-3">
              <div className="items-cont flex justify-start items-center h-full">
                <div className="relative h-full aspect-square border-secondary border-solid rounded-md border-2 mx-1">
                  <Image
                    src={fabric?.pattern?.image?.data?.attributes?.url}
                    alt="fabric"
                    fill
                    className="w-full h-full aspect-square object-cover"
                  />
                </div>
                <p className="text-white font-medium text-[14px] w-auto">
                  {fabric?.pattern?.name}
                </p>
              </div>
              {fabricPrice ? (
                <p className="items-price text-[14px] font-medium">{fabricPrice} AED</p>
              ) : (
                <p className="items-price text-[14px] font-medium">
                  {t("price_after_confirmation")}
                </p>
              )}
            </div>
          )}

          {/* Start Price */}
          {design?.price && design?.price > 0 && fabric?.price && fabric?.price > 0 ? (
            <div className="w-full flex flex-col mt-4 p-1">
              {/* <div className="w-full flex items-center justify-between mb-2">
                <p className="text-secondary font-medium text-[16px]">{t("subtotal")}</p>
                <p className="text-secondary font-medium text-[16px]">
                  {design.price + fabric.price} AED
                </p>
              </div> */}
              {siteConfig?.tax > 0 ? (
                <div className="w-full flex items-center justify-between mt-3">
                  <p className="text-white text-[16px]">{t("estimated_tax")}</p>
                  <p className="text-white text-[16px]">{tax} AED</p>
                </div>
              ) : null}
              {siteConfig?.deliveryCharge > 0 && (
                <div className="w-full flex items-center justify-between mt-3">
                  <p className="text-white text-[16px]">{t("estimated_shipping_handling")}</p>
                  <p className="text-white text-[16px]">
                    {siteConfig?.delivery_charge ? (
                      <>{deliveryCharge} AED</>
                    ) : (
                      <>{t("free")}</>
                    )}
                  </p>
                </div>
              )}
              <div className="w-full flex items-center justify-between mt-5">
                <p className="text-secondary font-medium text-[16px]">{t("total")}</p>
                <p className="text-secondary font-medium text-[16px]">{total} AED</p>
              </div>
            </div>
          ) : (
            <div className="w-full mt-3 flex justify-center items-center">
              <h2 className="text-white font-medium text-[18px] mt-3">
                {t("price_after_confirmation")}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
