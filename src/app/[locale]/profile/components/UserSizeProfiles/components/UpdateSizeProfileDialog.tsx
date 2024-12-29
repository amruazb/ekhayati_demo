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
import { extractError, updateCustomerAddress, updateSizeProfile } from "@/provider";
import { getToken } from "@/utils";
import { toast } from "react-toastify";
import { setUserProfiles, storeAddresses } from "@/utils/cart";
import { useTranslations } from "next-intl";
import DropdownComponent from "@/app/[locale]/custom-mekhwar/components/Drop";

export interface UpdateSizeProfileDialogProps {
  handleCompleted: (data: any) => void;
  handleClose: () => void;
  isOpen: boolean;
  sizeProfile: any;
}

export default function UpdateSizeProfileDialog(props: UpdateSizeProfileDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChestOption, setSelectedChestOption] = useState("7.7");
  const [selectedCupOption, setSelectedCupOption] = useState("A");

  const t = useTranslations("shop");

  const handleChestChange = (value: string) => {
    setSelectedChestOption(value);
  };

  const handleCupChange = (value: string) => {
    setSelectedCupOption(value);
  };

  //type name country city street building address flat mobile
  const updateAddress = async (formData: any) => {
    setIsLoading(true);

    const body: any = {
      ...formData,
      cup: selectedCupOption,
      chest_point: selectedChestOption,
      id: props.sizeProfile.id,
    };

    const { data, error } = await updateSizeProfile(getToken(), body);

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
      toast.success("Address updated successfully", {
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

  const schema = Yup.object({
    title: Yup.string().required("Title is required"),
    shoulder: Yup.number().required("Shoulder is required"),
    wrist: Yup.number().required("Wrist is required"),
    sleeves_length: Yup.number().required("Sleeves length is required"),
    hips: Yup.number().required("Hips is required"),
    arm_width: Yup.number().required("Arm width is required"),
    height: Yup.number().required("Height is required"),
    neck: Yup.number().required("Neck is required"),
    bust: Yup.number().required("Bust is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (props.isOpen) {
      setSelectedCupOption(props.sizeProfile?.cup?.toString());
      setSelectedChestOption(props.sizeProfile?.chest_point?.toString());
      reset({
        title: props.sizeProfile?.title,
        shoulder: props.sizeProfile?.shoulder,
        sleeves_length: props.sizeProfile?.sleeves_length,
        hips: props.sizeProfile?.hips,
        arm_width: props.sizeProfile?.arm_width,
        wrist: props.sizeProfile?.wrist,
        height: props.sizeProfile?.height,
        neck: props.sizeProfile?.neck,
        bust: props?.sizeProfile?.bust,
      });
    } else {
      reset();
    }

    return () => reset();
  }, [props.isOpen]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.handleClose}>
      <ModalContent>
        <CardContainer scissors={false}>
          <ModalHeader>{t("update_size_profile")}</ModalHeader>
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
                  value={props?.sizeProfile?.title}
                />
              </div>
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
                value={props.sizeProfile?.shoulder}
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
                value={props.sizeProfile?.bust}
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
                value={props.sizeProfile?.arm_width}
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
                value={props.sizeProfile?.wrist}
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
                value={props.sizeProfile?.height}
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
                value={props.sizeProfile?.sleeves_length}
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
                value={props.sizeProfile?.neck}
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
                value={props.sizeProfile?.hips}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              radius="sm"
              className="bg-transparent hover:bg-white/10"
              onClick={props.handleClose}
              isDisabled={isLoading}
            >
              {t("cancel")}
            </Button>
            <Button
              color="secondary"
              radius="sm"
              onClick={handleSubmit(updateAddress)}
              isLoading={isLoading}
            >
              {t("update")}
            </Button>
          </ModalFooter>
        </CardContainer>
      </ModalContent>
    </Modal>
  );
}
