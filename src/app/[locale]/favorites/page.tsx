"use client";

import { SolitaireCardSingle } from "@/components";
import ShopPageHeader from "@/components/shop/shop-page-header";
import { filterMekhwar } from "@/provider";
import { getLocalFavorites } from "@/utils";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const locale = useLocale();

  const loadData = async () => {
    setIsLoading(true);
    const favs: any = getLocalFavorites();
    const { data, error }: any = await filterMekhwar({
      filters: {
        //@ts-ignore
        id: {
          $in: favs,
        },
        //@ts-ignore
        locale,
      },
      populate: "main_image,tailor"
    });
    setItems(data?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="min-h-screen min-w-screen w-full flex flex-col items-start justify-start overflow-hidden m-0 p-5">
      <ShopPageHeader title="" coloredTitle="Favorites" description="" />

      <div className="grid xs:grid-cols-auto-fill-100 sm:grid-cols-auto-fit-100 gap-4 items-center justify-items-center w-full">
        {items?.map((item) => ( 
          <article
            key={item.id}
            className="w-full xs:max-w-[180px] sm:max-w-[250px]"
          >
            <SolitaireCardSingle
              autWidth={true}
              title={item?.attributes?.title}
              id={item?.id}
              image={item?.attributes?.main_image?.data?.attributes?.url}
              price={item?.attributes?.price}
              tailorName={item?.attributes?.tailor?.data?.attributes?.name}
              rating={item?.rating}
              customizable={item?.attributes?.customizable}
            />
          </article>
        ))}
      </div>
    </main>
  );
}
