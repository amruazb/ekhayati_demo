import ShopItemList from "./item-list";
import { getLocale, getTranslations } from "next-intl/server";
import { getProductListing } from "@/provider";
import qs from "qs";
import { Metadata } from "next";
import { Link } from "@/utils";

async function getData(props: any) {
    const locale = await getLocale();
    const searchParams = props.searchParams || {};

    const publicToken = "";
    const parsedQs: any = qs.parse(searchParams);
    const parsedFilter: any = parsedQs.filters;
    const filtersObj: any = {};
    if (parsedFilter?.["$and"])
      for (const key in parsedFilter?.["$and"]) {
        filtersObj[key] = parsedFilter["$and"][key];
      }
    if (parsedFilter?.["$and"]) parsedFilter["$and"] = filtersObj;


    const { data: productData, error: productError } = await getProductListing(
      publicToken,
      {
        "pagination[pageSize]": 20,
        "pagination[page]": parsedQs?.pagination?.page || 1,
        locale: locale ?? "en",
        populate: "main_image,tailor,category",
        filters: parsedFilter || {},
      }
    );

    return { productData };
  }

export async function MukhwarShopListing(props: any) {
 
  const { productData } = await getData(props);
  const t = await getTranslations("shop");

  //@ts-ignore
  return productData?.data?.length > 0 ? (
    <ShopItemList
      title={t("shop_page_title_l")}
      coloredTitle={t("shop_page_title_t")}
      description={t("shop_page_title_slogan")}
      items={productData?.data?.map((item) => {
        return {
          id: item?.id,
          title: item?.attributes?.title,
          image: item?.attributes?.main_image?.data?.attributes?.url,
          price: item?.attributes?.price,
          tailorName: item?.attributes?.tailor?.data?.attributes?.name,
          rating: item?.attributes?.rating,
          customizable: item?.attributes?.customizable,
        };
      })}
      pagination={productData?.meta?.pagination}
    />
  ) : (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center">
      <h1 className="text-xl">{t("no_items_found")}</h1>
      <Link
        className="text-secondary font-medium text-large"
        href={"/shop"}
        prefetch={true}
      >
        {t("clear_filters")}
      </Link>
    </div>
  );
}
