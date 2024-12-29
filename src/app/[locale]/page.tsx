import Solitaire from '@/components/sliders/Solitaire'
import TextCard from "@/components/cards/TextCard";
import FabricCard from '@/components/cards/FabricCard';
import FabricCardHomePage from '@/components/cards/FabricCardHomePage';
import SmallTextCard from '@/components/cards/SmallTextCard';
import SolitaireCardSingle from '@/components/cards/SolitaireCardSingle';
import HomeProductCarousel from '@/components/sections/home-product-carousel';
import HomeFabricCarousel from '@/components/sections/home-fabric-carousel';
import HomeBannerSlider from '@/components/sections/home-banner-slider';
import { getFabricListing, getHomeData, getProductListing, getTailorListing } from '@/provider';
import { getLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import HomeTailorsCarousel from '@/components/sections/home-tailor-carousel';

export const metadata: Metadata = {
  title: "E-Khayati | Home",
  description: "E-Khayati Home Page",
}


const getData = async () => {
  const locale = await getLocale();
  const publicToken = "";
  const { data: productData, error: productError } = await getProductListing(publicToken, {
    "pagination[pageSize]": 10,
    locale: locale ?? "en",
    populate: "main_image, tailor",
  });
  const { data: fabricData, error: fabricError } = await getFabricListing(publicToken, {
    "pagination[pageSize]": 10,
    "pagination[page]": 1,
    locale: locale ?? "en",
    populate: "main_image",
  });

  const { data: tailorsData, error: tailorError } = await getTailorListing(publicToken, {
    "pagination[pageSize]": 10,
    "pagination[page]": 1,
    locale: locale ?? "en",
    populate: "image",
    sort: "updatedAt:desc"
  });

  const { data: homeData, error: homeError } = await getHomeData(publicToken, {
    populate: "home_banner,home_banner.image,show_case_mekhwar,show_case_mekhwar.tailor,show_case_mekhwar.main_image,show_case_fabrics,show_case_fabrics.tailor,show_case_fabrics.main_image,textbox,textbox.actions,textbox.background,discount,card_products,card_products.mekhwar,card_products.mekhwar.main_image,card_products.mekhwar.tailor",
    locale: locale ?? "en",
  });
  
  if (productError || fabricError || homeError) {
    
  }

  return { productData, fabricData, homeData, tailorsData };
}

export default async function Home() {

  const {productData, fabricData, homeData, tailorsData} = await getData();
  const tShop = await getTranslations("shop");
  const t = await getTranslations("home");

  return (
    <main className="min-h-screen p-3 min-w-screen w-full flex flex-col items-center justify-start overflow-hidden">
      <div className='w-full max-w-main  xs:py-0 md:px-3 flex flex-wrap justify-between'>
      <div className=" xs:box-border large:hidden">
          <TextCard
            firstWord={homeData?.data?.attributes?.textbox?.first_word}
            title={homeData?.data?.attributes?.textbox?.title}
            description={homeData?.data?.attributes?.textbox?.description}
            actions={homeData?.data?.attributes?.textbox?.actions || []}
            background={homeData?.data?.attributes?.textbox?.background?.data?.attributes?.url}
          />
        </div>

        <div className="max-h-[407px] mt-5 xs:mt-5 small:mt-5 medium:mt-5 xs:box-border xs:h-[auto] sm:p-0 large:w-[78%] lg:max-h-[407px] w-full">
          <HomeBannerSlider item={homeData?.data?.attributes?.home_banner?.map((banner, index) => {
            return {
              image: banner?.image?.data?.attributes?.url,
              title: banner?.title,
              subtitle: banner?.description,
              link: banner?.link || "#" + index,
            }
          })} />
        </div>

        <div className="mt-3 xs:mt-5 xs:hidden small:hidden medium:hidden lg:w-[20%] overflow-visible xs:w-full xs:justify-center xs:items-center">
          <Solitaire 
            items={homeData?.data?.attributes?.card_products?.map((product) => {
              return {
                //@ts-ignore
                image: product?.mekhwar?.data?.attributes?.main_image?.data?.attributes?.url,
                title: product?.mekhwar?.data?.attributes?.title,
                price: product.mekhwar?.data?.attributes?.price,
                rating: product.mekhwar?.data?.attributes?.rating,
                id: product.mekhwar?.data?.id,
                //@ts-ignore
                tailorName: product.mekhwar?.data?.attributes?.tailor?.data?.attributes?.name,
                customizable: product.mekhwar?.data?.attributes?.customizable
              }
            })}
          />
        </div>

        <div className="xs:hidden xs:box-border medium:hidden small:hidden lg:w-[56%] mt-5 xs:mt-8">
          <TextCard
            firstWord={homeData?.data?.attributes?.textbox?.first_word}
            title={homeData?.data?.attributes?.textbox?.title}
            description={homeData?.data?.attributes?.textbox?.description}
            actions={homeData?.data?.attributes?.textbox?.actions || []}
            background={homeData?.data?.attributes?.textbox?.background?.data?.attributes?.url}
          />
        </div>

        

        <div className="p-3 mt-7 xs:hidden small:hidden medium:hidden">
          <div className="flex flex-col items-center justify-center">
            <FabricCard
              name={homeData?.data?.attributes?.show_case_fabrics?.data?.[0]?.attributes?.name}
              price={homeData?.data?.attributes?.show_case_fabrics?.data?.[0]?.attributes?.price}
              //@ts-ignore
              image={homeData?.data?.attributes?.show_case_fabrics?.data?.[0]?.attributes?.main_image?.data?.attributes?.url}
              tailorName={""}
              id={homeData?.data?.attributes?.show_case_fabrics?.data?.[0]?.id}
            />
            <div className="xs:mt-6 sm:mt-8"></div>
            <FabricCard
              name={homeData?.data?.attributes?.show_case_fabrics?.data?.[1]?.attributes?.name}
              price={homeData?.data?.attributes?.show_case_fabrics?.data?.[1]?.attributes?.price}
              //@ts-ignore
              image={homeData?.data?.attributes?.show_case_fabrics?.data?.[1]?.attributes?.main_image?.data?.attributes?.url}
              tailorName={""}
              id={homeData?.data?.attributes?.show_case_fabrics?.data?.[1]?.id}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="flex flex-col items justify-center">
          <div className="large:mt-5 ">
              <SmallTextCard
                title={homeData?.data?.attributes?.discount?.title}
                description={homeData?.data?.attributes?.discount?.description}
                link={homeData?.data?.attributes?.discount?.link}
              /> 
            </div>
            <div className='mt-5'>
            <SolitaireCardSingle 
              tailorName={homeData?.data?.attributes?.show_case_mekhwar?.data?.attributes?.tailor?.data?.attributes?.name}
              title={homeData?.data?.attributes?.show_case_mekhwar?.data?.attributes?.title}
              price={homeData?.data?.attributes?.show_case_mekhwar?.data?.attributes?.price}
              rating={homeData?.data?.attributes?.show_case_mekhwar?.data?.attributes?.rating}
              image={homeData?.data?.attributes?.show_case_mekhwar?.data?.attributes?.main_image?.data?.attributes?.url}
              id={homeData?.data?.attributes?.show_case_mekhwar?.data?.id}
              customizable={homeData?.data?.attributes?.show_case_mekhwar?.data?.attributes?.customizable}
            />
            </div>
          </div>
        </div>
        <div className="p-5 xs:hidden small:hidden large:hidden lg:w-[20%] overflow-visible xs:w-full xs:justify-center xs:items-center">
          <Solitaire 
            items={homeData?.data?.attributes?.card_products?.map((product) => {
              return {
                //@ts-ignore
                image: product?.mekhwar?.data?.attributes?.main_image?.data?.attributes?.url,
                title: product?.mekhwar?.data?.attributes?.title,
                price: product.mekhwar?.data?.attributes?.price,
                rating: product.mekhwar?.data?.attributes?.rating,
                id: product.mekhwar?.data?.id,
                //@ts-ignore
                tailorName: product.mekhwar?.data?.attributes?.tailor?.data?.attributes?.name,
                customizable: product.mekhwar?.data?.attributes?.customizable
              }
            })}
          />
        </div>
        <div className="mt-5 max-w-[auto] large:hidden">
          <div className="flex flex-col items-center justify-center">
            <FabricCardHomePage
              name={homeData?.data?.attributes?.show_case_fabrics?.data?.[0]?.attributes?.name}
              price={homeData?.data?.attributes?.show_case_fabrics?.data?.[0]?.attributes?.price}
              //@ts-ignore
              image={homeData?.data?.attributes?.show_case_fabrics?.data?.[0]?.attributes?.main_image?.data?.attributes?.url}
              tailorName={""}
              id={homeData?.data?.attributes?.show_case_fabrics?.data?.[0]?.id}
            />
            <div className="mt-5"></div>
            <FabricCardHomePage
              name={homeData?.data?.attributes?.show_case_fabrics?.data?.[1]?.attributes?.name}
              price={homeData?.data?.attributes?.show_case_fabrics?.data?.[1]?.attributes?.price}
              //@ts-ignore
              image={homeData?.data?.attributes?.show_case_fabrics?.data?.[1]?.attributes?.main_image?.data?.attributes?.url}
              tailorName={""}
              id={homeData?.data?.attributes?.show_case_fabrics?.data?.[1]?.id}
            />
          </div>
        </div>
        <div className="p-5 mt-5 medium:hidden large:hidden overflow-visible xs:w-full xs:justify-center xs:items-center small:w-full small:justify-center small:items-center">
          <Solitaire 
            items={homeData?.data?.attributes?.card_products?.map((product) => {
              return {
                //@ts-ignore
                image: product?.mekhwar?.data?.attributes?.main_image?.data?.attributes?.url,
                title: product?.mekhwar?.data?.attributes?.title,
                price: product.mekhwar?.data?.attributes?.price,
                rating: product.mekhwar?.data?.attributes?.rating,
                id: product.mekhwar?.data?.id,
                //@ts-ignore
                tailorName: product.mekhwar?.data?.attributes?.tailor?.data?.attributes?.name,
                customizable: product.mekhwar?.data?.attributes?.customizable
              }
            })}
          />
        </div>
      </div>

      <HomeProductCarousel
        key={"home-fabric-carousel"}
        title={t("browse_mekhwar_l")}
        coloredTitle={t("browse_mekhwar_t")}
        description={t("browse_mekhwar_description")}
        items={productData?.data?.map(prods => {
          return {
            title: prods.attributes?.title,
            price: prods.attributes?.price,
            image: prods.attributes?.main_image?.data?.attributes?.url,
            id: prods.id,
            rating: prods.attributes?.rating,
            tailorName: prods.attributes?.tailor?.data?.attributes?.name,
            customizable: prods.attributes?.customizable,
          }
        })}
      />

      <HomeTailorsCarousel
        title={t("available_tailors_l")}
        coloredTitle={t("available_tailors_t")}
        description={t("available_tailors_description")}
        align='proper'
        items={tailorsData?.data?.map(tailors => {
          return {
            title: tailors.attributes?.name,
            image: tailors.attributes?.image?.data?.attributes?.url,
            id: tailors.id,
            attributes: tailors.attributes,
            description: tailors.attributes?.description,
          }
        })}
      />

      {typeof fabricData?.data?.length === "number" && fabricData?.data?.length > 0 && <HomeFabricCarousel
        title={t("available_fabrics_l")}
        coloredTitle={t("available_fabrics_t")}
        description={t("start_desiging_description")}
        align="proper"
        items={fabricData?.data?.map(fabrics => {
          return {
            title: fabrics.attributes?.name,
            price: fabrics.attributes?.price,
            image: fabrics.attributes?.main_image?.data?.attributes?.url,
            id: fabrics.id,
          }
        })}
      />}
    </main>
  )
}