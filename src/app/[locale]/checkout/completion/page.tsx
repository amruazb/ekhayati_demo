'use client'

import { Link } from "@/utils";
import { getUserCart, storeCart } from "@/utils/cart";
import { IconCircleCheck } from "@tabler/icons-react";
import { useEffect } from "react";

export default function CheckoutCompletion(props: any) {

    useEffect(() => {
        const cart = getUserCart();

        if (cart?.custom?.length) {
            cart.custom = [];
            storeCart(cart);
        }
    }, [])
    return <main className="w-screen h-screen flex flex-col items-center justify-center">
        <IconCircleCheck size={150} className="text-secondary my-5" />
        <h1 className="text-3xl text-secondary">Thank you for your order!</h1>
        <p className="mt-5">Continue shopping <Link className="text-secondary underline" prefetch={true} href="/">Home</Link></p>
    </main>;
}