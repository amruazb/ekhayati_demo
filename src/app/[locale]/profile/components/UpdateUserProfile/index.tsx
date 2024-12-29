"use client";
import CardContainer from "@/abstract/CardContainer";
import { ThemeInput } from "@/components/input/theme-input";
import { extractError, updateCustomerDetails } from "@/provider";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { IconSettings } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MobileInput } from "@/components/input/mobile-input";
import phone from "phone";
import * as countryList from "countries-list";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "@/provider/AuthContext";
import { useTranslations } from "next-intl";

export interface UpdateUserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  handleCompleted: (data: any) => void;
  userData: any;
}

export default function UpdateUserProfile(props: UpdateUserProfileProps) {
  const { isOpen, onClose, handleCompleted, userData } = props;

  const [selectedCountry, setSelectedCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ctx = useAuth();
  const t = useTranslations("profile");

  const handleLoadData = () => {
    const ph = phone(userData.phone);
    setSelectedCountry(ph?.countryIso2 || "AE");
  };

  useEffect(() => {
    handleLoadData();
  }, []);

  useEffect(() => {
    if (isOpen) {
      const ph = phone(userData?.phone);
      setSelectedCountry(ph?.countryIso2 || "AE");
      reset({
        name: userData?.name,
        email: userData?.email,
        phone: userData?.phone?.replace(ph?.countryCode + "", ""),
        countryCode: ph?.countryIso2!,
        password: "",
        confirmPassword: "",
      });
    } else {
      reset();
    }

    return () => reset();
  }, [isOpen]);

  const updateProfile = async (formData: any) => {
    //@ts-ignore
    const country = countryList.getCountryData(selectedCountry || "AE");
    formData.phone = "+" + country?.phone?.[0] + formData.phone;
    setIsLoading(true);

    const updateData: any = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    }

    if (formData.password) {
      updateData["password"] = formData.password;
    }

    const { data, error } = await updateCustomerDetails(ctx.token, ctx.user.id, updateData);

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
      toast.success("Profile updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleCompleted(data);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

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

  const schema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string()
      .required("Phone is required")
      .test("phone", "Invalid phone", (value) => {
        return phone(value, {
          country: selectedCountry,
          strictDetection: true,
        })?.isValid;
      }),
    countryCode: Yup.string().required("Country code is required"),
    password: Yup.string().notRequired()
      .min(6, "Password length should be at least 6 characters")
      .max(12, "Password cannot exceed more than 12 characters").nullable().transform((value) => !!value ? value : null),
    confirmPassword: Yup.string().notRequired()
      .min(6, "Password length should be at least 6 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match").nullable().transform((value) => !!value ? value : null),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        <CardContainer scissors={false}>
          <ModalHeader className="bg-primary-800 rounded-md p-3">
            <IconSettings className="text-secondary" />
            <h3 className="text-secondary ml-2">{t("account_data")}</h3>
          </ModalHeader>
          <ModalBody className="my-3 py-2 px-0">
            <ThemeInput
              label={t("name")}
              extras={register("name")}
              value={userData?.name}
              errorMessage={errors.name?.message}
            />
            <ThemeInput
              label={t("email")}
              extras={register("email")}
              value={userData?.email}
              errorMessage={errors.email?.message}
            />
            <MobileInput
              label={t("phone")}
              extras={register("phone")}
              value={getPhone(userData?.phone) || ""}
              errorMessage={errors.phone?.message}
              countryCodeErrorMessage={errors.countryCode?.message}
              countryCodeExtras={register("countryCode")}
              onCountryChange={setSelectedCountry}
              countryCodeValue={getCountryCode(userData?.phone) || ""}
              smaller={true}
            />

            {
              userData?.provider === "local" ?
              <>
              <ThemeInput
              label={t("password")}
              type="password"
              extras={register("password")}
              errorMessage={errors.password?.message}
              value={undefined}
            />
            <ThemeInput
              label={t("confirm_password")}
              type="password"
              extras={register("confirmPassword")}
              errorMessage={errors.confirmPassword?.message}
              value={undefined}
            />
            </> : <></>
            }
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleClose}>
              {t("cancel")}
            </Button>
            <Button 
                isLoading={isLoading}
                color="secondary" 
                onClick={handleSubmit(updateProfile)}>
              {t("update")}
            </Button>
          </ModalFooter>
        </CardContainer>
      </ModalContent>
    </Modal>
  );
}
