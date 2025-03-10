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
import { extractError, updateCustomerAddress } from "@/provider";
import { getToken } from "@/utils";
import { toast } from "react-toastify";
import { storeAddresses } from "@/utils/cart";
import { useTranslations } from "next-intl";

export interface UpdateAddressDialogProps {
  handleCompleted: (data: any) => void;
  handleClose: () => void;
  isOpen: boolean;
  address: AddressI;
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

export default function UpdateAddressDialog(props: UpdateAddressDialogProps) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations("profile");
  //type name country city street building address flat mobile
  const updateAddress = async (formData: any) => {
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
      id: props.address.id,
    };

    const { data, error } = await updateCustomerAddress(getToken(), body);

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
      storeAddresses(data);
      props.handleCompleted(data);
    }
  };

  const schema = Yup.object({
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
      const ph = phone(props.address.mobile);
      setSelectedCountry(ph?.countryIso2 || "AE");
      reset({
        name: props.address.name,
        country: props.address.country,
        city: props.address.city,
        street: props.address.street,
        building: props.address.building,
        flat: props.address.flat,
        address: props.address.address,
        mobile: props.address.mobile.replace(ph.countryCode + "", ""),
        type: props.address.type,
        countryCode: ph?.countryIso2!,
      });
    } else {
      reset();
    }

    return () => reset();
  }, [props.isOpen]);

  const getPhone = (e: any) => {
    if (!e) return "";
    const ph = phone(e);
    return e?.replace(ph.countryCode + "", "");
  };

  const getCountryCode = (e: any) => {
    if (!e) return "";
    const ph = phone(e);
    return ph.countryIso2;
  };
  return (
    <Modal isOpen={props.isOpen} onClose={props.handleClose}>
      <ModalContent>
        <CardContainer scissors={false}>
          <ModalHeader>{t("update_address")}</ModalHeader>
          <ModalBody>
            <form>
              <ThemeInput
                label={t("name")}
                extras={register("name")}
                value={props?.address?.name}
                errorMessage={errors.name?.message}
              />
              <div className="my-2"></div>
              <ThemeInput
                label={t("country")}
                extras={register("country")}
                value={props?.address?.country}
                errorMessage={errors.country?.message}
              />
              <div className="my-2"></div>
              <ThemeInput
                label={t("city")}
                extras={register("city")}
                value={props?.address?.city}
                errorMessage={errors.city?.message}
              />
              <div className="my-2"></div>
              <ThemeInput
                label={t('street')}
                extras={register("street")}
                value={props?.address?.street}
                errorMessage={errors.street?.message}
              />
              <div className="my-2"></div>
              <ThemeInput
                label={t("building")}
                extras={register("building")}
                value={props?.address?.building}
                errorMessage={errors.building?.message}
              />
              <div className="my-2"></div>
              <ThemeInput
                label={t("flat")}
                extras={register("flat")}
                value={props?.address?.flat}
                errorMessage={errors.flat?.message}
              />
              <div className="my-2"></div>
              <ThemeInput
                label={t("address_line")}
                extras={register("address")}
                value={props?.address?.address}
                errorMessage={errors.flat?.message}
              />
              <div className="my-2"></div>
              <MobileInput
                label={t("mobile")}
                extras={register("mobile")}
                value={getPhone(props?.address?.mobile) || ""}
                errorMessage={errors.mobile?.message}
                countryCodeErrorMessage={errors.countryCode?.message}
                countryCodeExtras={register("countryCode")}
                onCountryChange={setSelectedCountry}
                countryCodeValue={getCountryCode(props?.address?.mobile) || ""}
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
                value={props?.address?.type}
              />
            </form>
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
