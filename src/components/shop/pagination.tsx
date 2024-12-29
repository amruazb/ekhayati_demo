/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Pagination } from "@nextui-org/react";
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import qs from "qs";
import { useLocale } from "next-intl";

const ShopPagination = (props: any) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchparams = useSearchParams();
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const handlePageChange = (page: number) => {
    if (window !== undefined) {
      let s = window?.location.search;
      if (s?.length) s = s.slice(1, s.length);
      const parsed: any = qs.parse(s);
      if (!parsed?.pagination) parsed.pagination = {};
      parsed.pagination.page = page;
      router.push(
        `${pathName}?${qs.stringify(parsed, { encodeValuesOnly: true })}`,
        { scroll: true }
      );
    }
  };

  useEffect(() => {
    if (props?.data?.pageCount) {
      setPageCount(props.data.pageCount);
      setPage(props.data.page);
    }

    if (window !== undefined) {
      let s = window?.location.search;
      if (s?.length) s = s.slice(1, s.length);
      const parsed: any = qs.parse(s);
      if (parsed?.pagination?.page) {
        setPage(+parsed.pagination.page);
      }
    }
  }, [props?.data?.pageCount, props?.data?.page, searchparams.getAll("filter")]);

  return (
    <>
      {pageCount > 0 && (
        <Pagination
          classNames={{
            item: ["bg-primary-700"],
            cursor: ["bg-secondary"],
          }}
          total={pageCount}
          page={page}
          initialPage={page}
          onChange={handlePageChange}
          hidden={pageCount < 1 || page < 1}
        />
      )}
    </>
  );
};

export default ShopPagination;
