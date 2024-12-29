'use server'
import FabricCard from "@/components/cards/FabricCard"
import ShopPageHeader from "@/components/shop/shop-page-header";
import ShopPagination from "@/components/shop/pagination";
import { getFabricListing } from "@/provider";
import { getLocale, getTranslations } from 'next-intl/server';

async function getData(params: any) {
  const locale = await getLocale();
  const { data, error } = await getFabricListing("", {
    locale: locale ? locale : "en", 
    populate: "main_image",
    ...params,
    "pagination[pageSize]": 200,
    "pagination[page]": 1,
  });
  return data;
}

const FabricPage = async (props: any) => {
  const data = await getData(props.searchParams);
  const t = await getTranslations("shop");
  return (
    <main className="min-h-screen min-w-screen w-full flex xs:flex-col sm:flex-row items-start justify-start items-start justify-center overflow-hidden m-0 p-0">
      <section className="min-h-screen sm:w-[100%] xl:w-[100%] xs:w-full py-12 px-6 xs:px-3">
        <ShopPageHeader title={t("available_fabrics_l")} coloredTitle={t("available_fabrics_t")} description={t("available_fabrics_description")} />
        
        <div className="grid items-start justify-center sm:grid-cols-4 xs:grid-cols-2 md:grid-cols-2 l:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 xs:gap-y-5 xs:gap-x-5 sm:gap-x-5 sm:gap-y-6 min-h-[500px]">
          {
            data?.data?.map((item) => {
              return (<article key={item.id} className="grid-col-1"> <FabricCard 
              name={item?.attributes?.name} 
              id={item?.id}
              image={item.attributes?.main_image?.data?.attributes?.url}
              price={item.attributes?.price}
              /> </article>)
            })
          }
        </div>

        <div className="mt-12 flex justify-center">
          {
            data?.meta?.pagination?.pageCount ?
            <ShopPagination data={data} /> : null
          }
        </div>
      </section>
    </main>
  )
}

FabricPage.getInitialProps = async (props: any) => {
  return props;
}

export default FabricPage;