import { useTranslations } from "next-intl";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import DropdownComponent from "../Drop";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { ThemeInput } from "@/components/input/theme-input";
import { Link } from "@/utils";
import { IconInfoCircle } from "@tabler/icons-react";
import { getUserProfiles } from "@/utils/cart";
import { yupResolver } from "@hookform/resolvers/yup";
import SizeGuideModal from "../SizeGuideModal";

let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

const customSizeSchema = Yup.object({
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
    .min(5),
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
    .max(44)
    .min(34),
  arm_width: Yup.number()
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
    .max(20.5)
    .min(10),
  wrist: Yup.number()
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
    .max(9.25)
    .min(6.8),
  height: Yup.number()
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
    .min(50),
  neck: Yup.number()
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
    .max(9)
    .min(5.5),
});

const StepThreeComponent = (props: any, ref: any) => {
  const [selectedSize, setSelectedSize] = useState("CUSTOM");
  const [selectedSizeProfileId, setSelectedSizeProfileId] = useState<any>(null);
  const [sizeProfiles, setSizeProfiles] = useState<any[]>([]);

  const t = useTranslations("shop");

  const [saveSizeProfile, setSaveSizeProfile] = useState(false);
  const [customerInstructions, setcustomerInstructions] = useState("");
  const [selectedChestOption, setSelectedChestOption] = useState(t("chest_point"));
  const [selectedCupOption, setSelectedCupOption] = useState(t("cup_size"));
  const [shoulder, setShoulder] = useState<number>();
  const [neck, setNeck] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [wrist, setWrist] = useState<number>();
  const [sleevesLength, setSleevesLength] = useState<number>();
  const [armWidth, setArmWidth] = useState<number>();
  const [hips, setHips] = useState<number>();
  const [bust, setBust] = useState<number>();
  const [sizeGuideModalOpen, setSizeGuideModalOpen] = useState(false);

  const handleChestChange = (value: string) => {
    setSelectedChestOption(value);
  };
  const handleCupChange = (value: string) => {
    setSelectedCupOption(value);
  };
  const handleSelectSavedSize = (item: any) => {
    reset();
    setSaveSizeProfile(false);
    setSelectedSizeProfileId(item.id);
    setSelectedSize("SAVED");
    setSelectedChestOption(item.chest_point.toString());
    setSelectedCupOption(item.cup);
    setHeight(item.height);
    setWrist(item.wrist);
    setSleevesLength(item.sleeves_length);
    setBust(item.bust);
    setArmWidth(item.arm_width);
    setHips(item.hips);
    setShoulder(item.shoulder);
    setNeck(item.neck);
  };

  const loadData = () => {
    const sizeProfiles = getUserProfiles();
    setSizeProfiles(sizeProfiles);

    if (props?.sizes) {
      const { sizes } = props;
      // setSelectedSize(sizes.size);
      setSelectedSizeProfileId(sizes.size_profile_id);
      setSelectedChestOption(sizes.chest_point);
      setSelectedCupOption(sizes.cup);
      setHeight(sizes.height);
      setBust(sizes.bust);
      setWrist(sizes.wrist);
      setSleevesLength(sizes.sleeves_length);
      setArmWidth(sizes.arm_width);
      setHips(sizes.hips);
      setShoulder(sizes.shoulder);
      setNeck(sizes.neck);
      setcustomerInstructions(sizes.customerInstructions);
    }
  };

  const {
    register,
    formState: { errors, isValidating },
    trigger,
    getValues,
    setValue,
    reset,
  } = useForm({
    mode: "onTouched",
    //@ts-ignore
    resolver: yupResolver(customSizeSchema),
  });

  const handleNewSize = () => {
    setSelectedSize("CUSTOM");
    setSelectedSizeProfileId(null);
    setWrist(undefined);
    setShoulder(undefined);
    setNeck(undefined);
    setHeight(undefined);
    setWrist(undefined);
    setSleevesLength(undefined);
    setArmWidth(undefined);
    setHips(undefined);
    reset();
  };

  const handleOnNext = async (d: any) => {
    if (shoulder && neck && height && wrist && sleevesLength && armWidth && hips && bust) {
      setValue("shoulder", shoulder);
      setValue("neck", neck);
      setValue("height", height);
      setValue("wrist", wrist);
      setValue("sleeves_length", sleevesLength);
      setValue("arm_width", armWidth);
      setValue("hips", hips);
      setValue("bust", bust);
    } else {
    }
    const vals = await trigger();

    if (!vals) {
      return;
    }

    if (selectedChestOption === t("chest_point") || !selectedChestOption) {
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
      return false;
    }
    if (selectedCupOption === t("cup_size") || !selectedCupOption) {
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
      return false;
    }

    // if (!selectedSize) {
    //   toast.error("Please select a size", {
    //     position: "bottom-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   return false;
    // }

    if (selectedSize === "CUSTOM" && Object?.keys(errors)?.length > 0) {
      return false;
    }

    if (
      errors?.arm_width ||
      errors?.height ||
      errors?.hips ||
      errors?.neck ||
      errors?.shoulder ||
      errors?.sleeves_length ||
      errors?.wrist ||
      errors?.bust
    ) {
      return false;
    }

    return {
      customerInstructions: customerInstructions,
      size: selectedSize,
      size_profile_id: selectedSizeProfileId,
      cup: selectedCupOption,
      chest_point: selectedChestOption,
      saveSizeProfile,
      ...getValues(),
    };
  };

  useImperativeHandle(ref, () => ({
    isValid: handleOnNext,
  }));

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="w-full flex flex-col items-start justify-start px-5">
      <div className="w-full">
        <div className="options mt-5 grid grid-cols-2 gap-5">
          <Dropdown aria-label="label">
            <DropdownTrigger aria-label="label">
              <Button
                className={`${
                  selectedSize === "SAVED"
                    ? "border-secondary text-secondary"
                    : "border-white/20 text-white/50"
                } grid-col rounded-[8px] min-w-0 min-h-0 p-0 text-[14px] xs:px-4 xs:py-5 sm:px-6 sm:py-5`}
                variant="bordered"
                aria-label="label"
              >
                {t("saved_size")}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              {sizeProfiles?.map((item, index) => {
                return (
                  <DropdownItem
                    onClick={() => handleSelectSavedSize(item)}
                    key={index}
                    aria-labelledby="label"
                  >
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

      <div className="my-[12px]"></div>

      <form className={"grid available xs:grid-cols-2 sm:grid-cols-3 w-full gap-4"}>
        <DropdownComponent
          describe={t("chest_point")}
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
          describe={t("cup_size")}
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
          value2={shoulder}
          value={shoulder}
          errorMessage={errors.shoulder?.message}
          disabled={selectedSize === "SAVED" ? true : false}
          type="text"
          extras={{ ...register("shoulder") }}
          label={t("shoulder")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">in</p>}
        />
        <ThemeInput
          custom={true}
          value2={bust}
          value={bust}
          errorMessage={errors.bust?.message}
          disabled={selectedSize === "SAVED" ? true : false}
          type="text"
          extras={{ ...register("bust") }}
          label={t("bust")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">in</p>}
        />
        <ThemeInput
          custom={true}
          value2={neck}
          disabled={selectedSize === "SAVED" ? true : false}
          type="text"
          errorMessage={errors.neck?.message}
          extras={{ ...register("neck") }}
          label={t("neck")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">in</p>}
        />
        <ThemeInput
          custom={true}
          value2={height}
          disabled={selectedSize === "SAVED" ? true : false}
          errorMessage={errors.height?.message}
          type="text"
          extras={{ ...register("height") }}
          label={t("height")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">in</p>}
        />
        <ThemeInput
          custom={true}
          value2={wrist}
          disabled={selectedSize === "SAVED" ? true : false}
          errorMessage={errors.wrist?.message}
          type="text"
          extras={{ ...register("wrist") }}
          label={t("wrist")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">in</p>}
        />
        <ThemeInput
          custom={true}
          value2={sleevesLength}
          disabled={selectedSize === "SAVED" ? true : false}
          errorMessage={errors.sleeves_length?.message}
          type="text"
          extras={{ ...register("sleeves_length") }}
          label={t("sleeves_length")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">in</p>}
        />
        <ThemeInput
          custom={true}
          value2={armWidth}
          disabled={selectedSize === "SAVED" ? true : false}
          errorMessage={errors.arm_width?.message}
          type="text"
          extras={{ ...register("arm_width") }}
          label={t("arm_width")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">in</p>}
        />
        <ThemeInput
          custom={true}
          value2={hips}
          disabled={selectedSize === "SAVED" ? true : false}
          errorMessage={errors.hips?.message}
          type="text"
          extras={{ ...register("hips") }}
          label={t("hips")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">in</p>}
        />
      </form>
      <textarea
        placeholder={t("additional_tailoring_requests")}
        className="mt-3 p-2 border border-gray-300 bg-primary-800 rounded-md w-full resize-none overflow-y-auto"
        style={{ minHeight: "80px" }}
        value={customerInstructions}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setcustomerInstructions(e.target.value)
        }
      />
      <div className="w-full flex flex-row items-center justify-between mt-[15px] xs:flex-col xs:items-start">
        <Checkbox
          className={`${selectedSize === "CUSTOM" ? "black" : "hidden"}`}
          color="secondary"
          onChange={(e) => setSaveSizeProfile(e.target.checked)}
          isSelected={saveSizeProfile}
        >
          <span className="mx-2">{t("save_size")}</span>
        </Checkbox>

        <span className="flex items-end xs:mt-3">
          <Link
            href="/size-guide"
            onClick={(e) => {
              e.preventDefault();
              setSizeGuideModalOpen(true);
            }}
            prefetch={true}
            className="flex flex-row items-center font-normal text-white text-md tracking-tight leading-tight underline whitespace-nowrap"
          >
            <IconInfoCircle color="#ffb84d" size={25} />
            {t("need_help_taking_sizes")}
          </Link>
        </span>
      </div>
      <div className="my-[10px]"></div>
      <Modal
        isOpen={sizeGuideModalOpen}
        onClose={() => {
          setSizeGuideModalOpen(false);
        }}
        size="full"
      >
        <ModalContent>
          <SizeGuideModal onClose={() => setSizeGuideModalOpen(false)} />
        </ModalContent>
      </Modal>
    </div>
  );
};

const StepThree = forwardRef(StepThreeComponent);

export default StepThree;
