"use client";
import { ThemeInput } from "@/components/input/theme-input";
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Slider,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { usePathname, getPathname } from "@/utils/navigation";
import qs from "qs";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { IconChevronDown, IconChevronLeft, IconFilter } from "@tabler/icons-react";

export interface ShopFilterProps {
  categories?: {
    id: number;
    name: string;
  }[];
}

const ShopFilter = ({ categories }: ShopFilterProps) => {
  const [filterCount, setFilterCount] = useState(0);
  const [priceRange, setPriceRange] = useState<any>([0, 10000]);
  const [collapsed, setCollapsed] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const params = useSearchParams();
  const p = useParams();
  const controls = useAnimationControls();
  const router = useRouter();
  const pathName = usePathname();
  const locale = useLocale();

  const t = useTranslations("shop");

  const handleFilterCountChange = () => {
    let count = 0;
    if (selectedCategories.length > 0) count = selectedCategories.length;
    if (priceRange[0] !== 0) count = count + 1;
    if (priceRange[1] !== 10000) count = count + 1;
    setFilterCount(count);
  };

  const handleCollapse = () => {
    if (collapsed) controls.start({ height: "auto" });
    if (!collapsed) controls.start({ height: 0 });
    setCollapsed(!collapsed);
  };

  useEffect(handleFilterCountChange, [priceRange, selectedCategories]);

  const handleBack = () => {
    router.back();
  };

  const handleInitSelectedCats = () => {
    if (window !== undefined) {
      const loc = window?.location.search;
      const st = loc.slice(1, loc.length);
      const parsed: any = qs.parse(st);
      parsed?.filters?.$and.forEach((f: any) => {
        if (f?.category) {
          const a = [];
          for (const key in f.category?.id?.["$in"]) {
            a.push(f?.category?.id?.["$in"][key]);
          }
          setSelectedCategories(a);
        }

        if (f?.price) {
          setPriceRange(f?.price?.["$between"]);
          handleRangeChange(f?.price?.["$between"]);
        }
      });
    }
  };

  useEffect(() => {
    handleInitSelectedCats();
    //@ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName?.length]);

  const handleCategoryChange = (e: any) => {
    const newArr = e.map((element: string) => +element);
    const queryString = params.toString();
    const parsedQuery: any = qs.parse(queryString);
    setSelectedCategories(e);

    //if parsed query does not include filter then add it
    if (!parsedQuery["filters"]) parsedQuery.filters = {};
    //if parsed query filter does ont have $and param then add it
    if (!parsedQuery?.["filters"]?.["$and"]) parsedQuery.filters["$and"] = [];
    //remove categories from filter.and array
    parsedQuery["filters"]["$and"] = parsedQuery?.["filters"]?.["$and"]?.filter(
      (item: any) => !item["category"]
    );
    //if parsed query filter does not include category then add it
    parsedQuery["filters"]["$and"].push({ category: { id: { $in: newArr } } });

    //@ts-ignore
    router.replace(
      `/${locale}/shop?${qs.stringify(parsedQuery, {
        encodeValuesOnly: true,
      })}`,
      {
        scroll: false,
      }
    );
  };

  const handleTypeChange = (e: any) => {
    const newArr = e.map((element: string) => element);
    const queryString = params.toString();
    const parsedQuery: any = qs.parse(queryString);
    setSelectedTypes(e);

    //if parsed query does not include filter then add it
    if (!parsedQuery["filters"]) parsedQuery.filters = {};
    //if parsed query filter does ont have $and param then add it
    if (!parsedQuery?.["filters"]?.["$and"]) parsedQuery.filters["$and"] = [];
    //remove categories from filter.and array
    parsedQuery["filters"]["$and"] = parsedQuery?.["filters"]?.["$and"]?.filter(
      (item: any) => !item["customizable"]
    );
    //if parsed query filter does not include category then add it
    parsedQuery["filters"]["$and"].push({ customizable: { $in: newArr } });

    //@ts-ignore
    router.replace(
      `/${locale}/shop?${qs.stringify(parsedQuery, {
        encodeValuesOnly: true,
      })}`,
      {
        scroll: false,
      }
    );
  };

  const handlePriceInputChange = (initial: boolean, e: number) => {
    const newArr = [...priceRange];
    if (initial) newArr[0] = e;
    if (!initial) newArr[1] = e;
    setPriceRange(newArr);
    handleRangeChange(newArr);
  };

  const handleRangeChange = (e: any) => {
    const newArr = e;
    const queryString = params.toString();
    const parsedQuery: any = qs.parse(queryString);
    setPriceRange(e);

    //if parsed query does not include filter then add it
    if (!parsedQuery["filters"]) parsedQuery.filters = {};
    //if parsed query filter does ont have $and param then add it
    if (!parsedQuery?.["filters"]?.["$and"]) parsedQuery.filters["$and"] = [];
    //remove categories from filter.and array
    parsedQuery["filters"]["$and"] = parsedQuery?.["filters"]?.["$and"]?.filter(
      (item: any) => !item["price"]
    );
    //if parsed query filter does not include category then add it
    parsedQuery["filters"]["$and"].push({ price: { $between: newArr } });

    //@ts-ignore
    router.replace(
      `/${locale}/shop?${qs.stringify(parsedQuery, {
        encodeValuesOnly: true,
      })}`,
      {
        scroll: false,
      }
    );
  };

  return (
    <aside className="xs:bg-primary-700 sm:bg-primary xs:overflow-hidden xs:w-full sm:min-h-screen sm:w-[30%] xl:w-[20%] sm:p-5">
      <div className="controls sm:hidden xs:flex xs:flex-row xs:justify-between xs:p-3 w-full">
        <Button
          isIconOnly
          onClick={handleBack}
          className="bg-transparent text-[20px] border-white border-2"
        >
          <IconChevronLeft />
        </Button>

        <Button className="bg-primary pl-8 pr-4 rounded-md" onClick={handleCollapse}>
          Filters({filterCount}){" "}
          {collapsed ? <IconChevronDown className="ml-4" /> : <IconFilter className="ml-4" />}
        </Button>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={controls}
        className="xs:border-b-2 xs:border-solid xs:border-secondary-800 w-full"
      >
        <Accordion selectionMode="multiple" defaultExpandedKeys={["price", "collection", "type"]}>
          <AccordionItem key="price" aria-label="Price" title={t("price")}>
            <div className="flex flex-col w-full">
              <div className="inputs flex flex-row items-end justify-between w-full">
                <div className="flex flex-col items-start justify-end w-[30%]">
                  <div>
                    <span className="text-neutral-400 text-sm font-normal  leading-normal">
                      {t("from")}
                    </span>
                  </div>
                  <div className="my-1"></div>
                  <ThemeInput
                    type="number"
                    value2={priceRange?.[0] || 0}
                    classNames={{
                      inputWrapper: ["py-0", "h-[35px]", "radius-4"],
                    }}
                    onChange={(e) => handlePriceInputChange(true, e.target.value)}
                    custom={true}
                  />
                </div>

                <div className="w-[15px] h-[19px] mx-2 border-t-1 opacity-30 border-white"></div>

                <div className="flex flex-col items-end justify-end w-[30%]">
                  <div>
                    <span className="text-neutral-400 text-sm font-normal  leading-normal">
                      {t("to")}
                    </span>
                  </div>
                  <div className="my-1"></div>
                  <ThemeInput
                    type="number"
                    value2={priceRange?.[1] || 10000}
                    classNames={{
                      inputWrapper: ["py-0", "h-[35px]", "radius-4"],
                    }}
                    onChange={(e) => handlePriceInputChange(true, e.target.value)}
                    custom={true}
                  />
                </div>
              </div>

              <div className="my-2"></div>

              <div className="w-full box-border px-3">
                <Slider
                  maxValue={10000}
                  aria-label="Price filter slider"
                  defaultValue={priceRange}
                  value={priceRange}
                  onChange={handleRangeChange}
                  formatOptions={{ style: "currency", currency: "AED" }}
                  className=" color-secondary"
                  classNames={{
                    track: ["bg-primary-700", "h-[5px]"],
                    filler: ["bg-secondary"],
                    step: ["w-[12px]", "h-[12px]"],
                    thumb: [
                      "w-[12px]",
                      "h-[12px]",
                      "after:rounded-full",
                      "after:w-[12px]",
                      "after:h-[12px]",
                      "after:bg-secondary",
                    ],
                    startContent: ["h-[12px]", "w-[12px]"],
                  }}
                />
              </div>
            </div>
          </AccordionItem>

          <AccordionItem key="collection" aria-label="Collection" title={t("collection")}>
            <div className="max-h-[350px]">
              <CheckboxGroup
                defaultValue={[]}
                // className="overflow-auto"
                onChange={handleCategoryChange}
                value={selectedCategories}
              >
                {categories &&
                  categories.map((category, index) => {
                    return (
                      <Checkbox
                        key={category?.id}
                        color="secondary"
                        value={category?.id?.toString() || index.toString()}
                        aria-label={category?.name}
                      >
                        {category.name}
                      </Checkbox>
                    );
                  })}
              </CheckboxGroup>
            </div>
          </AccordionItem>

          <AccordionItem key="type" aria-label="type" title={t("type")}>
            <div className="max-h-[350px]">
              <CheckboxGroup
                defaultValue={[]}
                // className="overflow-auto"
                onChange={handleTypeChange}
                value={selectedTypes}
              >
                <Checkbox
                  key={"customizable"}
                  color="secondary"
                  value={"true"}
                  aria-label={"customizable"}
                >
                  {t("customizable")}
                </Checkbox>
                <Checkbox
                  key={"ready_to_ware"}
                  color="secondary"
                  value={"false"}
                  aria-label={"ready_to_ware"}
                >
                  {t("ready_to_ware")}
                </Checkbox>
              </CheckboxGroup>
            </div>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </aside>
  );
};

export default ShopFilter;
