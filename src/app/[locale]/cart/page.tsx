'use client'
import ItemListContainer from "./components/ItemListContainer";
import CartSummary from "./components/CartSummary";
import { useEffect, useState } from "react";
import { useAuth } from "@/provider/AuthContext";
import { Link, useRouter } from "@/utils";
import Loading from "../loading";
import { getUserCart, storeCart } from "@/utils/cart";
import { CircularProgress } from "@nextui-org/react";
import { decrementCartItem, getSiteConfig, incrementCartItem, removeCartItem } from "@/provider";
import Image from "next/image";
import { CartHeader } from "./components/CartHeader";

const Cart = () => {

  const [loading, setLoading] = useState(true);
  const [loadCompleted, setLoadCompleted] = useState(true);
  const [cartData, setCartData] = useState<any>(null);
  const [updating, setUpdating] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [tax, setTax] = useState(0);
  const [deliveryNote, setDeliveryNote] = useState("");

  const ctx = useAuth();
  const router = useRouter();

  const loadData = async () => {
    if (!ctx.checkAuth()) {
      return router.push("/login");
    }

    const cartItems = getUserCart();
    setCartData(cartItems);

    const { data } = await getSiteConfig();
    setDeliveryCharge(data?.data?.attributes?.delivery_charge || 0);
    setTax(data?.data?.attributes?.tax || 0);
    setDeliveryNote(data?.data?.attributes?.delivery_note || "");
    setLoadCompleted(true);
    setLoading(false);
  }

  const handleCartItemAction = async (action: "increment" | "decrement" | "delete", item: any) => {
    if (!item) return;
    setUpdating(true);
    let res: any = null;
    switch (action) {
      case "increment":
        res = await incrementCartItem(ctx.token, { id: item.id, dataType: item.type });
        break;
      case "decrement":
        res = await decrementCartItem(ctx.token, { id: item.id , dataType: item.type });
        break;
      case "delete":
        res = await removeCartItem(ctx.token, { id: item.id, dataType: item.type });
        break;
    }
    if (res?.data) updateCartDetails(res?.data);
    if (res?.error) {
      setUpdating(false);
    }
  }

  const updateCartDetails = (data: any) => {
    //@ts-ignore
    storeCart(data);
    setCartData(data);
    setUpdating(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const classes = [
    "w-full",
    "h-full",
    "xs:h-auto sm:h-auto",
    "xs:grid-cols-1 xs:gap-x-0 sm:grid-cols-1 sm:gap-x-0",
    "grid lg:grid-cols-2 gap-x-5",
    "max-w-[2000px]",
  ];
  

  if (loadCompleted) return (
    <div className="w-full min-h-screen flex flex-col items-start justify-start sm:py-5 sm:px-12 xs:p-4">

      {
        updating && <div className="h-screen w-screen fixed left-0 top-0 flex flex-row justify-center items-center bg-black/50 z-50">
          <CircularProgress color="secondary" />
        </div>
      }

      <div className="w-full" onClick={() => router.back()}>
        <CartHeader />
      </div>

      {
        (loading || !loadCompleted) && <div className="h-[90vh] w-full flex flex-row justify-center items-center">
          <CircularProgress color="secondary" />
        </div>
      }
      {
        loadCompleted && (cartData?.custom?.length > 0 || cartData?.custom?.length > 0) && <div className="conat w-full flex flex-col items-center justify-center xs:mt-[-30px]">
          <div className={classes.join(" ")}>

            <ItemListContainer handleAction={handleCartItemAction} customItems={[]} items={cartData?.custom} />

            <CartSummary 
              custom={cartData?.custom} 
              mekhwars={cartData?.custom}
              deliveryNote={deliveryNote}
              deliveryCharge={deliveryCharge}
              tax={tax}
            />
          </div>
        </div>
      }


      {
        loadCompleted && (!cartData?.custom?.length && !cartData?.custom?.length) && <div className="w-full h-[50vh] flex flex-col items-center justify-center">
          <Image unoptimized src={"/assets/images/empty-cart.png"} width={300} height={300} alt="Empty cart image" />
          <p className="text-caption text-[20px]">Cart is empty, check this <Link prefetch={true} href={"/shop"} className="text-secondary underline">Page</Link> out</p>
        </div>
      }
    </div>
  );

  return <Loading />
}

export default Cart;