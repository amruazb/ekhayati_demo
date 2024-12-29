import { AppBreadCrumbs } from "@/components/breadcurms";
import { getDesignData } from "@/provider";
import { Button } from "@nextui-org/react";
import { getLocale } from "next-intl/server";
import DesignBuyOptions from "@/components/shop/DesignBuyOptions";
import { ProductImageSwiperList } from "@/components/shop/ProductImageSwiperList";
import { IconHeart, IconShare } from "@tabler/icons-react";

const getData = async (props: any) => {
  const productID = props.params.id;
  const token = "";

  const { data, error } = await getDesignData(token, {
    path: { id: productID },
  });

  return { data };
};

const MekhwarPage = async (props: any) => {
  const { data }: any = await getData(props);
  const locale = await getLocale();
  const breadCrumbs = [
    {
      label: "Shop",
      href: `/${locale}`,
    },
    {
      label: "Designs",
      href: `/${locale}/shop/designs`,
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
        {data?.data?.attributes?.image?.data?.attributes?.url && (
          <ProductImageSwiperList
            images={[data?.data?.attributes?.image?.data?.attributes?.url]}
          />
        )}

        <div className="flex flex-col justify-start items-start xs:w-full sm:w-[500px] sm:p-10 pr-0 pt-0 xs:mt-5">
          <h4 className="text-caption sm:text-[15px]">
            {data?.data?.attributes?.tailor?.data?.attributes?.name}
          </h4>

          <div className="my-[5px]"></div>

          <h1 className="text-secondary-800 opacity-100 sm:text-[40px] font-bold">
            {data?.data?.attributes?.name}
          </h1>

          <div className="my-[5px]"></div>

          <span className="flex flex-row justify-start items-center">
            <h2 className="price sm:font-medium sm:text-[30px] sm:tracking-wider">
              AED {data?.data?.attributes?.price}
            </h2>
            {/* <h3 className="old_price text-caption line-through sm:text-[18px] sm:tracking-wider ml-3">AED {data?.data?.attributes?.price}</h3> */}
          </span>

          <div className="my-[10px]"></div>

          <div className="xs:flex xs:flex-row-reverse xs:justify-between xs:items-center xs:w-full">
            {/* <span className="xs:block sm:flex flex-row justify-start items-center">
              <ProductDetailRating value={data?.data?.attributes?.rating || 0} />
            </span> */}

            <div className="xs:hidden my-[8px]"></div>

            <div className="button-list flex flex-row justify-start items-center">
              <Button
                startContent={<IconHeart size={20} />}
                color="secondary"
                className="bg-orange-900 min-w-0 min-h-0 h-auto px-[10px] py-[7px] rounded-[10px] text-[16px] font-medium text-secondary"
              >
                192
              </Button>
              <Button
                className="bg-primary-700 mx-4 text-orange-900 font-bold min-w-0 min-h-0 h-auto p-[7px] py-[8px] rounded-[10px]"
                isIconOnly
              >
                <IconShare className="w-auto min-w-0" size={18} />
              </Button>
            </div>
          </div>

          <div className="my-[10px]"></div>

          <DesignBuyOptions
            description={data?.data?.attributes?.description}
            sizes={data?.data?.attributes?.size}
            id={data?.data?.id}
            query={props.searchParams}
            tailorId={data?.data?.attributes?.tailor?.data?.id}
          />
        </div>
      </section>
    </main>
  );
};

export default MekhwarPage;
