"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import CardContainer from "@/abstract/CardContainer";
import { Link, storeLocalFavorites } from "@/utils";
import PhoneInput from "react-phone-input-2";
import {ThemeInput} from "@/components/input/theme-input";
import { MobileInput } from "@/components/input/mobile-input";
import SignupButton from "./components/SignupButton";
import { getCart, getMe, getFavoritedProducts, registerApi, incrementCartItem } from "@/provider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { setToken, useRouter } from "@/utils";
import { useAuth } from "@/provider/AuthContext";
import { saveCartItems, setUserAddresses, setUserProfiles } from "@/utils/cart";
import "react-phone-input-2/lib/style.css";
import Link2 from "next/link";
import { useTranslations } from "next-intl";
import {
  getLocalFavorites,
  appendToFav
} from "@/utils";
import { addMekhwarToCart } from "@/provider";
import { useProducts } from "@/provider/ProductContext";

type Inputs = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  privacyPolicy: boolean;
  countryCode: string;
};

const LoginPage = () => {
  const products: any[] = useProducts(); // Fetch global products
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);

  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();
  const authCtx = useAuth();
  const t = useTranslations("auth");
 
  const backendUrl = process.env.NEXT_PUBLIC_API_HOST;
  const googleProvider = "google";

  const handleOnChange = (value: any, country: any) => {
    setPhoneNumber(value);
  };
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name length should be at least 3 characters"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password length should be at least 6 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .min(6, "Password length should be at least 6 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    privacyPolicy: Yup.string(),
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
    //@ts-ignore
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData: any) => {
    // const country = countryList.getCountryData(formData.countryCode);
    // formData.phone = "+" + country?.phone?.[0] + formData.phone;
    setIsLoading(true);
    const existingFavorites = getLocalFavorites();


    try {
      const {
        data: registerData,
        error,
        response,
      }: any = await registerApi({
        name: formData.name,
        phone: phoneNumber,
        email: formData.email,
        password: formData.password,
        username: formData.email,
      });

      //@ts-ignore
      if (error?.error?.details?.errors?.[0]?.message) {
        //@ts-ignore
        toast.error(error?.error.details.errors[0].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
      } else if (error?.error?.message) {
        toast.error(error?.error?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
      } else {
        toast.success("Account created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setToken(registerData);

        const existingCart = JSON.parse(localStorage.getItem("cart") || '{"custom": []}');
        const guestCartItems = existingCart.custom || []; // Extract `custom` array for guest users

        const enrichedGuestCart = guestCartItems.map((item: { id: string }) => {
          const product = products.find((p) => p.id === item.id); // Use fetched products to enrich
          return product
            ? {
                ...item,
                mekhwar: {
                  id: product.id,
                  title: product.attributes?.title,
                  price: product.attributes?.price,
                  main_image: product.attributes?.main_image?.data?.attributes?.url,
                },
              }
            : item; // Keep the item unchanged if no matching product
        });

        try {
          // Fetch the backend cart for the logged-in user
          const { data: cartData, error } = await getCart(registerData.jwt);
          if (error) {
            console.error("Error fetching backend cart:", error);
            return;
          }

          const mergedCart = [
            ...cartData?.custom || [], // Backend cart items
            ...enrichedGuestCart, // Enriched guest cart items
          ];
          
          // Merge duplicates by incrementing quantity instead of duplicating
          const uniqueMergedCart = mergedCart.reduce((acc, current) => {
            const existingItem = acc.find((item) => item.id === current.id);
            if (existingItem) {
              // Increment quantity if item already exists
              existingItem.quantity = (existingItem.quantity || 1) + (current.quantity || 1);
            } else {
              acc.push(current);
            }
            return acc;
          }, []);
          
          // Save the merged cart to localStorage and backend
          saveCartItems({ ...cartData, custom: uniqueMergedCart });
          
          // Sync enriched guest cart items with backend
          for (const item of enrichedGuestCart) {
            const existingItem = cartData?.custom?.find((backendItem) => backendItem.id === item.id);
            if (existingItem) {
              // Increment quantity for existing items in backend
              await incrementCartItem(registerData.jwt, { id: item.id, dataType: item.type });
            } else {
              // Add new items to backend
              await addMekhwarToCart(registerData.jwt, item);
            }
          }
          
          console.log("Cart successfully merged and synced with updated quantities.");
          

          console.log("Cart successfully merged and synced.");
        } catch (error) {
          console.error("Error during cart merge and sync:", error);
        }

        //get othter details
        const { data: userData } = await getMe(registerData.jwt);
        //@ts-ignore
        setUserAddresses(userData?.addresses);
        //@ts-ignore
        setUserProfiles(userData?.size_profiles);

        // Step 5: Get favorites from the server
        const { data: favoritesData }: any = await getFavoritedProducts(registerData.jwt);
        const fab: any = [];
        favoritesData?.res.forEach((item: any) => {
          fab.push(item.id);
        });

        // Step 6: Merge local favorites with server favorites
        storeLocalFavorites(fab);
        appendToFav(existingFavorites);

        authCtx.setIsAuthenticated(true);
        authCtx.setToken(registerData?.jwt || "");
        authCtx.setUser({
          id: registerData?.user?.id,
          name: registerData?.user?.name,
          email: registerData?.user?.email,
        });

         // Step 7: Handle redirection
        let redirectPath = sessionStorage.getItem("redirectTo");
        if (redirectPath) {
          if (redirectPath.startsWith("/en")) {
              redirectPath = redirectPath.slice(3); // Remove the first 3 characters
          }
          router.push(redirectPath as any);
          sessionStorage.removeItem("redirectTo"); // Clear redirect path
          return;
        }
        
        router.push("/");
        setIsLoading(false);
      }

      // if (error)
    } catch (err) {
      setIsLoading(false);
    }
    // setIsLoading(false);
  };

  return (
    <main className="min-h-screen min-w-screen w-full flex flex-col items-center justify-center overflow-hidden m-0 p-0 xs:py-2">
      <div className="register-container xs:w-full px-5">
        <CardContainer scissors={false}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full flex flex-col items-center justify-center sm:w-100 sm:h-50 md:w-[573px] md:min-h-[679px] md:py-10 xs:w-full xs:py-12 px-12 xs:px-4"
          >
            {/* Register */}
            <h1 className="text-white sm:text-[44px] xs:text-[39.94px] font-black">
              <span className="text-secondary">{t("sign_up")}</span>
            </h1>

            <p className="text-caption text-md text-center sm:w-[70%] my-5 sm:text-[15px] xs:text-[18px] text-center">
              {t("signup_description")}
            </p>

            <ThemeInput
              errorMessage={errors.name?.message}
              extras={{ ...register("name") }}
              label={t("name")}
            />

            <div className="my-2"></div>

            <ThemeInput
              errorMessage={errors.email?.message}
              extras={{ ...register("email") }}
              label={t("email")}
            />

            <div className="my-2"></div>

            <ThemeInput
              errorMessage={errors.password?.message}
              extras={{ ...register("password") }}
              label={t("password")}
              type="password"
            />

            <div className="my-2"></div>

            <ThemeInput
              errorMessage={errors.confirmPassword?.message}
              extras={{ ...register("confirmPassword") }}
              label={t("confirm_password")}
              type="password"
            />

            <div className="my-2"></div>

            <PhoneInput
              country={"ae"}
              value={phoneNumber}
              onChange={handleOnChange}
              inputStyle={{
                color: "white",
                background: "#022D2E",
                height: "48px",
                border: " #022D2E",
              }}
              dropdownStyle={{ color: "black" }}
              searchStyle={{ background: "#022D2E", color: "white" }}
              buttonStyle={{ background: "#FFD992" }}
              enableSearch={true}
              placeholder="+971 50 123 4567"
            />

            {/* <MobileInput
              label="Mobile"
              extras={register("phone")}
              errorMessage={errors.phone?.message}
              countryCodeErrorMessage={errors.countryCode?.message}
              countryCodeExtras={register("countryCode")}
              onCountryChange={setSelectedCountry}
              smaller={true}
            /> */}

            {/* <div className="mt-12 sm:max-w-[429px]">
            <AgreementPP errorMessage={errors.privacyPolicy?.message} extras={{...register("privacyPolicy")}} />
          </div> */}

            <div className="mt-12  w-full flex flex-row items-center justify-center">
              <SignupButton type="submit" isLoading={isLoading} />
            </div>
            <p className="mt-5 text-center ">
              {t("already_have_an_account")}{" "}
              <Link href={"/login"} className="text-secondary" prefetch={true}>
                {" "}
                {t("login")}
              </Link>
            </p>

            <p className="mt-5 text-center  ">
             {t("by_signing_up_i_agree_to_ekhayati")} <i>E-KHAYATI</i>
              <Link
                href={"/terms-and-conditions"}
                className="text-secondary cursor-pointer"
              >
                {" "}
                {t("terms_of_use")}
              </Link>{" "}
              {t("and")}
              <Link
                href={"/privacy-policy"}
                className="text-secondary  cursor-pointer"
              >
                {" "}
                {t("privacy_policy")}
              </Link>
              .
            </p>
            <div className="w-[70%] mt-3 flex flex-row justify-center items-center">
              <div className="w-[40%] border-t-1 opacity-30 border-black"></div>
              <div className="mx-5 text-center text-white text-opacity-50 text-base font-medium  leading-tight">
                {t("or")}
              </div>
              <div className="w-[40%] border-t-1 opacity-30 border-black"></div>
            </div>
            <Link2 href={`${backendUrl}connect/${googleProvider}`} className="flex items-center mt-3 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              <img
                src="/assets/images/google-logo.png"
                alt="Google Logo"
                className="w-5 h-5 mr-2"
              />
              {t("sign_up_with_google")}
            </Link2>
          </form>
        </CardContainer>
      </div>
      <ToastContainer />
    </main>
  );
};

export default LoginPage;
