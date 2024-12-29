import { AppBreadCrumbs } from "@/components/breadcurms";
import { getFabricByID, getFabricListing } from "@/provider";
import { Button } from "@nextui-org/react";
import { getLocale, getTranslations } from "next-intl/server";
import { ProductImageSwiperList } from "../../../../../components/shop/ProductImageSwiperList";
import HomeFabricCarousel from "@/components/sections/home-fabric-carousel";
import { FabricBuyOptions } from "@/components/shop/FabricBuyOptions";
import { truncate } from "@/utils";
import RatingsSection from "@/components/shop/rating";
import { FabricPatternItemComponent } from "./components";
import { ShareButton } from "@/components/buttons/ShareButton";
import { IconCheck } from "@tabler/icons-react";

// export async function generateMetadata(props: any): Promise<Metadata> {
//   const productID = props.params.id;
//   const token = "";
//   const { data, error } = await getMekhwarByMetaID("", productID);

//   return {
//     //@ts-ignore
//     title: data?.data?.attributes?.title,
//     //@ts-ignore
//     description: data?.data?.attributes?.description,
//   };
// }

const getData = async (props: any) => {
  const productID = props.params.fabricId;
  const token = "";

  const { data, error } = await getFabricByID(token, productID);

  const filters: any = {
    //@ts-ignore
    category: data?.data?.attributes?.category?.data?.id || 1,
  };
  const { data: relatedData, error: relatedError } = await getFabricListing(token, {
    filters: filters,
    populate: "main_image,category",
    "pagination[limit]": 10,
  });

  console.log(data);
  return { data, relatedData };
};

const FabricPage = async (props: any) => {
  const { data, relatedData }: any = await getData(props);
  const locale = await getLocale();
  const t = await getTranslations("shop");
  const breadCrumbs = [
    {
      label: "Shop",
      href: `/${locale}/shop`,
    },
    {
      label: "Fabric",
      href: `/${locale}/shop/fabric`,
    },
    {
      label: data?.data?.attributes?.name,
    },
  ];
  return (
    <main className="min-h-screen min-w-screen w-full flex flex-col items-start justify-start overflow-hidden xs:py-1 sm:py-12 px-6 xs:px-3">
      <AppBreadCrumbs items={breadCrumbs} />

      <section
        id="ProductDetails"
        className="sm:w-[100%] xl:w-[100%] xs:w-full lg:min-h-[650px] mt-8 flex xs:flex-col sm:flex-row justify-center items-start"
      >
        {data?.data?.attributes?.images?.data?.length && (
          <ProductImageSwiperList
            images={data?.data?.attributes?.images?.data?.map(
              (item: any) => item?.attributes?.url
            )}
          />
        )}

        <div className="w-full flex flex-col sm:max-w-[500px] sm:pl-10">
          <div className="flex sm:flex-col sm:justify-start sm:items-start xs:flex-row xs:justify-start xs:items-center xs:w-full sm:w-[500px] sm:pr-0 sm:pt-0 xs:mt-5">
            <h1 className="text-secondary-800 opacity-100 sm:text-[40px] font-bold">
              {data?.data?.attributes?.name}
            </h1>

            <div className="my-[5px] sm:mx-0 xs:mx-2"></div>

            <span className="flex flex-row justify-start items-center">
              <h2 className="price sm:font-medium sm:text-[30px] sm:tracking-wider text-xl">
                {data?.data?.attributes?.price ? (
                  <>AED {data?.data?.attributes?.price}</>
                ) : (
                  <>{t("price_after_confirmation")}</>
                )}
              </h2>

              <ShareButton />
            </span>
          </div>

          <FabricBuyOptions
            description={truncate(data?.data?.attributes?.description || "", 150)}
            id={data?.data?.id}
            patterns={data?.data?.attributes?.fabric_pattern}
          />
          <div className="my-[12px] w-full">
            {data?.data?.attributes?.fabric_pattern?.map((item: any, idx: number) => {
              return (
                <FabricPatternItemComponent
                  title={item.title}
                  categoryName={data?.data?.attributes?.category}
                  image={item?.image?.data?.attributes?.url}
                  key={idx}
                />
              );
            })}

            {data?.data?.attributes?.detail_list_item?.length > 0 && (
              <>
                <h2 className="product-description m-0 p-0 text-secondary-800 text-[24px] font-bold mt-3">
                  {t("product_description")}
                </h2>

                <ul>
                  {data?.data?.attributes?.detail_list_item?.map(
                    (item: any, index: number) => {
                      return (
                        <li
                          key={index}
                          className="text-white font-[16px] max-w-[1054px] flex flex-row my-4 items-start justify-start"
                        >
                          <span className="bg-white rounded-full p-1 text-secondary mr-3">
                            {<IconCheck size={12} />}
                          </span>
                          <span className="text-white text-[16px]">{item.title}</span>
                        </li>
                      );
                    }
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
      <div className="my-2"></div>

      {data?.data?.attributes?.detail_list_item?.length ? (
        <RatingsSection
          description={data?.data?.attributes?.description}
          highlights={data?.data?.attributes?.detail_list_item?.map(
            (item: any) => item?.title
          )}
        />
      ) : (
        <></>
      )}
      <section className="w-full">
        <HomeFabricCarousel
          description={t("related_products_description")}
          title={t("related_products_l")}
          coloredTitle={t("related_products_t")}
          px="xs:px-0"
          maxW="max-w-[100%]"
          align="proper"
          items={relatedData?.data?.map((item: any) => {
            return {
              title: item.attributes.name,
              image: item.attributes.main_image?.data?.attributes?.url || "",
              price: item.attributes.price,
              rating: item.attributes.rating || 0,
              id: item.id,
            };
          })}
        />
      </section>
    </main>
  );
};

export default FabricPage;
