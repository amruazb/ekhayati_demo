import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Roboto } from "next/font/google";
import React from "react";
import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import AuthContextProvider from "@/provider/AuthContext";
import { ProductProvider } from "@/provider/ProductContext";
import { Analytics } from '@vercel/analytics/react';
import 'react-toastify/dist/ReactToastify.css';


const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["italic", "normal"],
  // display: 'swap',
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const messages = useMessages();
  const locale = useLocale();
  return (
    <html
      lang={locale}
      className={inter.className}
    >
      
      <body suppressHydrationWarning={true} className={`${inter.className} bg-primary  ${locale === "ar" ? " rtlot" : ""}`}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Asia/Dubai"
        // onError={(e) => console.error(e)}
        >
          <AuthContextProvider>
            <ProductProvider>
            <Navbar />
            {children}
            <Footer />
            </ProductProvider>
          </AuthContextProvider>
        </NextIntlClientProvider>
        {/* <SpeedInsights /> */}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
