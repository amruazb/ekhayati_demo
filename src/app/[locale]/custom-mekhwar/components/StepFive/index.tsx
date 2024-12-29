"use client";
import { createCustomOder, extractError, getSiteConfig, quseUploadFile } from "@/provider";
import { useAuth } from "@/provider/AuthContext";
import { useRouter } from "@/utils";
import { Button, CircularProgress } from "@nextui-org/react";
import { IconBrandWhatsapp, IconClock, IconUser } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface StepFiveProps {
  selectedDesign: any;
  uploadedDesign: any;
  sizes: any;
  selectedFabricId: any;
  selectedFabricPattern: any;
}

export default function StepFive({
  selectedDesign,
  uploadedDesign,
  sizes,
  selectedFabricId,
  selectedFabricPattern,
}: StepFiveProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showPending, setShowPending] = useState(false);
  const [whatsappNum, setWhatsappNum] = useState("");

  const ctx = useAuth();
  const router = useRouter();
  const t = useTranslations("shop");

  const uploadedDesigns = async (designs: any) => {
    const uploadedData = [];

    for (const design of designs) {
      const formData = new FormData();
      formData.append("files", design);
      const res: any = await quseUploadFile(ctx.token, formData);
      uploadedData.push(res.data[0].id);
    }

    return uploadedData;
  };

  const loadConfig = async () => {
    const { data: siteConfigData, error: siteConfigError }: any = await getSiteConfig();

    if (siteConfigData?.data?.attributes) {
      setWhatsappNum(siteConfigData.data.attributes.whatsapp_number_for_custom_design);
    }
  };

  const processData = async () => {
    setIsLoading(true);
    try {
      const orderObj = {
        design: null,
        design2: null,
        design3: null,
        design4: null,
        fabricId: null,
        designId: null,
        patternId: null,
        shoulder: null,
        bust: null,
        wrist: null,
        cup: null,
        chest_point: null,
        neck: null,
        hips: null,
        height: null,
        arm_width: null,
        sleeves_length: null,
        addressId: null,
        size: null,
        customerInstructions: null,
        save_size_profile: null,
        size_profile_id: null,
      };

      await loadConfig();

      if (uploadedDesigns?.length) {
        const res = await uploadedDesigns(uploadedDesign);

        if (res[0]) orderObj["design"] = res[0];
        if (res[1]) orderObj["design2"] = res[1];
        if (res[2]) orderObj["design3"] = res[2];
        if (res[3]) orderObj["design4"] = res[3];
      }

      orderObj["fabricId"] = selectedFabricId;
      if (selectedFabricPattern) orderObj["patternId"] = selectedFabricPattern;

      if (sizes) {
        orderObj["shoulder"] = sizes?.shoulder;
        orderObj["bust"] = sizes?.bust;
        orderObj["wrist"] = sizes?.wrist;
        orderObj["cup"] = sizes?.cup;
        orderObj["chest_point"] = sizes?.chest_point;
        orderObj["neck"] = sizes?.neck;
        orderObj["hips"] = sizes?.hips;
        orderObj["height"] = sizes?.height;
        orderObj["arm_width"] = sizes?.arm_width;
        orderObj["sleeves_length"] = sizes?.sleeves_length;
        orderObj["save_size_profile"] = sizes?.saveSizeProfile;
        orderObj["size_profile_id"] = sizes?.size_profile_id;
      }

      if (selectedDesign) orderObj["designId"] = selectedDesign;

      orderObj["customerInstructions"] = sizes?.customerInstructions;

      if (!ctx.isAuthenticated) {
        // Store customization data in localStorage
        sessionStorage.setItem("pendingCustomization", JSON.stringify(orderObj));
  
        // Redirect the user to the login page with a redirect to the checkout flow
        router.push({
          pathname: "/login",
          query: {
            redirect: "/checkout/address",
          },
        });
        return;
      }

      const { data, error }: any = await createCustomOder(ctx.token, orderObj);

      if (data?.canPay && data?.orderId) {
        router.push({
          pathname: "/checkout/address",
          query: {
            orderType: "custom",
            orderId: data?.orderId,
          },
        });
        return;
      }

      if (!data?.canPay) {
        setShowPending(true);
      }

      setIsLoading(false);
    } catch (err: any) {
      if (err?.message) {
        toast.error(err.message);
      }

      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      }

      if (extractError(err)) {
        toast.error(extractError(err));
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    processData();
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
      <div className="container w-full max-w-[750px] min-h-[400px] flex flex-col justify-center items-center">
        {showPending && (
          <div className="flex flex-col items-center pb-5">
            <div className="w-300 flex justify-center items-center">
              <IconClock size={300} className=" sm:text-4xl md:text-5xl lg:text-6xl sx:text-medium xs:w-[50%]" />
            </div>

            <h1 className="text-5xl xs:text-3xl small:text-4xl medium:4xl font-bold text-center mb-5">
              {t("your_order_is_pending_l")}{" "}
              <span className="text-secondary-800">{t("your_order_is_pending_t")}</span>
            </h1>

            <p className="max-w-md text-center mb-5 px-5">
              {t("your_order_is_pending_description")}
            </p>

            <Button
              onClick={() => {
                window.open("https://wa.me/" + whatsappNum, "_blank");
              }}
              className="bg-primary-700 text-white max-w-[300px] text-[16px] font-bold w-full min-h-0 py-6 rounded-[6px]"
              startContent={
                isLoading ? (
                  <CircularProgress
                    className="text-secondary-800"
                    classNames={{ svg: "w-[24px]" }}
                  />
                ) : (
                  <IconBrandWhatsapp size={24} />
                )
              }
            >
              {t("chat_with_us")}
            </Button>

            <Button
              onClick={() => {
                router.push("/profile");
              }}
              className="bg-primary-700 text-white max-w-[300px] text-[16px] font-bold w-full min-h-0 py-6 rounded-[6px] mt-5"
              startContent={<IconUser size={24} />}
            >
              {t("view_order")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
