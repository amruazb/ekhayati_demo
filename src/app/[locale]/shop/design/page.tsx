import { getLocale } from "next-intl/server";
import { getDesignListing, getProductCategoryListing, getProductListing } from "@/provider";
import qs from "qs";
import ShopItemList from "../components/item-list";

async function getData(props: any) {
  const locale = await getLocale();
  const searchParams = props.searchParams || {};

  const publicToken = "";
  const parsedQs: any = qs.parse(searchParams);
  const parsedFilter: any = parsedQs.filters;
  const filtersObj: any = {};
  if (parsedFilter?.["$and"]) for (const key in parsedFilter?.["$and"]) {
    filtersObj[key] = parsedFilter["$and"][key];
  }
  if (parsedFilter?.["$and"]) parsedFilter["$and"] = filtersObj;

  const { data: productData, error: productError } = await getDesignListing(publicToken, {
    "pagination[pageSize]": 20,
    "pagination[page]": parsedQs?.pagination?.page || 1,
    locale: locale ?? "en",
    populate: "image,tailor",
    filters: parsedFilter || {},
  });
  
  return { productData };
}

const ShopPage = async (props: any) => {

  const { productData } = await getData(props);

  return (
    <main className="min-h-screen min-w-screen w-full flex xs:flex-col sm:flex-row items-start justify-start items-start justify-center overflow-hidden m-0 p-0">
      <ShopItemList
        items={productData?.data?.map((item) => {
          return {
            id: item?.id,
            title: item?.attributes?.name,
            image: item?.attributes?.image?.data?.attributes?.url,
            price: item?.attributes?.price,
            tailorName: item?.attributes?.tailor?.data?.attributes?.name,
            rating: item?.attributes?.rating
          }
        })}
        pagination={productData?.meta?.pagination}
        title="Choose"
        coloredTitle="Design"
        description="Browse our wide collection of Mekhwar design, made only for your style and luxury"
      />
    </main>
  )
}
export default ShopPage;