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
import { useProducts } from "@/provider/ProductContext";  


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
  const products: any[] = useProducts(); // Fetch products using the Hook here
  // useEffect(() => {
  //   console.log("Products in Cart component:", products);
  // }, [products]);

  const validateCartItems = (cartItems: any[], products: any[]) => {
    return cartItems
      .map((item) => {
        const product = products.find((p) => p.id === item.mekhwar?.id || item.id); // Match based on `mekhwar.id` for guest items
        if (!product) return null; // Handle invalid items
        return {
          ...item,
          title: product.attributes?.title || item.mekhwar?.title,
          price: product.attributes?.price || item.mekhwar?.price,
          main_image: product.attributes?.main_image?.data?.attributes?.url || item.mekhwar?.main_image?.url,
        };
      })
      .filter(Boolean);
  };
  
  useEffect(() => {
    const loadData = async () => {
      if (products.length === 0) {
        // Wait until products are fetched
        console.log("Waiting for products to load...");
        return;
      }
  
      if (!ctx.checkAuth()) {
        // Guest User: Load data from localStorage
        const localCart = JSON.parse(localStorage.getItem("cart") || '{"custom": []}');
        const guestCartItems = localCart.custom || []; // Extract `custom` array for guest users
  
        console.log("Local cart:", guestCartItems);
        console.log("Products:", products);
  
        const validatedCart = validateCartItems(guestCartItems, products);
        console.log("Validated cart:", validatedCart);
        setCartData({ custom: validatedCart }); // Set the updated `custom` structure
        setLoadCompleted(true);
        setLoading(false);
        return;
      }
  
      // Authenticated User: Load from API
      const cartItems = getUserCart();
      setCartData(cartItems);
  
      const { data } = await getSiteConfig();
      setDeliveryCharge(data?.data?.attributes?.delivery_charge || 0);
      setTax(data?.data?.attributes?.tax || 0);
      setDeliveryNote(data?.data?.attributes?.delivery_note || "");
  
      setLoadCompleted(true);
      setLoading(false);
    };
  
    loadData();
  }, [products]); // Dependency on `products` ensures the effect re-runs when products are updated.
  

  // const loadData = async () => {
  //   if (!ctx.checkAuth()) {
  //     // Load data from localStorage for guest users
  //     const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
  //     console.log("Local cart", localCart);
  //     console.log("Products", products);
  //     const validatedCart = validateCartItems(localCart, products);
  //     console.log("Validated cart", validatedCart);
  //     setCartData(validatedCart);
  //     setLoadCompleted(true);
  //     setLoading(false);
  //     return;
  //   }

  //   const cartItems = getUserCart();
  //   setCartData(cartItems);

  //   const { data } = await getSiteConfig();
  //   setDeliveryCharge(data?.data?.attributes?.delivery_charge || 0);
  //   setTax(data?.data?.attributes?.tax || 0);
  //   setDeliveryNote(data?.data?.attributes?.delivery_note || "");
  //   setLoadCompleted(true);
  //   setLoading(false);
  // }

  const handleCartItemAction = async (action: "increment" | "decrement" | "delete", item: any) => {
    if (!item) return;
    setUpdating(true);
    if (!ctx.checkAuth()) {
      // Guest user: Update localStorage directly
      const localCart = JSON.parse(localStorage.getItem("cart") || "{}");
      const updatedCart = { ...localCart };
  
      switch (action) {
        case "increment":
          updatedCart.custom = updatedCart.custom.map((cartItem: any) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          );
          break;
        case "decrement":
          updatedCart.custom = updatedCart.custom.map((cartItem: any) =>
            cartItem.id === item.id && cartItem.quantity > 1
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
          break;
        case "delete":
          updatedCart.custom = updatedCart.custom.filter((cartItem: any) => cartItem.id !== item.id);
          break;
      }
  
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartData(updatedCart);
      setUpdating(false);
      return;
    }
    
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

  // useEffect(() => {
  //   loadData();
  // }, []);

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