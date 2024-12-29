"use client";
import { CircularProgress } from "@nextui-org/react";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(false);
  const locale = useLocale();

  const el = elements?.getElement("card");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/${locale}/checkout/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement
        id="payment-element"
        className=""
        options={{
          layout: {
            type: "tabs",
            spacedAccordionItems: true
          }
        }}
      />
      <button
        className="w-full bg-secondary hover:bg-secondary-800 mt-5 p-3 rounded-md"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span className="text-primary-900">
          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <CircularProgress size={"sm"} className="color-primary" />
            </div>
          ) : (
            "Checkout"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
