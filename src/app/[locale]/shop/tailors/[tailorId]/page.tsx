import { getDesignListing, getTailorByID } from "@/provider";
import { Chip } from "@nextui-org/react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Metadata } from "next";
import { TailorDesignsList } from "./components/TailorDesignsList";

/**
 * Generates metadata for a product based on its ID.
 * @param {Object} props - The properties object.
 * @param {string} props.params.id - The ID of the product.
 * @returns {Promise<Metadata>} - The metadata object.
 */
export async function generateMetadata(props: any): Promise<Metadata> {
  // Extract the product ID from the props object
  const productID = props.params.id;
  
  // Initialize the token variable
  const token = "";
  
  // Fetch the product data from the API using the token and productID
  const { data }: any = await getTailorByID(token, productID);
  
  // Return the metadata object with the title and description properties
  return {
    //@ts-ignore
    title: data?.data?.attributes?.title,
    //@ts-ignore
    description: data?.data?.attributes?.description,
    icons: {
      //@ts-ignore
      shortcut: data?.attributes?.background?.data?.attributes?.url,
      
    },
    //@ts-ignore
    twitter: {
      card: {
        image: data?.data?.attributes?.image?.data?.attributes?.url || ""
      },
      images:data?.data?.attributes?.image?.data?.attributes?.url,
      title: data?.data?.attributes?.title || "",
      description: data?.data?.attributes?.description,
      creator: data?.data?.attributes?.title
    },
    openGraph: {
      //@ts-ignore
      title: data?.data?.attributes?.title,
      description: data?.data?.attributes?.description,
      images: data?.data?.attributes?.image?.data?.attributes?.url,
    }
  };
}

const getData = async (props: any) => {
  const productID = props.params.tailorId;
  const token = "";
  const locale = props.params.locale;

  const { data } = await getTailorByID(token, productID, locale);

  const filters: any = {
    //@ts-ignore
    category: data?.data?.attributes?.category?.data?.id || 1,
  };
  const { data: relatedData } = await getDesignListing(token, {
    filters: filters,
    populate: "main_image,category",
    "pagination[limit]": 10,
  });

  //@ts-ignore
  return { data: data.data, relatedData };
}
const TailorsDetailsPage = async (props: any) => {

  const { data, relatedData }: any = await getData(props);
  const locale = await getLocale();
  const t = await getTranslations("shop");
  const breadCrumbs = [
    {
      label: t("shop"),
      href: `/${locale}`,
    },
    {
      label: t("tailors"),
      href: `/${locale}/tailors`,
    },
    {
      label: data?.attributes?.name,
    }
  ]

  return (
    //xs:py-1 sm:py-12 px-6 xs:px-3
    <main className="min-h-screen min-w-screen w-full flex flex-col items-center justify-start overflow-hidden ">

      <section className="cover-image min-w-screen relative">
        <Image
          className="w-screen xs:max-h-[40vh] sm:max-h-[40vh] md:max-h-[60vh] object-cover"
          src={data?.attributes?.background?.data?.attributes?.url}
          unoptimized
          width={500}
          height={500}
          alt=""
        />

        <div className="sm:block xs:block md:hidden xl:hidden absolute bottom-[-10vh] xs:bottom-[-5vh] xs:left-5 profile-pic col-span-2 items-start">
          <Image
            src={data?.attributes?.image?.data?.attributes?.url}
            unoptimized
            width={168}
            height={168}
            alt="Tailor's image"
            className="rounded-full xs:min-w-[10vh] xs:max-w-[10vh] xs:min-h-[10vh] xs:max-h-[10vh] min-w-[168px] max-w-[168px] sm:h-[168px] object-cover"
          />
        </div>
      </section>

      <div className="xs:my-12 sm:my-10 md:hidden lg:hidden"></div>

      <section id="ProductDetails" className=" max-w-main w-full xs:py-1 sm:py-12 px-6 xs:px-3">
        <div className="tailor-details w-full grid grid-cols-10 justify-center items-start sm:gap-12 xs:gap-y-5">

          <div className="hidden sm:hidden xs:hidden md:block lg:block xl:block profile-pic col-span-2 items-start">
            <Image
              src={data?.attributes?.image?.data?.attributes?.url}
              unoptimized
              width={168}
              height={168}
              alt="Tailor's image"
              className="rounded-[50%] min-w-[168px] max-w-[168px] sm:h-[168px] object-cover"
            />
          </div>

          <div className="details grid-col-5 col-span-6 xs:col-span-10">
            <h1 className="text-secondary font-bold text-4xl">{data?.attributes?.name}</h1>

            <div className="my-6"></div>

            <p className="text-white text-md">{data?.attributes?.description}</p>

            <div className="my-6"></div>

            <div className="chip-container">
              {
                data?.attributes?.tags?.split(",")?.map((tag: string, index: number) => (
                  <Chip className={`${index === 0 ? "mr-2" : "mx-2"} bg-primary-700 text-secondary-800`} key={index}>{tag}</Chip>
                ))
              }
            </div>
          </div>

          <div className="extra-details col-span-2 flex sm:flex-col xs:col-span-10 xs:flex-row xs:justify-between">

            <div className="dest">
              <h3 className="text-xl text-secondary font-bold">{t("location")}</h3>
              <h2 className="text-l text-white font-normal">{data?.attributes?.location}</h2>
            </div>

            <div className="my-6"></div>

            <div className="dest">
              <h3 className="text-xl text-secondary font-bold">{t("date_joined")}</h3>
              <h2 className="text-l text-white font-normal">{data?.attributes?.date_joined}</h2>
            </div>
          </div>
        </div>
      </section>

      <div className="hidden xs:block xs:my-4"></div>

      <TailorDesignsList tailorId={data?.id} />
    </main>
  )
}

export default TailorsDetailsPage;