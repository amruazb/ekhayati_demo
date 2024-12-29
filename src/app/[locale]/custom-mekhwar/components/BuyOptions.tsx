"use client";
import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";
import { HexColorPicker } from "react-colorful";
import { ThemeInput } from "@/components/input/theme-input";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IconChevronRight } from "@tabler/icons-react";
import { toast } from "react-toastify";
import DropdownComponent from "./Drop";
import { getUserProfiles } from "@/utils/cart";
import { Link } from "@/utils";
import { useTranslations } from "next-intl";

const colors = [
  { label: "White", value: "#E8E8E8" },
  { label: "Black", value: "#000000" },
  { label: "Green", value: "#CCDE69" },
  { label: "Red", value: "#FF4B4B" },
  { label: "Yellow", value: "#E1B000" },
];

//array for Short sleeve V Neck Long Sleeves Winter Cut No Sleeves Embodied
const tailoringStyles = [
  { label: "Short Sleeve", value: "Short Sleeve" },
  { label: "V Neck", value: "V Neck" },
  { label: "Long Sleeves", value: "Long Sleeves" },
  { label: "Winter Cut", value: "Winter Cut" },
  { label: "No Sleeves", value: "No Sleeves" },
  { label: "Embodied", value: "Embodied" },
];

const sizes = [
  /*  { value: "S", label: "Small" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Large" },*/
  { value: "CUSTOM", label: "Custom" },
];

export interface BuyOptionsProps {
  onNext: (data: any) => void;
  handleResize: (f: any) => void;
}

