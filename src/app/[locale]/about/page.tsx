import CardContainer from "@/abstract/CardContainer";
import ShopPageHeader from "@/components/shop/shop-page-header";
import { getAboutUs } from "@/provider";
import { Link } from "@/utils";
import { IconLink } from "@tabler/icons-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

const getData = async () => {
  const locale = await getLocale();
  const { data } = await getAboutUs(locale);
  return data;
};

export default async function AboutUsPage(props: any) {
  const data = await getData();
  const t = await getTranslations("about");
  const locale = await getLocale();

  return (
    <main className="w-full px-5 py-10 min-h-dvh flex flex-col justify-start items-center">
      <section className="w-full max-w-main flex items-start justify-start mb-5">
        <ShopPageHeader title="About" coloredTitle="Us" description="" />
      </section>
      <section className="max-w-main w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
        <article
          className=""
          dangerouslySetInnerHTML={{
            __html: data?.data?.attributes?.about || "About Us",
          }}
        />
        <article className="flex flex-row flex-wrap">
          <div className="w-[50%] p-2">
            <CardContainer scissors={false} extraClasses="px-3 py-3" noPadding>
              <Image
                unoptimized
                src={
                  data?.data?.attributes?.show_case_1?.data?.attributes?.url ||
                  ""
                }
                alt={
                  data?.data?.attributes?.show_case_1?.data?.attributes?.name ||
                  ""
                }
                width={"0"}
                height={"0"}
                sizes="1vh"
                className="w-full h-full object-cover rounded-sm"
              />
            </CardContainer>
          </div>
          <div className="w-[50%] p-2">
            <CardContainer scissors={false} extraClasses="px-3 py-3" noPadding>
              <Image
                unoptimized
                src={
                  data?.data?.attributes?.show_case_2?.data?.attributes?.url ||
                  ""
                }
                alt={
                  data?.data?.attributes?.show_case_2?.data?.attributes?.name ||
                  ""
                }
                width={"0"}
                height={"0"}
                sizes="1vh"
                className="w-full h-full object-cover rounded-sm"
              />
            </CardContainer>
          </div>

          <div className="w-full h-[50%] p-2">
            <CardContainer scissors={false} extraClasses="px-3 py-3" noPadding>
              <Image
                unoptimized
                src={
                  data?.data?.attributes?.show_case_3?.data?.attributes?.url ||
                  ""
                }
                alt={
                  data?.data?.attributes?.show_case_3?.data?.attributes?.name ||
                  ""
                }
                width={"0"}
                height={"0"}
                sizes="1vh"
                className="w-full h-full object-cover rounded-sm"
              />
            </CardContainer>
          </div>
        </article>
      </section>

      <section
        id="howItWorksSection"
        className="w-full max-w-main flex flex-col justify-center items-center"
      >
        <h1 className="text-secondary-800 text-4xl text-center w-full font-bold my-12">
          {data?.data?.attributes?.how_it_works?.title}
        </h1>
        <div className="steps grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full justify-items-center content-center">
          {data?.data?.attributes?.how_it_works?.step?.map(
            (step, index: number) => {
              return (
                <div
                  key={`step-${index}`}
                  className="step w-full flex flex-col items-center justify-start"
                >
                  <div className="text-white text-xl bg-primary-800 w-14 h-14 flex justify-center items-center rounded-full">
                    {step.number}
                  </div>

                  <h1 className="text-secondary-800 text-2xl text-center w-full font-bold mt-4">
                    {step.title}
                  </h1>

                  <p className="text-caption text-center xs:w-full px-2 w-[80%] break-words mt-4">
                    {step.description}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </section>
      <section
        id="linkBox"
        className="w-full flex flex-row justify-center items-center mt-12"
      >
        {/**@ts-ignore */}
        <Link
          href={{
            //@ts-ignore
            pathname: data?.data?.attributes?.purchase_policy_url || "",
          }}
          className="text-white font-bold text-2xl flex flex-row justify-center items-center hover:text-secondary"
        >
          <IconLink className="mr-2" /> {t("our_purchase_policy")}
        </Link>
      </section>
    </main>
  );
}
