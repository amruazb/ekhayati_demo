import { Suspense } from "react";
import Loading from "../loading";
import ShopFilter from "./components/shop-filter";
import { MukhwarShopListing } from "./components/MukhwarShopListing";
import { getProductCategoryListing } from "@/provider";
import { getLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Khayati | Shop",
  description: "E-Khayati Shop Page",
};

async function getData(props: any) {
  const locale = await getLocale();

  const publicToken = "";

  const { data: productCategories, error: productCategoriesError } =
    await getProductCategoryListing(publicToken, {
      "pagination[pageSize]": 20,
      locale: locale ?? "en",
    });

  return { productCategories };
}

const ShopPage = async (props: any) => {
  const { productCategories } = await getData(props);
  const t = await getTranslations("shop");

  return (
    <main className="min-h-screen min-w-screen w-full flex xs:flex-col sm:flex-row items-start  justify-start overflow-hidden m-0 p-0">
      <ShopFilter
        categories={productCategories?.data?.map((item: any) => {
          return {
            id: item.id,
            name: item?.attributes?.Name || "",
          };
        })}
      />
      <Suspense fallback={<Loading />}>
        <MukhwarShopListing {...props} />
      </Suspense>
    </main>
  );
};
export default ShopPage;