export default function BuyOptions(props: BuyOptionsProps) {
  const [selectedColor, setSelectedColor] = useState<null | string>(null);
  const [color1, setColor1] = useState("#ffb84d");
  const [selectedStyles, setSelectedStyles] = useState(["Embodied"]);
  const [selectedSize, setSelectedSize] = useState("CUSTOM");
  const [sizeProfiles, setSizeProfiles] = useState<any[]>([]);
  const [selectedSizeProfile, setSelectedSizeProfile] = useState<any>(null);

  const t = useTranslations("shop");

  const [saveSizeProfile, setSaveSizeProfile] = useState(false);
  const [customerInstructions, setcustomerInstructions] = useState("");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [selectedWristOption, setSelectedWristOption] = useState(t("wrist_style"));
  const [selectedNeckOption, setSelectedNeckOption] = useState(t("neck_style"));
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

  const colorPickerRef = useRef<HTMLDivElement>(null);

  const handleWristChange = (value: string) => {
    setSelectedWristOption(value);
  };
  const handleNeckChange = (value: string) => {
    setSelectedNeckOption(value);
  };
  const handleChestChange = (value: string) => {
    setSelectedChestOption(value);
  };
  const handleCupChange = (value: string) => {
    setSelectedCupOption(value);
  };
  const handleSelectSavedSize = (item: any) => {
    reset();
    setSaveSizeProfile(false);
    setSelectedSize("saved");
    setSelectedChestOption(item.chest_point.toString());
    setSelectedCupOption(item.cup);
    setShoulder((prevShoulder) => item.shoulder);
    setNeck((prevNeck) => item.neck);
    setHeight(item.height);
    setWrist(item.wrist);
    setSleevesLength(item.sleeves_length);
    setArmWidth(item.arm_width);
    setHips(item.hips);
    setBust(item.bust);
  };
  const handleColorChange = (newColor: string) => {
    setColor1(newColor);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
    };

    const handleMouseDown = () => {
      document.addEventListener("mousedown", handleClickOutside);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    // Attach event listeners when the color picker is shown
    if (showColorPicker) {
      handleMouseDown();
    } else {
      handleMouseUp();
    }

    // Clean up the event listener when the component unmounts
    return () => {
      handleMouseUp();
    };
  }, [showColorPicker]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const sizeProfiles = getUserProfiles();
    setSizeProfiles(sizeProfiles);
  };

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
      .max(300)
      .min(1),
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
      .max(300)
      .min(1),
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
      .max(300)
      .min(1),
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
      .max(300)
      .min(1),
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
      .max(300)
      .min(1),
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
      .max(300)
      .min(1),
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
      .max(300)
      .min(1),
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
      .max(300)
      .min(1),
  });

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
    setWrist(undefined);
    setShoulder(undefined);
    setNeck(undefined);
    setHeight(undefined);
    setWrist(undefined);
    setSleevesLength(undefined);
    setArmWidth(undefined);
    setHips(undefined);
    setBust(undefined);
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
      await trigger();
    }

    if (selectedWristOption === t("wrist_style")) {
      toast.error("Please select a Wrist Style", {
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
    if (selectedNeckOption === t("neck_style")) {
      toast.error("Please select a Neck Style", {
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
    if (selectedChestOption === t("chest_point")) {
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

    if (selectedCupOption === t("cup_size")) {
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

    if (!selectedSize) {
      toast.error("Please select a size", {
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

    if (selectedSize === "CUSTOM" && Object?.keys(errors)?.length > 0) {
      return;
    }

    props.onNext({
      color: selectedColor,
      wrist_style: selectedWristOption,
      neck_style: selectedNeckOption,
      customerInstructions: customerInstructions,
      styles: selectedStyles,
      size: "CUSTOM",
      cup: selectedCupOption,
      chest_point: selectedChestOption,
      saveSizeProfile: saveSizeProfile,
      ...getValues(),
    });
  };

  useEffect(() => {
    props.handleResize(null);
  }, [selectedSize]);

  useEffect(() => {
    props.handleResize(null);
  }, [isValidating]);

  return (
    <div className="w-full flex flex-col items-start justify-start px-5">
      <div className="color-picker flex flex-row items-start justify-start">
        <div className="flex items-center">
          <div
            className={`relative w-[30px] h-[30px] rounded-md mr-2 cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click event from reaching the document
              setShowColorPicker(true);
            }}
          >
            {showColorPicker && (
              <div className="absolute mt-8 top-0 left-0 z-20" ref={colorPickerRef}>
                <HexColorPicker color={color1} onChange={handleColorChange} />
              </div>
            )}
            {/* Display the selected color in the div */}
            <div
              style={{
                backgroundColor: color1,
                width: "30px",
                height: "30px",
                borderRadius: "20%",
              }}
            />
          </div>
          {/* Label beside the color picker */}
          <div className="mx-2">
            <span>{t("pick_your_color")}</span>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="style-picker mt-5 grid grid-cols-2 gap-5">
          <DropdownComponent
            describe={t("wrist_style")}
            selectedValue={selectedWristOption}
            onSelectionChange={handleWristChange}
            items={[
              { key: "Round open", label: t("round_open") },
              { key: "Triangular open", label: t("triangular_open") },
              { key: "Wide open", label: t("wide_open") },
              { key: "Unique Batwings style", label: t("unique_batwing_style") },
            ]}
          />
          <DropdownComponent
            describe={t("neck_style")}
            selectedValue={selectedNeckOption}
            onSelectionChange={handleNeckChange}
            items={[
              { key: "High neck", label: t("high_neck") },
              { key: "Square neck", label: t("square_neck") },
              { key: "Round neck", label: t("round_neck") },
              { key: "Triangle neck", label: t("triangle_neck") },
              { key: "Oval neck", label: t("oval_neck") },
            ]}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="options mt-5 grid grid-cols-2 gap-5">
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

      {/* <div className="my-[8px]"></div> */}

      {/* <div className="w-full flex items-start justify-start">
        <div className="options grid grid-cols-4 gap-2">
          {sizes?.map((item, index) => {
            return (
              <Button
                key={index}
                onClick={() => setSelectedSize(item?.value || null)}
                variant="bordered"
                className={`${
                  item.value === selectedSize
                    ? "border-secondary text-secondary"
                    : "border-white/20 text-white/50"
                } rounded-[8px] min-w-0 min-h-0 p-0 text-[14px] xs:px-4 xs:py-5 sm:px-6 sm:py-4`}
              >
                {item.label}
              </Button>
            );
          })}
        </div>
      </div> */}

      <div className="my-[12px]"></div>

      <form className={"grid available xs:grid-cols-3 sm:grid-cols-3 w-full gap-4"}>
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
        <div className="flex flex-row xs:flex-col small:flex-col medium:flex-col gap-2">
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
        </div>
        <ThemeInput
          custom={true}
          value2={shoulder}
          errorMessage={errors.shoulder?.message}
          disabled={selectedSize === "saved" ? true : false}
          type="text"
          maxLength={3}
          allowOnlyNumbers={true}
          extras={{ ...register("shoulder") }}
          label={t("shoulder")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
        />
        <ThemeInput
          custom={true}
          value2={bust}
          errorMessage={errors.bust?.message}
          disabled={selectedSize === "saved" ? true : false}
          type="text"
          maxLength={3}
          allowOnlyNumbers={true}
          extras={{ ...register("bust") }}
          label={t("bust")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
        />
        <ThemeInput
          custom={true}
          value2={neck}
          disabled={selectedSize === "saved" ? true : false}
          type="text"
          maxLength={3}
          allowOnlyNumbers={true}
          errorMessage={errors.neck?.message}
          extras={{ ...register("neck") }}
          label={t("neck")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
        />
        <ThemeInput
          custom={true}
          value2={height}
          disabled={selectedSize === "saved" ? true : false}
          errorMessage={errors.height?.message}
          type="text"
          maxLength={3}
          allowOnlyNumbers={true}
          extras={{ ...register("height") }}
          label={t("height")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
        />
        <ThemeInput
          custom={true}
          value2={wrist}
          disabled={selectedSize === "saved" ? true : false}
          errorMessage={errors.wrist?.message}
          type="text"
          maxLength={3}
          allowOnlyNumbers={true}
          extras={{ ...register("wrist") }}
          label={t("wrist")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
        />
        <ThemeInput
          custom={true}
          value2={sleevesLength}
          disabled={selectedSize === "saved" ? true : false}
          errorMessage={errors.sleeves_length?.message}
          type="text"
          maxLength={3}
          allowOnlyNumbers={true}
          extras={{ ...register("sleeves_length") }}
          label={t("sleeves_length")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
        />
        <ThemeInput
          custom={true}
          value2={armWidth}
          disabled={selectedSize === "saved" ? true : false}
          errorMessage={errors.arm_width?.message}
          type="text"
          maxLength={3}
          allowOnlyNumbers={true}
          extras={{ ...register("arm_width") }}
          label={t("arm_width")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
        />
        <ThemeInput
          custom={true}
          value2={hips}
          disabled={selectedSize === "saved" ? true : false}
          errorMessage={errors.hips?.message}
          type="text"
          maxLength={3}
          allowOnlyNumbers={true}
          extras={{ ...register("hips") }}
          label={t("hips")}
          classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
          endItem={<p className="text-white font-[14px]">{t("in")}</p>}
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
      <div className="w-full flex flex-row items-center justify-between mt-[15px]">
        <Checkbox
          className={`${selectedSize === "CUSTOM" ? "black" : "hidden"}`}
          color="secondary"
          onChange={(e) => setSaveSizeProfile(e.target.checked)}
          isSelected={saveSizeProfile}
        >
          <span className="mx-2">{t("save_size")}</span>
        </Checkbox>

        <span className="flex items-end">
          <Link
            href="/size-guide"
            prefetch={true}
            className="flex flex-row items-center font-normal text-white text-md tracking-tight leading-tight underline whitespace-nowrap"
          >
            <IconInfoCircle color="#ffb84d" size={25} />
            {t("need_help_taking_sizes")}
          </Link>
        </span>
      </div>
      <div className="my-[10px]"></div>

      <Button
        onClick={handleOnNext}
        className="bg-primary-700 text-white text-[16px] font-bold min-w-full min-h-0 py-6 rounded-[6px]"
        startContent={<IconChevronRight size={18} />}
      >
        {t("next")}
      </Button>
    </div>
  );
}
