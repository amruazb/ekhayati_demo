"use client";
// import { useRouter } from "@/utils";
import { Input } from "@nextui-org/react";
import { IconSearch } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "qs";
import { useState } from "react";

export default function SearchBarMobile(props: any) {
  const [ searchValue, setSearchValue ] = useState<string>("");

  const t = useTranslations("navigation");
  const router = useRouter();
  const locale = useLocale();
  const params = useSearchParams();


  const handleRangeChange = (e: any) => {
    setSearchValue(e.target.value);
    const newArr = e.target.value;
    const queryString = params.toString();
    const parsedQuery: any = qs.parse(queryString);

    // return;

    //if parsed query does not include filter then add it
    if (!parsedQuery["filters"]) parsedQuery.filters = {};
    //if parsed query filter does ont have $and param then add it
    if (!parsedQuery?.["filters"]?.["$and"]) parsedQuery.filters["$and"] = [];
    //remove categories from filter.and array
    parsedQuery["filters"]["$and"] = parsedQuery?.["filters"]?.["$and"]?.filter(
      (item: any) => !item["title"]
    );
    //if parsed query filter does not include category then add it
    parsedQuery["filters"]["$and"].push({ title: { $containsi: newArr } });


    // router.push(
    //   {
    //     pathname: "/shop",
    //     query: {
    //       filter:  qs.stringify(parsedQuery, {
    //         encodeValuesOnly: false,
    //       }),
    //     }
    //   },
    //   {
    //     scroll: true
    //   },
    // );

    router.push(
      `/${locale}/shop?${qs.stringify(parsedQuery, {
        encodeValuesOnly: true,
      })}`
    );
  };

  return (
    <Input
      isClearable
      radius="sm"
      aria-label="Search"
      size="sm"
      width="100%"
      // height={40}
      // color="primary"
      classNames={{
        mainWrapper: ["w-full h-[35px] text-[16px]"],
        label: "text-black/50 dark:text-white/90",
        input: ["bg-transparent"],
        innerWrapper: "bg-transparent",
        inputWrapper: ["bg-white/5"],
      }}
      onChange={handleRangeChange}
      placeholder={t("type_to_search")}
      onClear={() => {
        setSearchValue("");
        router.push(`/${locale}/shop`);
      }}
      value={searchValue}
      startContent={
        <IconSearch className="text-white/50 mb-0.5 text-slate-400 pointer-events-none flex-shrink-0 mr-3" />
      }
    />
  );
}
