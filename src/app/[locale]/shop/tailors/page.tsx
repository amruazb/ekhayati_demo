import TailorCard from "@/components/cards/TailorsCard";
import ShopPageHeader from "@/components/shop/shop-page-header";
import ShopPagination from "@/components/shop/pagination";
import { getTailorListing } from "@/provider";
import { getLocale, getTranslations } from "next-intl/server";
import qs from "qs";
import { Suspense } from "react";
import Loading from "../../loading";

async function getData(props: any) {
  const locale = await getLocale();
  const searchParams = props.searchParams || {};

  const publicToken = "";
  const parsedQs: any = qs.parse(searchParams);
  const parsedFilter: any = parsedQs.filters;

  const { data: tailorsData, error: productError } = await getTailorListing(publicToken, {
    "pagination[pageSize]": 6,
    "pagination[page]": parsedQs?.pagination?.page || 1,
    locale: locale ?? "en",
    populate: "image"
  });
  
  return { tailorsData };
}

const TailorsPage = async (props: any) => {

  const key = JSON.stringify(props?.searchParams);
  const { tailorsData } = await getData(props);
  const t = await getTranslations("shop");

  return (
    <main className="min-h-screen max-w-screen w-full flex xs:flex-col sm:flex-row items-start justify-start items-start justify-center overflow-hidden m-0 p-0">
      <section className="min-h-screen max-w-main py-12 px-6 xs:px-3">
        <ShopPageHeader title={t("choose_tailor_l")} coloredTitle={t("choose_tailor_t")} description={t("choose_tailor_description")} />
        <Suspense key={key} fallback={<Loading />}>
        <div className="grid items-start xs:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
          {
            tailorsData && tailorsData?.data?.map((item) => {
              return <TailorCard
                image={item?.attributes?.image?.data?.attributes?.url || ""}
                name={item?.attributes?.name || ""}
                id={item.id}
                description={item.attributes?.description || ""}
                rating={item.attributes?.rating || 0}
                key={item.id}
              />
            })
          }
        </div>
        </Suspense>
        <div className="mt-12 flex justify-center">
          {
            tailorsData?.meta?.pagination?.pageCount ?
            <ShopPagination data={tailorsData.meta.pagination} /> : null
          }
        </div>
      </section>
    </main>
  )
}

export default TailorsPage;