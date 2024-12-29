"use client";

import ShopPageHeader from "@/components/shop/shop-page-header";
import {
  applyCoupon,
  getClientSecret,
  getCustomOrderDetails,
  getSiteConfig,
} from "@/provider";
import { useAuth } from "@/provider/AuthContext";
import { getToken } from "@/utils";
import { getUserAddresses, getUserCart } from "@/utils/cart";
import { CircularProgress } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import { useTranslations } from "next-intl";

interface CartItemI {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default async function CheckoutSummary(props: any) {
  const stripePromise = loadStripe(process?.env?.NEXT_PUBLIC_STRIPE_PUBLISHABLE || "");

  const [initialLoadingComplete, setInitialLoadingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemI[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [tailorFee, setTailorFee] = useState(0);
  const [fabricPrice, setFabricPrice] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [customOrderData, setCustomOrderData] = useState<any>(null);
  const t = useTranslations("shop");

  const ctx = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (props?.searchParams?.orderType === "custom") {
      await handleCustomOrder();
      return;
    }
    ctx.checkAuth();
    const cart = getUserCart();
    const address = getUserAddresses();
    const { data, error } = await getSiteConfig();
    const deliveryCharge = data?.data?.attributes?.delivery_charge || 0;
    const tax = data?.data?.attributes?.tax || 0;
    let coupon: any = null;

    if (props.searchParams?.couponCode) {
      const token = ctx.token || getToken();
      const { data: couponData, error: couponError } = await applyCoupon(token || "", {
        code: props.searchParams?.couponCode,
      });
      coupon = couponData || null;
    }

    await handleLoadedData(cart, address, tax, deliveryCharge, coupon);
  };

  const handleLoadedData = async (
    cart: any,
    addresses: any,
    taxAmount: number,
    deliveryCharge: number,
    discount: {
      type: "Flat" | "Percentage";
      amount: number;
    } | null
  ) => {
    const cItems: CartItemI[] = [];

    if (cart?.custom?.length > 0) {
      cart.custom.forEach((item: any, index: number) => {
        cItems.push({
          id: item?.mekhwar?.id,
          name: item?.mekhwar?.title,
          price: item?.mekhwar?.price,
          quantity: item?.quantity,
          image: item?.mekhwar?.main_image?.url,
        });
      });
    }

    setCartItems(cItems);

    if (addresses?.length > 0) {
      setSelectedAddress(addresses.find((i: any) => i.id == props?.searchParams.addressId));
    }

    //set subtotal
    const sT = cItems.reduce((p, c: any) => {
      return (+p || 0) + (+c.price || 0) * (+c.quantity || 0);
    }, 0);
    setSubtotal(sT);

    const discountAmount = calcDiscount(sT, discount);
    setDiscount(discountAmount);

    const tAmount = calcTax(sT, taxAmount);
    setTax(tAmount);

    setDeliveryCharge(deliveryCharge);

    setTotal(sT + tAmount + deliveryCharge - discountAmount);

    setInitialLoadingComplete(true);

    const { data: clientSecretData } = await getClientSecret(getToken(), {
      amount: (sT + tAmount + deliveryCharge - discountAmount) * 100,
      cartId: cart?.id,
      userId: ctx?.user.id,
      delivery_charge: deliveryCharge,
      total: sT,
      total_discount: discountAmount,
      total_tax: tAmount,
      customer_address: props?.searchParams.addressId,
      delivery_note: props?.searchParams?.deliveryNote || "",
      orderType: props?.searchParams?.orderType || "",
      orderId: props?.searchParams?.orderId || "",
    });

    //@ts-ignore
    setClientSecret(clientSecretData?.clientSecret || "");
  };

  const handleCustomOrder = async () => {
    ctx.checkAuth();

    const addresses = getUserAddresses();

    if (addresses?.length > 0) {
      setSelectedAddress(addresses.find((i: any) => i.id == props?.searchParams.addressId));
    }

    const { data: orderData, error: orderError }: any = await getCustomOrderDetails(
      ctx.token,
      {
        id: props?.searchParams?.orderId,
      }
    );

    setCustomOrderData(orderData);

    setTax(orderData?.tax || 0);
    setDeliveryCharge(orderData?.delivery_charge || 0);
    setTailorFee(orderData?.tailor_fee || 0);
    setFabricPrice(orderData?.price || 0);
    setDiscount(orderData?.discount || 0);
    setSubtotal(
      (orderData?.delivery_charge || 0) +
        (orderData?.tailor_fee || 0) +
        (orderData?.price || 0) -
        (orderData?.discount || 0)
    );
    setTotal(
      (orderData?.tax || 0) +
        (orderData?.delivery_charge || 0) +
        (orderData?.tailor_fee || 0) +
        (orderData?.price || 0) -
        (orderData?.discount || 0)
    );

    const { data: clientSecretData } = await getClientSecret(getToken(), {
      customer_address: props?.searchParams.addressId,
      delivery_note: props?.searchParams?.deliveryNote || "",
      orderType: props?.searchParams?.orderType || "",
      orderId: props?.searchParams?.orderId || "",
    });

    //@ts-ignore
    setClientSecret(clientSecretData?.clientSecret || "");
    setInitialLoadingComplete(true);
    setIsLoading(false);
  };

  const calcDiscount = (subtotal: number, discount: any) => {
    if (discount?.type == "Flat") {
      return discount?.amount;
    } else if (discount?.type == "Percentage") {
      return (subtotal * discount?.amount) / 100;
    }
    return 0;
  };

  const calcTax = (subtotal: number, tax: number) => {
    return (subtotal * tax) / 100;
  };

  if (!initialLoadingComplete) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="md:min-h-screen min-w-main w-full flex flex-col items-start justify-start overflow-hidden py-12 px-6 xs:px-3">
      <ShopPageHeader
        title=""
        coloredTitle={t("payment")}
        description={t("cart_description")}
      />

      <div className="w-full flex justify-center items-center">
        <section className="md:min-h-screen max-w-main w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <article className="px-3">
            <h3 className="font-medium text-lg text-secondary">{t("summary")}</h3>

            <div className="w-full py-3">
              {cartItems.map((item, index) => (
                <div
                  key={`cart-item-${index}`}
                  className="bg-primary-700 py-3 px-4 my-2 rounded-lg flex flex-row items-center justify-between"
                >
                  <div className="info flex flex-row items-center justify-center">
                    <Image
                      src={item?.image || ""}
                      alt="item image"
                      width={"0"}
                      height={"0"}
                      sizes="100vh"
                      className="w-[35px] h-[35px] object-cover rounded-md border-secondary-800 border-1"
                    />
                    <p className="text-white text-sm ml-5">{item?.name}</p>
                  </div>

                  <p className="text-white text-sm">AED {item.quantity * item.price}</p>
                </div>
              ))}
            </div>

            {props?.searchParams?.orderType === "custom" && (
              <div className="w-full py-3">
                <div className="bg-primary-700 py-3 px-4 my-2 rounded-lg flex flex-row items-center justify-between">
                  {customOrderData?.design?.url ? (
                    <div className="info flex flex-row items-center justify-center">
                      <Image
                        src={customOrderData?.design?.url || ""}
                        alt="item image"
                        width={"0"}
                        height={"0"}
                        sizes="100vh"
                        className="w-[35px] h-[35px] object-cover rounded-md border-secondary-800 border-1"
                      />
                      <p className="text-white text-sm mx-5">{t("design")}</p>
                    </div>
                  ) : (
                    <div className="info flex flex-row items-center justify-center">
                      <Image
                        src={
                          customOrderData?.mukhawar?.main_image?.formats?.thumbnail?.url || ""
                        }
                        alt="item image"
                        width={"0"}
                        height={"0"}
                        sizes="100vh"
                        className="w-[35px] h-[35px] object-cover rounded-md border-secondary-800 border-1"
                      />
                      <p className="text-white text-sm mx-5">
                        {customOrderData?.mukhawar?.title}
                      </p>
                    </div>
                  )}

                  <p className="text-white text-sm"></p>
                </div>

                <div className="bg-primary-700 py-3 px-4 my-2 rounded-lg flex flex-row items-center justify-between">
                  <div className="info flex flex-row items-center justify-center">
                    <Image
                      src={customOrderData?.fabric?.main_image?.url || ""}
                      alt="item image"
                      width={"0"}
                      height={"0"}
                      sizes="100vh"
                      className="w-[35px] h-[35px] object-cover rounded-md border-secondary-800 border-1"
                    />
                    <p className="text-white text-sm mx-5">
                      {customOrderData?.fabric_pattern
                        ? customOrderData.fabric_pattern
                        : customOrderData?.fabric?.name}
                    </p>
                  </div>

                  <p className="text-white text-sm"></p>
                </div>
              </div>
            )}

            <div className="w-full flex flex-col items-start justify-start mt-3">
              <h4 className="text-sm text-secondary font-medium">{t("address_info")}</h4>
              <p className="text-white text-sm mt-2">
                {selectedAddress?.address}, {selectedAddress?.city}, {selectedAddress?.state},{" "}
                {selectedAddress?.country}
              </p>
            </div>

            <div className="w-full flex flex-col items-start justify-start mt-4">
              {discount > 0 && (
                <div className="summaryitem w-full flex flex-row items-center justify-between mt-3">
                  <h3 className="text-sm text-white font-medium">{t("discount")}</h3>
                  <h3 className="text-sm text-white font-medium">AED -{discount}</h3>
                </div>
              )}

              {fabricPrice > 0 && (
                <div className="summaryitem w-full flex flex-row items-center justify-between mt-3">
                  <h3 className="text-sm text-white font-medium">{t("fabric_price")}</h3>
                  <h3 className="text-sm text-white font-medium">AED {fabricPrice}</h3>
                </div>
              )}

              {tailorFee > 0 && (
                <div className="summaryitem w-full flex flex-row items-center justify-between mt-3">
                  <h3 className="text-sm text-white font-medium">{t("tailor_fee")}</h3>
                  <h3 className="text-sm text-white font-medium">AED {tailorFee}</h3>
                </div>
              )}

              {/* <div className="summaryitem w-full flex flex-row items-center justify-between">
                <h4 className="text-md text-secondary font-medium">
                  {t("subtotal")}
                </h4>
                <h4 className="text-md text-secondary font-medium">
                  {subtotal}
                </h4>
              </div> */}

              {tax != null && tax > 0 ? (
                <div className="summaryitem w-full flex flex-row items-center justify-between mt-3">
                  <h3 className="text-sm text-white font-medium">{t("tax")}</h3>
                  <h3 className="text-sm text-white font-medium">AED {tax}</h3>
                </div>
              ) : (
                <></>
              )}

              {deliveryCharge > 0 ? (
                <div className="summaryitem w-full flex flex-row items-center justify-between mt-3">
                  <h3 className="text-sm text-white font-medium">{t("delivery_charge")}</h3>
                  <h3 className="text-sm text-white font-medium">AED {deliveryCharge}</h3>
                </div>
              ) : (
                <> </>
              )}

              <div className="summaryitem w-full flex flex-row items-center justify-between mt-3">
                <h4 className="text-md text-secondary font-medium">{t("total")}</h4>
                <h4 className="text-md text-secondary font-medium">AED {total}</h4>
              </div>
            </div>
          </article>

          {clientSecret && (
            <article className="px-3">
              <h3 className="font-medium text-lg text-secondary">{t("payment")}</h3>
              <div className="mt-3"></div>
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    labels: "above",
                    variables: {
                      fontFamily: "Sohne, system-ui, sans-serif",
                      fontWeightNormal: "500",
                      borderRadius: "8px",
                      colorBackground: "#023435",
                      colorPrimary: "#012828",
                      accessibleColorOnColorPrimary: "#1A1B25",
                      colorText: "white",
                      colorTextSecondary: "white",
                      colorTextPlaceholder: "#727F96",
                      tabIconColor: "white",
                      logoColor: "dark",
                    },
                  },
                }}
              >
                <CheckoutForm />
              </Elements>
            </article>
          )}
        </section>
      </div>
    </div>
  );
}
