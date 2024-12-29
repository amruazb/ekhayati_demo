"use client";
import CardContainer from "@/abstract/CardContainer";
import { useRouter } from "@/utils";
import { Button } from "@nextui-org/react";
import { IconChevronLeft, IconX } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export interface SizeGuideModalProps {
  onClose: () => void;
}

export default function SizeGuideModal(props: SizeGuideModalProps) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("size_guide");

  return (
    <CardContainer scissors={false} extraClasses="overflow-auto mt-0">
      <div className="w-full flex justify-center items-center">
        <section className="w-full max-w-main flex flex-col lg:flex-row justify-center items-start overflow-auto relative bg-primary m-0 pt-10 xs:pt-[70px]">
          <Button
            className="bg-transparent rounded-full w-[40px] absolute left-3 top-3 min-w-[40px] h-[40px] bg-primary-700 p-3"
            onClick={() => props.onClose()}
          >
            <IconX className="text-secondary" />
          </Button>
          <article className="flex flex-col items-start lg:w-[50%] lg:max-w-[400px] w-full">
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
      </div>
    </CardContainer>
  );
}
