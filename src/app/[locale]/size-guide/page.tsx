"use client";
import ShopPageHeader from "@/components/shop/shop-page-header";
import { useRouter } from "@/utils";
import { Button } from "@nextui-org/react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function SizeGuide() {
  const router = useRouter();
  const t = useTranslations("size_guide");
  const locale = useLocale();

  const handleBack = () => router.back();

  return (
    <main className="min-h-screen min-w-screen w-full flex flex-col items-start justify-start overflow-hidden m-0 p-5 md:pt-10">
      <header
        style={{ boxSizing: "border-box" }}
        className="xs:mb-2 sm:mb-12 flex min-h-[50px] justify-start items-start xs:w-full"
      >
        <div className="flex items-center justify-center h-[60px] px-3">
          <Button
            onClick={handleBack}
            isIconOnly
            size="sm"
            className="bg-transparent text-[20px] w-[10px] p-x-0 rounded-md border-white border-2"
          >
            <IconChevronLeft />
          </Button>
        </div>
        <div className="xs:w-full">
          <h1 className="text-white xs:text-[30px] text-5xl font-black xs:w-full xs:text-center">
            <span className="text-secondary">{t("page_title_l")}</span> {t("page_title_t")}
          </h1>
        </div>
      </header>

      <section className="w-full max-w-main flex flex-col lg:flex-row justify-center items-start overflow-auto relative bg-primary m-0 pt-10 xs:pt-[70px]">
        <article className="flex flex-col items-start lg:w-[50%] lg:max-w-[500px] w-full">
          <p className="text-caption mb-10 lg:text-start text-center">
            {t("page_description_1")}
            <br /> <br />
            {t("page_description_2")}
            <br /> {t("page_description_3")}
          </p>

          <div className="table-containers w-full flex flex-col lg:flex-row justify-center items-center lg:justify-start lg:items-start">
            <table className="border-separate w-full lg:w-auto">
              <thead className="bg-primary-700">
                <tr className="">
                  <th className="text-secondary text-[14px] text-left p-4 py-5 font-normal lg:rounded-tl-lg min-w-[56px]">
                    {t("height")}
                  </th>
                  <th className="text-secondary text-[14px] text-left p-5 font-normal">
                    {t("chest_point")}
                  </th>
                  <th className="lg:table-cell text-secondary text-[14px] text-left p-5 font-normal">
                    {t("cup_size")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-primary-700">
                <tr>
                  <td className="text-secondary text-[14px] text-left p-5 font-normal">
                    <div className="flex items-center justify-between">
                      <span>52</span>
                      <span>{t("inch")}</span>
                    </div>
                  </td>
                  <td className="text-secondary text-[14px] text-left p-5 font-normal">
                    <div className="flex items-center justify-between">
                      <span>18</span>
                      <span>{t("inch")}</span>
                    </div>
                  </td>
                  <td className="table-cell text-secondary text-[14px] text-left p-5 font-normal">
                    AA - A
                  </td>
                </tr>
                <tr>
                  <td className="text-secondary text-[14px] text-left p-5 font-normal">
                    <div className="flex items-center justify-between">
                      <span>54</span>
                      <span>{t("inch")}</span>
                    </div>
                  </td>
                  <td className="text-secondary text-[14px] text-left p-5 font-normal">
                    <div className="flex items-center justify-between">
                      <span>20</span>
                      <span>{t("inch")}</span>
                    </div>
                  </td>
                  <td className="table-cell text-secondary text-[14px] text-left p-5 font-normal">
                    B
                  </td>
                </tr>
                <tr>
                  <td className="text-secondary text-[14px] text-left p-5 font-normal">
                    <div className="flex items-center justify-between">
                      <span>56</span>
                      <span>{t("inch")}</span>
                    </div>
                  </td>
                  <td className="text-secondary text-[14px] text-left p-5 font-normal">
                    <div className="flex items-center justify-between">
                      <span>22</span>
                      <span>{t("inch")}</span>
                    </div>
                  </td>
                  <td className="table-cell text-secondary text-[14px] text-left p-5 font-normal">
                    C
                  </td>
                </tr>
                <tr>
                  <td className="text-secondary text-[14px] text-left p-5 font-normal">
                    <div className="flex items-center justify-between">
                      <span>58</span>
                      <span>{t("inch")}</span>
                    </div>
                  </td>
                  <td className="text-secondary text-[14px] text-left p-5 font-normal">
                    <div className="flex items-center justify-between">
                      <span>24</span>
                      <span>{t("inch")}</span>
                    </div>
                  </td>
                  <td className="table-cell text-secondary text-[14px] text-left p-5 font-normal">
                    D - DD -DDD
                  </td>
                </tr>
                <tr>
                  <td className="text-secondary text-[14px] text-left p-5 font-normal">
                    <div className="flex items-center justify-between">
                      <span>60</span>
                      <span>{t("inch")}</span>
                    </div>
                  </td>
                  <td className="text-secondary text-[14px] text-left p-5 font-normal">
                    <div className="flex items-center justify-between">
                      <span>26</span>
                      <span>{t("inch")}</span>
                    </div>
                  </td>
                  <td className="table-cell text-secondary text-[14px] text-left p-5 font-normal">
                    G - H
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full flex flex-col justify-start mt-5 lg:items-start items-center">
            <h3 className="font-medium text-secondary lg:text-start text-lg">
              {t("chest_point")}:
            </h3>
            <p className="text-caption mb-10 lg:text-start text-center lg:max-w-[60%]">
              {t("chest_point_description")}
            </p>
          </div>
          <div className="w-full flex flex-col justify-start mt-5 lg:items-start items-center">
            <h3 className="font-medium text-secondary lg:text-start text-lg">{t("bust")}:</h3>
            <p className="text-caption mb-10 lg:text-start text-center lg:max-w-[60%]">
              {t("bust_description")}
            </p>
          </div>
        </article>

        <div className="lg:w-[40%] w-full mt-5 lg:mt-0">
          <Image
            src={`/assets/images/size-guide-${locale}.png`}
            unoptimized
            // property={"high"}
            alt=""
            width="0"
            height="0"
            // sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "600px",
              objectFit: "contain",
            }}
          />
        </div>
      </section>
    </main>
  );
}
