"use client";
import { ThemeInput } from "@/components/input/theme-input";
import { useAuth } from "@/provider/AuthContext";
import {
  Button,
  Checkbox,
  DropdownMenu,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { Link, useRouter } from "..";
import { addMekhwarToCart } from "@/provider";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getUserProfiles, storeCart } from "@/utils/cart";
import {
  IconEye,
  IconInfoCircle,
  IconNeedleThread,
  IconShoppingBag,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import DropdownComponent from "@/app/[locale]/custom-mekhwar/components/Drop";

let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

const formSchema = Yup.object().shape({
  shoulder: Yup.number()
    .positive()
    .test(
      "is-decimal",
      "The amount should be a decimal with maximum two digits after comma",
      (val: any) => {
        if (val != undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }
    )
    .typeError("Number required")
    .required("Required")
    .max(13.5)
    .min(8),
  bust: Yup.number()
    .positive()
    .test(
      "is-decimal",
      "The amount should be a decimal with maximum two digits after comma",
      (val: any) => {
        if (val != undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }
    )
    .typeError("Number required")
    .required("Required")
    .max(42)
    .min(32),
  sleeves_length: Yup.number()
    .positive()
    .test(
      "is-decimal",
      "The amount should be a decimal with maximum two digits after comma",
      (val: any) => {
        if (val != undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }
    )
    .typeError("Number required")
    .required("Required")
    .max(30)
    .min(19),
  hips: Yup.number()
    .test(
      "is-decimal",
      "The amount should be a decimal with maximum two digits after comma",
      (val: any) => {
        if (val != undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }
    )
    .typeError("Number required")
    .required("Required")
    .max(44)
    .min(34),
  arm_width: Yup.number()
    .test(
      "is-decimal",
      "The amount should be a decimal with maximum two digits after comma",
      (val: any) => {
        if (val != undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }
    )
    .typeError("Number required")
    .required("Required")
    .max(20.5)
    .min(10),
  wrist: Yup.number()
    .test(
      "is-decimal",
      "The amount should be a decimal with maximum two digits after comma",
      (val: any) => {
        if (val != undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }
    )
    .typeError("Number required")
    .required("Required")
    .max(9.25)
    .min(6.80),
  height: Yup.number()
    .test(
      "is-decimal",
      "The amount should be a decimal with maximum two digits after comma",
      (val: any) => {
        if (val != undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }
    )
    .typeError("Number required")
    .required("Required")
    .min(50),
  neck: Yup.number()
    .test(
      "is-decimal",
      "The amount should be a decimal with maximum two digits after comma",
      (val: any) => {
        if (val != undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }
    )
    .typeError("Number required")
    .required("Required")
    .max(9)
    .min(5.5),
  saveSizeProfile: Yup.boolean(),
});

interface MekhwarBuyOptionsForm {
  shoulder: number;
  arm_width: number;
  wrist: number;
  height: number;
  neck: number;
  hips: number;
  sleeves_length: number;
  saveSizeProfile: boolean;
  localizations?: any;
  bust: number;
}

export interface MekhwarBuyOptionsProps {
  id?: string;
  sizes?: any[];
  description?: string;
  localizations?: any;
  fabric?: any;
  customizable?: boolean;
}

export const MekhwarBuyOptions = (props: MekhwarBuyOptionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("CUSTOM");
  const [sizeProfiles, setSizeProfiles] = useState<any[]>([]);
  const [selectedSizeProfile, setSelectedSizeProfile] = useState<any>(null);
  const [saveSizeProfile, setSaveSizeProfile] = useState(false);
  const t = useTranslations("shop");
  const [selectedChestOption, setSelectedChestOption] = useState(t("chest_point"));
  const [selectedCupOption, setSelectedCupOption] = useState(t("cup_size"));
  const [customerInstructions, setcustomerInstructions] = useState("");
  const [shoulder, setShoulder] = useState<number>();
  const [neck, setNeck] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [wrist, setWrist] = useState<number>();
  const [sleevesLength, setSleevesLength] = useState<number>();
  const [armWidth, setArmWidth] = useState<number>();
  const [hips, setHips] = useState<number>();
  const [bust, setBust] = useState<number>();
  // const [selectedWristOption, setSelectedWristOption] = useState("Wrist Style");
  // const [selectedNeckOption, setSelectedNeckOption] = useState("Neck Style");
  const ctx = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const handleChestChange = (value: string) => {
    setSelectedChestOption(value);
  };
  const handleCupChange = (value: string) => {
    setSelectedCupOption(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    reset,
  } = useForm<MekhwarBuyOptionsForm>({
    mode: "onTouched",
    //@ts-ignore
    resolver: yupResolver(formSchema),
  });

  const loadData = async () => {
    const sizeProfiles = getUserProfiles();
    setSizeProfiles(sizeProfiles);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddToCart = async () => {
    if (!ctx.isAuthenticated) {
      return router.push("/login");
    }
    if (selectedChestOption === "Chest Point") {
      toast.error("Please select a Chest Point size", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (selectedCupOption === "Cup") {
      toast.error("Please select a Cup size", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    trigger();
    return await addCustomToCart();
  };

  const handleNewSize = () => {
    setSelectedSize("CUSTOM");
    setWrist(undefined);
    setShoulder(undefined);
    setNeck(undefined);
    setHeight(undefined);
    setWrist(undefined);
    setSleevesLength(undefined);
    setArmWidth(undefined);
    setHips(undefined);
    setSelectedSizeProfile(null);
    setBust(undefined);
    reset();
  };

  const addCustomToCart = async () => {
    const vals = getValues();
    for (const key in vals) {
      //@ts-ignore
      if (vals[key] < 1) {
        return;
      }
    }
    setIsLoading(true);
    const { data, error } = await addMekhwarToCart(ctx.token, {
      ...getValues(),
      cup: selectedCupOption,
      chest_point: selectedChestOption,
      customer_instructions: customerInstructions,
      mekhwarId: locale === "en" ? props.id : props.localizations,
      sizeProfile: selectedSizeProfile,
      saveSizeProfile: saveSizeProfile,
      // wrist: selectedWristOption,
      // neck: selectedNeckOption,
    });
    storeCart(data);
    setIsLoading(false);
    //@ts-ignore
    toast.success("Added successfully");
  };

  const handleSelectSavedSize = (item: any) => {
    reset();
    setSaveSizeProfile(false);
    setSelectedSize("saved");
    setSelectedChestOption(item?.chest_point?.toString());
    setSelectedCupOption(item.cup);
    setShoulder((prevShoulder) => item.shoulder);
    setNeck((prevNeck) => item.neck);
    setHeight(item.height);
    setWrist(item.wrist);
    setSleevesLength(item.sleeves_length);
    setArmWidth(item.arm_width);
    setHips(item.hips);
    setValue("height", item.height);
    setValue("shoulder", item.shoulder);
    setValue("neck", item.neck);
    setValue("wrist", item.wrist);
    setValue("sleeves_length", item.sleeves_length);
    setValue("arm_width", item.arm_width);
    setValue("hips", item.hips);
    setValue("bust", item.bust);
    setSelectedSizeProfile(item.id);
  };

  const handleCustomization = () => {
    // if (!ctx.isAuthenticated) {
    //   return router.push("/login");
    // }
    router.push({
      pathname: "/custom-mekhwar",
      query: {
        designId: props.id,
      },
    });
  };

  return (
    <div className="flex flex-col justify-start items-start w-[100%]">
      <div className="w-full">
        <div className={`options grid grid-cols-2 gap-5 ${props?.customizable && "hidden"}`}>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className={`${
                  selectedSize === "saved"
                    ? "border-secondary text-secondary"
                    : "border-white/20 text-white/50"
                } grid-col rounded-[8px] min-w-0 min-h-0 p-0 text-[14px] xs:px-4 xs:py-5 sm:px-6 sm:py-5`}
                variant="bordered"
              >
                {t("saved_size")}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              {sizeProfiles?.map((item, index) => {
                return (
                  <DropdownItem onClick={() => handleSelectSavedSize(item)} key={index}>
                    {item.title}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>

          <Button onClick={handleNewSize} className="bg-primary-700">
            {t("new_size")}
          </Button>
        </div>
      </div>
      <div
        className={`grid available xs:grid-cols-2 sm:grid-cols-3 auto-rows-fr w-full gap-4 mt-5 ${
          props?.customizable && "hidden"
        }`}
      >
        <DropdownComponent
          fullHeight={true}
          classNames={{ trigger: "h-full" }}
          describe="Chest Point"
          selectedValue={selectedChestOption}
          onSelectionChange={handleChestChange}
          items={[
            { key: "18", label: "18" },
            { key: "20", label: "20" },
            { key: "22", label: "22" },
            { key: "24", label: "24" },
            { key: "26", label: "26" },
          ]}
        />
        <DropdownComponent
          fullHeight={true}
          classNames={{ trigger: "h-full" }}
          describe="Cup"
          selectedValue={selectedCupOption}
          onSelectionChange={handleCupChange}
          items={[
            { key: "A", label: "A" },
            { key: "AA", label: "AA" },
            { key: "B", label: "B" },
            { key: "C", label: "C" },
            { key: "D", label: "D" },
            { key: "DD", label: "DD" },
            { key: "DDD", label: "DDD" },
            { key: "G", label: "G" },
            { key: "H", label: "H" },
          ]}
        />
        <ThemeInput
          custom={true}
          errorMessage={errors.shoulder?.message}
          extras={{ ...register("shoulder") }}
          label={t("shoulder")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
          type="text"
          value2={shoulder}
        />
        <ThemeInput
          custom={true}
          errorMessage={errors.bust?.message}
          extras={{ ...register("bust") }}
          label={t("bust")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
          type="text"
          value2={bust}
        />
        <ThemeInput
          custom={true}
          errorMessage={errors.arm_width?.message}
          extras={{ ...register("arm_width") }}
          label={t("arm_width")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
          type="text"
          value2={armWidth}
        />
        <ThemeInput
          custom={true}
          errorMessage={errors.wrist?.message}
          extras={{ ...register("wrist") }}
          label={t("wrist")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
          type="text"
          value2={wrist}
        />
        <ThemeInput
          custom={true}
          errorMessage={errors.height?.message}
          extras={{ ...register("height") }}
          label={t("height")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
          type="text"
          value2={height}
        />
        <ThemeInput
          custom={true}
          errorMessage={errors.sleeves_length?.message}
          extras={{ ...register("sleeves_length") }}
          label={t("sleeves_length")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
          type="text"
          value2={sleevesLength}
        />
        <ThemeInput
          custom={true}
          errorMessage={errors.neck?.message}
          extras={{ ...register("neck") }}
          label={t("neck")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
          type="text"
          value2={neck}
        />
        <ThemeInput
          custom={true}
          errorMessage={errors.hips?.message}
          extras={{ ...register("hips") }}
          label={t("hips")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
          type="text"
          value2={hips}
        />
      </div>

      <div className={`hidden my-[10px]`}></div>

      <textarea
        placeholder={t("additional_tailoring_requests")}
        className={`mt-3 p-2 border border-gray-300 bg-primary-800 rounded-md w-full resize-none overflow-y-auto ${
          props?.customizable && "hidden"
        }`}
        style={{ minHeight: "80px" }}
        value={customerInstructions}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setcustomerInstructions(e.target.value)
        }
      />

      <div className={`w-full flex flex-row justify-between items-center ${props.customizable ? "" : "my-[8px]"}`}>
        <Checkbox
          {...register("saveSizeProfile", {
            onChange: (e) => {
              if (e.target.checked) {
                setValue("saveSizeProfile", true);
                return;
              }
              setValue("saveSizeProfile", false);
            },
          })}
          color="secondary"
          className={`text-[18px] mt-0 ${props?.customizable && "hidden"}`}
        >
          {t("save_size_profile")}
        </Checkbox>

        <span className="flex items-end">
          <Link
            href="/size-guide"
            prefetch={true}
            className={`flex flex-row font-normal text-white text-md tracking-tight leading-tight underline whitespace-nowrap ${props?.customizable ? "mt-0" : "mt-4"}`}
          >
            <IconInfoCircle color="#ffb84d" size={25} />
            {t("need_help_taking_sizes")}
          </Link>
        </span>
      </div>

      <div className="my-[6px]"></div>

      <Button
        onClick={handleAddToCart}
        isLoading={isLoading}
        className={`bg-primary-700 text-white text-[16px] font-bold min-w-full min-h-0 py-6 rounded-[6px] ${
          props?.customizable && "hidden"
        }`}
        startContent={<IconShoppingBag size={18} />}
      >
        {t("add_to_cart")}
      </Button>

      <div className="xs:hidden my-[20px] h-full"></div>

      <Button
        onClick={handleCustomization}
        isLoading={isLoading}
        className={`bg-primary-700 text-secondary text-[16px] font-bold min-w-full min-h-0 py-6 rounded-[6px] ${
          !props?.customizable && "hidden"
        }`}
        startContent={<IconNeedleThread size={18} />}
      >
        {t("start_customization")}
      </Button>

      <ToastContainer />
    </div>
  );
};
