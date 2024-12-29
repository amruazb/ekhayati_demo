import { AppBreadCrumbs } from "@/components/breadcurms";
import {
  getMekhwarByID,
  getMekhwarByMetaID,
  getProductListing,
} from "@/provider";
import { getLocale, getTranslations } from "next-intl/server";
import { ProductImageSwiperList } from "../../../../components/shop/ProductImageSwiperList";
import { ProductDetailRating } from "../../../../components/shop/ProductDetailRating";
import { MekhwarBuyOptions } from "../../../../components/shop/MekhwarBuyOptions";
import { Metadata } from "next";
import HomeProductCarousel from "@/components/sections/home-product-carousel";
import { FavoriteButtonSmall } from "@/components/buttons/FavouriteButtonSmall";
import { ShareButton } from "@/components/buttons/ShareButton";
import RatingsSection from "@/components/shop/rating";
import MekhwarFabricComponent from "./Components/MekhwarFabricComponent";

export async function generateMetadata(props: any): Promise<Metadata> {
  const productID = props.params.id;
  const locale = await getLocale();
  const { data, error }: any = await getMekhwarByMetaID("", productID);

  return {
    //@ts-ignore
    title: data?.data?.attributes?.title,
    //@ts-ignore
    description: data?.data?.attributes?.description,
    openGraph: {
      url: `https://www.e-khayati.ae/${locale}/shop/${productID}`,
      title: data?.data?.attributes?.title,
      description: data?.data?.attributes?.description,
      type: "website",
      locale: locale,
      siteName: "E-Khayati",
      images: {
        url: data?.data?.attributes?.main_image?.data?.attributes?.url,
      },
    },
    twitter: {
      title: data?.data?.attributes?.title,
      description: data?.data?.attributes?.description,
      images: {
        url: data?.data?.attributes?.main_image?.data?.attributes?.url,
      },
      card: "summary",
    },
  };
}

const getData = async (props: any) => {
  const productID = props.params.id;
  const locale = props.params.locale;
  const token = "";

  const { data, error } = await getMekhwarByID(token, productID);

  const filters: any = {
    //@ts-ignore
    category: data?.data?.attributes?.category?.data?.id || 1,
  };
  const { data: relatedData, error: relatedError } = await getProductListing(
    token,
    {
      filters: filters,
      populate: "main_image,category,tailor",
      "pagination[limit]": 10,
      locale: locale,
    }
  );

  return { data, relatedData };
};

const MekhwarPage = async (props: any) => {
  const { data, relatedData }: any = await getData(props);
  const locale = await getLocale();
  const t = await getTranslations("shop");

  const breadCrumbs = [
    {
      label: t("shop"),
      href: `/${locale}`,
    },
    {
      label: t("mekhwar"),
      href: `/${locale}/shop`,
    },
    {
      label: data?.data?.attributes?.title,
    },
  ];
  return (
    <main className="min-h-screen w-full flex justify-center items-center">
      <section className="w-full max-w-main flex flex-col items-start justify-start overflow-hidden xs:py-1 sm:py-12 px-6 xs:px-3">
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

          <div className="flex flex-col justify-start items-start mt-[-40px] xs:w-full w-full sm:p-10 pr-0 pt-0 xs:mt-5">
            <h4 className="text-caption sm:text-[15px]">
              {data?.data?.attributes?.tailor?.data?.attributes?.name}
            </h4>

            <div className="my-[5px]"></div>

            <h1 className="text-secondary-800 opacity-100 sm:text-[40px] font-bold">
              {data?.data?.attributes?.title}
            </h1>

            <div className="my-[5px]"></div>

            <span className="flex flex-row justify-start items-center">
              <h2 className="price sm:font-medium sm:text-[30px] sm:tracking-wider">
                AED {data?.data?.attributes?.price}
              </h2>
            </span>

            <div className="my-[8px]"></div>

            <div className="xs:flex xs:flex-row-reverse xs:justify-between xs:items-center xs:w-full">
              <span className="xs:block sm:flex flex-row justify-start items-center">
                <ProductDetailRating
                  value={data?.data?.attributes?.rating || 0}
                />
              </span>

              <div className="xs:hidden my-[8px]"></div>

              <div className="button-list flex flex-row justify-start items-center">
                <FavoriteButtonSmall id={data?.data?.id} />
                <ShareButton
                  imageUrl={
                    data?.data?.attributes?.images?.data[0]?.attributes?.url
                  }
                  title={data?.data?.attributes?.title}
                />
              </div>

              <MekhwarFabricComponent fabrics={data?.data?.attributes?.fabrics} />
            </div>

            <div className="my-[8px]"></div>

            <MekhwarBuyOptions
              description={data?.data?.attributes?.description}
              sizes={data?.data?.attributes?.size}
              id={data?.data?.id}
              localizations={
                data?.data?.attributes?.localizations?.data?.[0]?.id
              }
              fabric={data?.data?.attributes?.fabrics?.data?.attributes}
              customizable={data?.data?.attributes?.customizable}
            />
          </div>
        </section>

        <RatingsSection
          description={data?.data?.attributes?.description}
          highlights={data?.data?.attributes?.detail_list_item?.map(
            (item: any) => item?.title
          )}
        />

        <section className="w-full">
          <HomeProductCarousel
            description={t("related_products_description")}
            title={t("related_products_l")}
            coloredTitle={t("related_products_t")}
            px="xs:px-0"
            screenFull={true}
            items={relatedData?.data?.map((item: any) => {
              return {
                title: item.attributes.title,
                image: item.attributes.main_image?.data?.attributes?.url || "",
                price: item.attributes.price,
                rating: item.attributes.rating || 0,
                tailorName: item.attributes.tailor?.data?.attributes?.name,
                id: item.id,
              };
            })}
          />
        </section>
      </section>
    </main>
  );
};

export default MekhwarPage;
