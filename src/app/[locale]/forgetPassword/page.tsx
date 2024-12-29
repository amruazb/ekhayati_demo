"use client";

import CardContainer from "@/abstract/CardContainer";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ThemeInput } from "@/components/input/theme-input";
import { Button } from "@nextui-org/react";
import BackButton from "../signup/components/BackButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { extractError, requestResetPassword } from "@/provider";
import { useRouter } from "@/utils";

const formSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email")
    .email("Email is not valid"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    //@ts-ignore
    resolver: yupResolver(formSchema),
  });

  const handleSendEmail = async (body: any) => {
    setIsLoading(true);

    try {
      const { data, error } = await requestResetPassword(body);
      if (data) {
        toast.success("Email sent successfully");
        router.push("/login");
      }

      if (error) {
        toast.error(extractError(error));
      }

      setIsLoading(false);
    } catch (err: any) {
      if (err?.message) {
        toast.error(err?.message);
      }
    }
  };

  return (
    <main className="min-h-[90vh] min-w-screen w-full flex flex-col items-center justify-center overflow-hidden m-0 p-0 xs:py-2">
      <div className="login-container xs:w-full px-5">
        <CardContainer scissors={false}>
          <form className="w-full h-full flex flex-col items-center justify-center sm:w-100 sm:h-50 md:w-[573px] md:h-[600px] xs:w-full xs:py-5  px-4 sm:px-12">
            <h1 className="text-white sm:text-[44px] xs:text-[18.94px] font-black">
              Forgot your password?
            </h1>

            <p className="text-caption xs:mb-2 xs:mt-4 sm:my-5 text-md text-center sm:w-[70%] my-5 sm:text-[15px] xs:text-[14px]">
              Please enter the email address associated with your account and We
              will email you a link to reset your password.
            </p>
            <ThemeInput
              extras={{ ...register("email") }}
              label="Email"
              errorMessage={errors?.email?.message}
              disabled={isLoading}
            />
            <div className="my-3"></div>

            <Button
              onClick={handleSubmit(handleSendEmail)}
              className="bg-secondary-800 mb- w-full h-[48px] text-[19px] font-medium text-theme-900 rounded"
              isLoading={isLoading}
            >
              Send Email
            </Button>
            <BackButton onClick={() => router.back()} />
          </form>
        </CardContainer>
      </div>
      <ToastContainer />
    </main>
  );
};

export default ForgotPassword;
