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
import ThemeSelect from "@/components/input/theme-select";
import { MobileInput } from "@/components/input/mobile-input";
import phone from "phone";
import * as countryList from "countries-list";
import { createCustomerAddress, extractError } from "@/provider";
import { getToken } from "@/utils";
import { toast } from "react-toastify";
import { storeAddresses } from "@/utils/cart";
import { useTranslations } from "next-intl";

export interface CreateAddressDialogProps {
  handleCompleted: (data: any) => void;
  handleClose: () => void;
  isOpen: boolean;
}

interface AddressI {
  name: string;
  country: string;
  city: string;
  street: string;
  building: string;
  address: string;
  flat: string;
  mobile: string;
  type: string;
  id?: string | number;
}

export default function CreateAddressDialog(props: CreateAddressDialogProps) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations("profile");

  const createAddress = async (formData: any) => {
    //@ts-ignore
    const country = countryList.getCountryData(selectedCountry || "AE");
    formData.mobile = "+" + country?.phone?.[0] + formData.mobile;
    setIsLoading(true);
    const body: AddressI = {
      name: formData.name,
      country: formData.country,
      city: formData.city,
      street: formData.street,
      building: formData.building,
      flat: formData.flat,
      mobile: formData.mobile,
      type: formData.type,
      address: formData.address,
    };

    const { data, error } = await createCustomerAddress(getToken(), body);

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
      //@ts-ignore
      storeAddresses(data);
      toast.success("Address created successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
      Yup.object({
        name: Yup.string().required("Name is required"),
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required"),
        street: Yup.string().required("Street is required"),
        building: Yup.string().required("Building is required"),
        flat: Yup.string().required("Flat is required"),
        address: Yup.string().required("Address line is required"),
        mobile: Yup.string()
          .required("Mobile is required")
          .test("mobile", "Invalid mobile", (value) => {
            return phone(value, {
              country: selectedCountry,
              strictDetection: true,
            })?.isValid;
          }),
        type: Yup.string().required("Type is required"),
        countryCode: Yup.string().required("Country code is required"),
      })
    ),
  });

  return (
    <Modal isOpen={props.isOpen} onClose={props.handleClose}>
      <ModalContent>
        <CardContainer scissors={false}>
          <ModalHeader>{t("create_new_address")}</ModalHeader>
          <ModalBody>
            <form>
              <ThemeInput
                label={t("name")}
                extras={register("name")}
                errorMessage={errors.name?.message}
              />
              <div className="my-2"></div>
              <ThemeInput
                label={t("country")}
                extras={register("country")}
                errorMessage={errors.country?.message}
              />
              <div className="my-2"></div>
              <ThemeInput
                label={t("city")}
                extras={register("city")}
                errorMessage={errors.city?.message}
              />
              <div className="my-2"></div>
              <ThemeInput
                label={t("street")}
                extras={register("street")}
                errorMessage={errors.street?.message}
              />
              <div className="my-2"></div>
              <ThemeInput
                label={t("building")}
                extras={register("building")}
                errorMessage={errors.building?.message}
              />
              <div className="my-2"></div>
              <ThemeInput
                label={t("flat")}
                extras={register("flat")}
                errorMessage={errors.flat?.message}
              />
              <div className="my-2"></div>
              <ThemeInput
                label={t("address_line")}
                extras={register("address")}
                errorMessage={errors.flat?.message}
              />
              <div className="my-2"></div>
              <MobileInput
                label={t("mobile")}
                countryCodeLabel={t("country_code")}
                extras={register("mobile")}
                errorMessage={errors.mobile?.message}
                countryCodeErrorMessage={errors.countryCode?.message}
                countryCodeExtras={register("countryCode")}
                onCountryChange={setSelectedCountry}
                smaller={true}
              />
              <div className="my-2"></div>
              <ThemeSelect
                label={t("type")}
                extras={register("type")}
                items={[
                  { label: t("home"), value: "home" },
                  { label: t("office"), value: "office" },
                  { label: t("gym"), value: "gym" },
                  { label: t("work"), value: "work" },
                ]}
                errorMessage={errors.type?.message}
              />
            </form>
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
