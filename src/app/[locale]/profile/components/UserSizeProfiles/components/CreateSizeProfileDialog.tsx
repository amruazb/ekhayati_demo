"use client";
import CardContainer from "@/abstract/CardContainer";
import { ThemeInput } from "@/components/input/theme-input";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSizeProfile, extractError } from "@/provider";
import { getToken } from "@/utils";
import { toast } from "react-toastify";
import DropdownComponent from "@/app/[locale]/custom-mekhwar/components/Drop";
import { useTranslations } from "next-intl";
import { setUserProfiles } from "@/utils/cart";

export interface CreateSizeProfileDialogProps {
  handleCompleted: (data: any) => void;
  handleClose: () => void;
  isOpen: boolean;
}

export default function CreateSizeProfileDialog(props: CreateSizeProfileDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChestOption, setSelectedChestOption] = useState("7.7");
  const [selectedCupOption, setSelectedCupOption] = useState("A");
  const t = useTranslations("shop");
  //type name country city street building address flat mobile
  const handleChestChange = (value: string) => {
    setSelectedChestOption(value);
  };
  const handleCupChange = (value: string) => {
    setSelectedCupOption(value);
  };
  const createAddress = async (formData: any) => {
    setIsLoading(true);
    formData.cup = selectedCupOption;
    formData.chest_point = selectedChestOption;
    const { data, error } = await createSizeProfile(getToken(), formData);

    setIsLoading(false);

    if (error) {
      toast.error(extractError(error), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.success("Size profile created successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setUserProfiles(data);
      props.handleCompleted(data);
    }
  };

  useEffect(() => {}, [props.isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        shoulder: Yup.number()
          .positive()
          .typeError("Number required")
          .required("Required")
          .max(300)
          .min(1),
        bust: Yup.number()
          .positive()
          .typeError("Number required")
          .required("Required")
          .max(300)
          .min(1),
        sleeves_length: Yup.number()
          .positive()
          .typeError("Number required")
          .required("Required")
          .max(300)
          .min(1),
        hips: Yup.number().typeError("Number required").required("Required").max(300).min(1),
        arm_width: Yup.number()
          .typeError("Number required")
          .required("Required")
          .max(300)
          .min(1),
        wrist: Yup.number().typeError("Number required").required("Required").max(300).min(1),
        height: Yup.number().typeError("Number required").required("Required").max(300).min(1),
        neck: Yup.number().typeError("Number required").required("Required").max(300).min(1),
      })
    ),
  });

  return (
    <Modal isOpen={props.isOpen} onClose={props.handleClose}>
      <ModalContent>
        <CardContainer scissors={false}>
          <ModalHeader>{t("create_new_size_profile")}</ModalHeader>
          <ModalBody>
            <div
              className={`grid available xs:grid-cols-2 sm:grid-cols-2 auto-rows-fr w-full gap-4 mt-5`}
            >
              <div className="col-span-2">
                <ThemeInput
                  type="text"
                  extras={{ ...register("title") }}
                  label={t("title")}
                  // placeholder={t("title")}
                  errorMessage={errors?.title?.message}
                />
              </div>
              <DropdownComponent
                fullHeight={true}
                classNames={{ trigger: "h-full" }}
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
                fullHeight={true}
                classNames={{ trigger: "h-full" }}
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
                errorMessage={errors.shoulder?.message}
                extras={{ ...register("shoulder") }}
                label={t("shoulder")}
                classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
                endItem={<p className="text-white font-[14px]">{t("in")}</p>}
                type="text"
                maxLength={3}
                allowOnlyNumbers={true}
              />
              <ThemeInput
                errorMessage={errors.bust?.message}
                extras={{ ...register("bust") }}
                label={t("bust")}
                classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
                endItem={<p className="text-white font-[14px]">{t("in")}</p>}
                type="text"
                maxLength={3}
                allowOnlyNumbers={true}
              />
              <ThemeInput
                errorMessage={errors.arm_width?.message}
                extras={{ ...register("arm_width") }}
                label={t("arm_width")}
                classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
                endItem={<p className="text-white font-[14px]">{t("in")}</p>}
                type="text"
                maxLength={3}
                allowOnlyNumbers={true}
              />
              <ThemeInput
                errorMessage={errors.wrist?.message}
                extras={{ ...register("wrist") }}
                label={t("wrist")}
                classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
                endItem={<p className="text-white font-[14px]">{t("in")}</p>}
                type="text"
                maxLength={3}
                allowOnlyNumbers={true}
              />
              <ThemeInput
                errorMessage={errors.height?.message}
                extras={{ ...register("height") }}
                label={t("height")}
                classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
                endItem={<p className="text-white font-[14px]">{t("in")}</p>}
                type="text"
                maxLength={3}
                allowOnlyNumbers={true}
              />
              <ThemeInput
                errorMessage={errors.sleeves_length?.message}
                extras={{ ...register("sleeves_length") }}
                label={t("sleeves_length")}
                classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
                endItem={<p className="text-white font-[14px]">{t("in")}</p>}
                type="text"
                maxLength={3}
                allowOnlyNumbers={true}
              />
              <ThemeInput
                errorMessage={errors.neck?.message}
                extras={{ ...register("neck") }}
                label={t("neck")}
                classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
                endItem={<p className="text-white font-[14px]">{t("in")}</p>}
                type="text"
                maxLength={3}
                allowOnlyNumbers={true}
              />
              <ThemeInput
                errorMessage={errors.hips?.message}
                extras={{ ...register("hips") }}
                label={t("hips")}
                classNames={{ inputWrapper: ["px-[16px] py-[12px] h-[60px]"] }}
                endItem={<p className="text-white font-[14px]">{t("in")}</p>}
                type="text"
                maxLength={3}
                allowOnlyNumbers={true}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={isLoading}
              radius="sm"
              className="bg-transparent hover:bg-white/10"
              onClick={props.handleClose}
            >
              {t("cancel")}
            </Button>
            <Button
              isLoading={isLoading}
              className="bg-secondary-800 text-primary-900 rounded-md"
              radius="sm"
              onClick={handleSubmit(createAddress)}
            >
              {t("create")}
            </Button>
          </ModalFooter>
        </CardContainer>
      </ModalContent>
    </Modal>
  );
}
