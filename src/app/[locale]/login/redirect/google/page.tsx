'use client'

import { Button, CircularProgress } from "@nextui-org/react";
import { useEffect } from "react";
import qs from "querystring";
import axios from "axios";
import { getCart, getMe, getFavoritedProducts } from "@/provider";
import { useAuth } from "@/provider/AuthContext";
import { setToken, useRouter } from "@/utils";
import { saveCartItems, setUserAddresses, setUserProfiles } from "@/utils/cart";
import { ToastContainer, toast } from "react-toastify";
import { storeLocalFavorites, getLocalFavorites, appendToFav } from "@/utils";

export default function AuthGoogleCallback(props: any) {

    const authCtx = useAuth();
    const router = useRouter();


    useEffect(() => {
        handleLoadInformation();
    }, [])


    const handleLoadInformation = async () => {
        const query = props.searchParams;
        const apiHost = process.env.NEXT_PUBLIC_API_HOST;
        const baseUrl = apiHost + "auth/google/callback";
        const existingFavorites = getLocalFavorites();
        try {
            const res = await axios.get(baseUrl + "?" + qs.stringify(query));
            const data = res.data;
            setToken(data);
            const { data: cartData, error } = await getCart(data.jwt);
            //@ts-ignore
            saveCartItems(cartData);
    
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
              email: data?.user?.email
            });
            const redirectPath = sessionStorage.getItem("redirectTo");
            if (redirectPath) {
                router.push(redirectPath as any);
                sessionStorage.removeItem("redirectTo"); // Clear after redirection
                return;
            }
            router.push("/");
        } catch (err) {
            toast.error("Email already used, please use password for login");
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }
    }

    return (
        <div className="min-w-main w-full h-dvh flex flex-col justify-center items-center">
            <CircularProgress color="secondary"/>
            <h1 className="text-white mt-3">Loading your information...</h1>
            <ToastContainer />
        </div>
    )
}