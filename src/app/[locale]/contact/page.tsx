"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import CardContainer from "@/abstract/CardContainer";
import { ThemeInput } from "@/components/input/theme-input";
import { Button, CircularProgress } from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getSiteConfig, sendContactUs } from "@/provider";
import PhoneInput from "react-phone-input-2";
import { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { ToastContainer, toast } from "react-toastify";

type Inputs = {
  email: string;
  message: string;
};

const Contact = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [whatsappNum, setWhatsappNum] = useState("");

  const t = useTranslations("shop");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading1(true);
    const { data, error } = await getSiteConfig();
    //@ts-ignore
    setWhatsappNum(
      //@ts-ignore
      data?.data?.attributes?.whatsapp_number_for_custom_design?.toString()
    );
    setIsLoading1(false);
  };
  const handleOnChange = (value: any, country: any) => {
    setPhoneNumber(value);
  };
  const onSubmit: SubmitHandler<Inputs> = async (formData: any) => {
    // const country = countryList.getCountryData(formData.countryCode);
    // formData.phone = "+" + country?.phone?.[0] + formData.phone;
    // setIsLoading(true);

    try {
      setIsLoading(true);
      const { data, error, response }: any = await sendContactUs({
        email: formData.email,
        message: formData.message,
        phone: phoneNumber,
      });

      if (data?.success) {
        toast.success("Message sent successfully");
        setValue("email", "");
        setValue("message", "");
        setPhoneNumber("");
      }

      if (error) {
        toast.error("Error sending message");
      }
    } catch (err) {
      toast.error("Error sending message");
      //TODO: handle error
    }
    setIsLoading(false);
    // setIsLoading(false);
  };

  const formSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<Inputs>({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });
  return (
    <main className="min-h-[90vh] min-w-screen w-full flex flex-col overflow-hidden mt-0 p-0">
      <div className="grid grid-cols-1 pt-5 medium:mt-5 large:mt-5 xs:grid-cols-1 small:grid-cols-1 medium:grid-cols-1 large:grid-cols-2 gap-8 ">
        <div className="flex flex-col text-center mt-[12vh] xs:mt-0 mx-auto xs:mx-3 max-w-full  items-center small:mt-[3vh]  medium:max-w-[70%] medium:mt-[3vh] large:text-start large:max-w-[90%]   ">
          {" "}
          <p className=" [font-family:'Roboto-Black',Helvetica] font-black text-transparent large:text-[64px] tracking-[0] ">
            <span className="text-[#ffd992] xs:text-[26px] small:text-[42px] medium:text-[42px]">
              {t("contact_us_l")}{" "}
            </span>
            <span className="text-[#ffffff] xs:text-[26px] small:text-[42px] medium:text-[42px]">
              {t("contact_us_t")}
            </span>
          </p>
          <p className="mt-8 [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#ffffff80] text-[18px] tracking-[0] leading-[20px]">
            {t("contact_us_description")}
          </p>
          <Button
            onClick={() => {
              window.open("https://wa.me/" + whatsappNum, "_blank");
            }}
            className="mt-8 all-[unset] box-border flex items-center justify-center gap-2 w-[319px] bg-[#023435] rounded-[6px]"
            startContent={
              isLoading1 ? (
                <CircularProgress className="text-secondary-800 w-6" />
              ) : (
                <IconBrandWhatsapp size={24} />
              )
            }
          >
            <div className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-mainwhite text-[16px] text-center tracking-[0] leading-[24px] whitespace-nowrap">
              {t("chat_with_us")}
            </div>
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center  m-5 small:m-3 mt-10">
          <CardContainer scissors={false}>
            <div className="w-full max-w-[100%]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-full flex flex-col items-center justify-center px-4"
              >
                <div className="w-full">
                  <div className="w-full">
                    <div className="w-full relative rounded-[6px]">
                      <p className="[font-family:'Roboto-Black',Helvetica] font-black text-transparent text-[42px] text-center tracking-[0] pt-[20px]">
                        <span className="text-[#ffd992] mx-1">
                          {t("contact_form_l")}
                        </span>
                        <span className="text-[#ffffff] mx-3">
                          {t("contact_form_t")}
                        </span>
                      </p>
                      <p className="max-w-[85%] mx-auto [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[80%] pt-[10px]  text-center tracking-[0] leading-[20px]">
                        {t("contact_form_description")}
                      </p>

                      <div className="w-[80%] mx-auto mt-[20px]">
                        <ThemeInput
                          errorMessage={errors.email?.message}
                          extras={{ ...register("email") }}
                          label="Email"
                          name="email"
                        />
                      </div>
                      <div className="mx-auto  max-w-[80%] mt-[20px]">
                        <PhoneInput
                          country={"ae"}
                          value={phoneNumber}
                          onChange={(value) => {
                            setPhoneNumber(value);
                          }}
                          inputStyle={{
                            color: "white",
                            background: "#022D2E",
                            height: "55px",
                            border: " #022D2E",
                          }}
                          dropdownStyle={{ color: "black" }}
                          searchStyle={{
                            background: "#022D2E",
                            color: "white",
                          }}
                          buttonStyle={{ background: "#FFD992" }}
                          enableSearch={true}
                          placeholder="+971 50 123 4567"
                        />
                      </div>
                      <div className="w-[85%] mx-auto mt-[20px]">
                        <textarea
                          placeholder={t("your_message")}
                          className="mt-3 p-2 border border-gray-300 bg-primary-800 rounded-md w-full resize-none overflow-y-auto h-[10vw]"
                          {...register("message")}
                        />
                      </div>
                      <div className="flex mx-auto max-w-[85%] items-center gap-[1vw] p-[1vw] mt-[10px]">
                        <p className="font-normal text-[#ffffff] text-[12px] tracking-[0] leading-[15px]">
                          {t("contact_by_checking")}
                        </p>
                      </div>
                      <div className="w-[50px] mx-auto mt-[20px] mb-[20px]">
                        <Button
                          isLoading={isLoading}
                          disabled={isLoading}
                          type="submit"
                          className="bg-secondary-800 rounded-md text-primary-900"
                        >
                          {t("contact_submit")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </CardContainer>
        </div>
      </div>

      <ToastContainer />
    </main>
  );
};
export default Contact;
