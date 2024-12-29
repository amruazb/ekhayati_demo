'use client'
import DesignCard, { DesignCardSkeleton } from "@/components/cards/DesignCard"
import { useEffect, useState } from "react";
import { getDesignListing, getTailorMekhwarListing } from "@/provider";
import { Pagination } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";

export interface TailorDesignsListProps {
  tailorId: number;
}

export const TailorDesignsList = (props: TailorDesignsListProps) => {

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const locale = useLocale();

  const t = useTranslations("shop")

  useEffect(() => {
    if (window && !loading) loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);


  const loadData = async () => {
    const filters: any = {};
    filters["tailor"] = {};
    filters["tailor"]["id"] = props.tailorId;

    setData([]);
    setLoading(true);
    const { data, error } = await getTailorMekhwarListing("", {
      filters,
      "pagination[pageSize]": 4,
      "pagination[page]": page,
      populate: "main_image",
      locale,
    });
    setLoading(false);

    setData(data?.data || []);
    setPage(data?.meta?.pagination?.page || 0);
    setPageCount(Math.ceil((data?.meta?.pagination?.total || 0) / 4));
  }

  return (
    <section id="ProductDetails" className="max-w-main w-full xs:py-1 sm:py-12 px-6 xs:px-3 flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold xs:w-[80%] xs:text-center text-start">{t("tailors_design_showcase_l")} <span className="text-secondary">{t("tailors_design_showcase_t")}</span></h1>
      <h3 className="text-md text-white mt-4 mb-12 text-center">{t("tailors_design_showcase_description")}</h3>
      <div className="tailor-details w-full grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-center items-start gap-5">
        {
          data?.map((design: any, index: number) => (
            <DesignCard
              key={index}
              title={design?.attributes?.title}
              image={design?.attributes?.main_image?.data?.attributes?.url}
              createdDate={design?.attributes?.createdAt}
              id={design?.id}
              price={design?.attributes?.price}
              description={design?.attributes?.description}
              customizable={design?.attributes?.customizable}
            />
          ))
        }
        {
          loading && [1, 2, 3, 4].map((i) => <DesignCardSkeleton key={i} />)
        }
        {
          data?.length === 0 && !loading && <p className="text-white italic text-l text-center w-full col-span-5">{t("no_designs_found")}</p>
        }


      </div>

      {
        pageCount > 1 && <div className="mt-8 w-full flex justify-center items-center">
        <Pagination
          classNames={{
            item: ["bg-primary-700"],
            cursor: ["bg-secondary", page.toString(), pageCount.toString()]
          }}
          total={pageCount}
          page={page}
          onChange={setPage}
        />
      </div>
      }

    </section>
  )
}