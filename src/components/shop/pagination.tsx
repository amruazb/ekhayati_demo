/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Pagination } from "@nextui-org/react";
import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import qs from "qs";

const ShopPagination = (props: any) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const handlePageChange = (newPage: number) => {
    if (typeof window !== "undefined") {
      let searchQuery = window.location.search;
      if (searchQuery.length) searchQuery = searchQuery.slice(1);

      const parsed: any = qs.parse(searchQuery);
      if (!parsed.pagination) parsed.pagination = {};
      parsed.pagination.page = newPage;

      router.replace(
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

    if (typeof window !== "undefined") {
      let searchQuery = window.location.search;
      if (searchQuery.length) searchQuery = searchQuery.slice(1);

      const parsed: any = qs.parse(searchQuery);
      const currentPage = Number(parsed?.pagination?.page) || 1; 
      setPage(currentPage);
    }
  }, [props?.data?.pageCount, props?.data?.page, searchParams.getAll("filter")]);

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
          hidden={pageCount < 1 || page === 0}
        />
      )}
    </>
  );
};

export default ShopPagination;
