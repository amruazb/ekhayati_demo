"use client";
import { Link, storeLocalFavorites } from "@/utils";
import CardContainer from "@/abstract/CardContainer";
import Image from "next/image";
import LoginButton from "./components/LoginButton";
import * as Yup from "yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ThemeInput } from "@/components/input/theme-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { extractError, getCart, getFavoritedProducts, getMe, loginApi, incrementCartItem } from "@/provider";
import { useRouter } from "next/navigation";
import { setToken } from "@/utils";
import { useAuth } from "@/provider/AuthContext";
import { saveCartItems, setUserAddresses, setUserProfiles } from "@/utils/cart";
import { Checkbox } from "@nextui-org/react";
import RequestPasswordResetDialog from "./components/RequestPasswordResetDialog";
import { useTranslations } from "next-intl";
import {
  getLocalFavorites,
  appendToFav
} from "@/utils";
import { addMekhwarToCart } from "@/provider";
import { useProducts } from "@/provider/ProductContext";


type Inputs = {
  emailOrPhone: string;
  password: string;
};

const formSchema = Yup.object().shape({
  emailOrPhone: Yup.string()
    .required("Please enter your email")
    .email("Email is not valid"),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password length should be at least 6 characters"),
  });

  const LoginPage = () => {
  const products: any[] = useProducts(); // Fetch global products
  const [idLoading, setIsLoading] = useState(false);
  const [isPasswordResetDialogOpen, setIsPasswordResetDialogOpen] =
  useState(false);

    const t = useTranslations("auth");
  const router = useRouter();
  const authCtx = useAuth();

  const backendUrl = process.env.NEXT_PUBLIC_API_HOST;
  const googleProvider = "google";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onTouched",
    //@ts-ignore
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setIsLoading(true);
    const existingFavorites = getLocalFavorites();

    try {
      const { data, error }: any = await loginApi({
        identifier: formData.emailOrPhone,
        password: formData.password,
      });

      const extractedError = extractError(error);

      if (extractedError) {
        toast.error(extractedError, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      if (data) {
        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setToken(data);

        const existingCart = JSON.parse(localStorage.getItem("cart") || '{"custom": []}');
        const guestCartItems = existingCart.custom || []; // Extract `custom` array for guest users

        // Enrich guest cart items with product data
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
          const { data: cartData, error } = await getCart(data.jwt);
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
              await incrementCartItem(data.jwt, { id: item.id, dataType: item.type });
            } else {
              // Add new items to backend
              await addMekhwarToCart(data.jwt, item);
            }
          }
          
          console.log("Cart successfully merged and synced with updated quantities.");
          

          console.log("Cart successfully merged and synced.");
        } catch (error) {
          console.error("Error during cart merge and sync:", error);
        }

  

        //get othter details
        const { data: userData } = await getMe(data.jwt);

        //get favorite products
        const { data: favoritesData }:any = await getFavoritedProducts(data.jwt);

        const fab: any = [];

        favoritesData?.res.forEach((item: any) => {
          fab.push(item.id);
        });
        //@ts-ignore
        setUserAddresses(userData?.addresses);
        //@ts-ignore
        setUserProfiles(userData?.size_profiles);

        storeLocalFavorites(fab);
        appendToFav(existingFavorites);
        authCtx.setIsAuthenticated(true);
        authCtx.setToken(data?.jwt || "");
        authCtx.setUser({
          id: data?.user?.id,
          name: data?.user?.name,
          email: data?.user?.email,
        });
        setIsLoading(false);

        const redirectPath = sessionStorage.getItem("redirectTo");
        if (redirectPath) {
          router.push(redirectPath);
          sessionStorage.removeItem("redirectTo"); // Clear after redirection
          return;
        }
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err?.message || err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-[90vh] min-w-screen w-full flex flex-col items-center justify-center overflow-hidden m-0 p-0 xs:py-2">
      <div className="login-container xs:w-full px-5">
        <CardContainer scissors={false}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full flex flex-col items-center justify-center sm:w-100 sm:h-50 md:w-[573px] md:h-[600px] xs:w-full xs:py-5  px-4 sm:px-12"
          >
            {/* LOGIN */}
            <h1 className="text-secondary sm:text-[44px] xs:text-[18.94px] font-black">
              {t("login")}
            </h1>

            <p className="text-caption xs:mb-2 xs:mt-4 sm:my-5 text-md text-center sm:w-[70%] my-5 sm:text-[15px] xs:text-[14px]">
              {t("login_to_your_account_to_continue")}
            </p>

            <div className="w-full flex justify-center xs:my-2 mt-5 mb-7">
              {/* <Image priority={true} unoptimized className="sm:w-[70px] sm:h-[70px] xs:w-[30px] xs:h-[30px] object-contain mx-3" src="/assets/images/facebook-logo.png" width={70} height={70} alt="" /> */}
              {/*@ts-ignore */}
              <Link href={`${backendUrl}connect/${googleProvider}`}>
                <Image
                  priority={true}
                  unoptimized
                  className="sm:w-[70px] sm:h-[70px] xs:w-[30px] xs:h-[30px] object-contain mx-3"
                  src="/assets/images/google-logo.png"
                  width={70}
                  height={70}
                  alt=""
                />
              </Link>
              {/* <Image priority={true} unoptimized className="sm:w-[70px] sm:h-[70px] xs:w-[30px] xs:h-[30px] object-contain mx-3" src="/assets/images/x-logo.png" width={70} height={70} alt="" /> */}
            </div>

            <div className="w-[70%] flex flex-row justify-center items-center">
              <div className="w-[40%] border-t-1 opacity-30 border-black"></div>
              <div className="mx-5 text-center text-white text-opacity-50 text-base font-medium  leading-tight">
                {t("or")}
              </div>
              <div className="w-[40%] border-t-1 opacity-30 border-black"></div>
            </div>

            <div className="my-3"></div>
            <ThemeInput
              errorMessage={errors.emailOrPhone?.message}
              extras={{ ...register("emailOrPhone") }}
              label={t("email")}
            />
            <div className="my-3"></div>
            <ThemeInput
              type="password"
              errorMessage={errors.password?.message}
              extras={{ ...register("password") }}
              label={t("password")}
            />

            <div className="w-full flex justify-between mt-3">
              <label className="flex ">
                {/* <Checkbox color="secondary" /> */}
                {/* <span className="ml-1 mr-20 text-sm ">Remember Me</span> */}
              </label>
              <p className="text-sm text-gray-600">
                <Link href={"/forgetPassword"} prefetch={true}>
                  {" "}
                  <span className=" text-secondary  cursor-pointer">
                    {t("forgot_password")}
                  </span>{" "}
                </Link>
              </p>
            </div>

            <div className="mt-12 w-full flex flex-col items-center">
              <LoginButton label={t("login")} isLoading={idLoading} type="submit" />
              <p className="mt-4 text-sm text-white">
                {t("dont_have_an_account")}{" "}
                <Link href={"/signup"} prefetch={true}>
                  <span className="text-secondary text-base cursor-pointer">
                    {t("get_started")}
                  </span>{" "}
                </Link>
              </p>
              {/* <SignupButton /> */}
            </div>
          </form>
        </CardContainer>
      </div>
      <ToastContainer />
      <RequestPasswordResetDialog
        dialogOpen={isPasswordResetDialogOpen}
        handleClose={() => setIsPasswordResetDialogOpen(false)}
      />
    </main>
  );
};

export default LoginPage;
