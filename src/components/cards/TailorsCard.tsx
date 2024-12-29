'use client'
import CardContainer from "@/abstract/CardContainer";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "..";
import { truncate } from "@/utils";
import { Rating } from 'react-simple-star-rating'
import { IconChevronDown } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

interface TailorCardProps {
  image: string;
  name: string;
  description?: string;
  rating?: number;
  id?: number;
  availability?: string;
  orders?: number;
  customJourney?: boolean;
  query?: any;
  params?: any;
}

export const TailorCard = ({ image, name, description, rating, id, availability, orders, customJourney, query, params }: TailorCardProps) => {

  const router = useRouter();
  const t = useTranslations("shop");

  const onTailorClick = () => {
    if (customJourney) {
      router.push({
        pathname: "/custom/journey/[fabricId]/design",
        params: {
          fabricId: params.fabricId,
        },
        query: {
          ...query,
          tailorId: id?.toString() || "",
        },
      })

      return;
    }
    router.prefetch({
      pathname: "/shop/tailors/[tailorId]",
      params: {
        tailorId: id?.toString() || "",
      }
    });

    router.push({
      pathname: "/shop/tailors/[tailorId]",
      params: {
        tailorId: id?.toString() || "",
      }
    })
  }

  return (
    <CardContainer scissors={false}>
      <article onClick={onTailorClick} className="cursor-pointer grid-col-1 min-h-[230px] h-auto md:px-7 md:py-6 xs:px-2 xs:py-2 flex flex-row items-center justify-start">

        <Image priority={true} unoptimized src={image} width={200} height={185}  className="xs:min-h-[200px] xs:min-w-[162px] md:max-h-[184px] md:min-h-[184px] md:min-w-[202px]" alt="" style={{ objectFit: "cover", height: "100%", borderRadius: 12 }} />

        <div className="details flex flex-col mx-4 justify-center items-start">
          <h1 className="w-full break-word xs:text-[12px] md:text-[15px] font-medium font-roboto text-secondary inline-block w-[330.96px]">{name}</h1>

          <div className="xs:my-1 my-2"></div>

          <div className="flex flex-row items-center flex-wrap xs:w-[55%]">
          <Rating allowHover={false} emptyStyle={{display: "flex"}} size={18} disableFillHover={true} iconsCount={5} />
          {/* <Rating emptyStyle={{display: "flex"}} size={18} disableFillHover={true} iconsCount={5} /> */}
            <p className="text-secondary xs:text-[12px] text-[14px] text-center ml-2 font-roboto">{rating}</p>

            <div className="md:hidden basis-full my-1"></div>

            <span className="flex justify-center items-center mx-2 xs:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" fill="none">
                <ellipse cx="4.17334" cy="3" rx="3.28272" ry="3" fill="#DEE2E7" />
              </svg>
            </span>

            {/* <p className="text-caption xs:text-[12px]">{orders || 0} {t("orders")}</p>

            <span className="flex justify-center items-center mx-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" fill="none">
                <ellipse cx="4.17334" cy="3" rx="3.28272" ry="3" fill="#DEE2E7" />
              </svg>
            </span>

            <p className="text-white xs:text-[12px] text-[16px]">{availability}</p> */}
          </div>

          <div className="xs:my-1 my-2"></div>

          <p className="text-white xs:text-[12px] text-[16px] xs:hidden block word-break line-break">{truncate(description || "", 100)}</p>
          <p className="text-white xs:text-[12px] text-[16px] xs:block hidden line-clamp-2">{truncate(description || "", 75)}</p>

          <div className="xs:my-1 my-2"></div>
          {/* <Button onClick={() => setCreateSizeProfileDialogOpen(true)} className="">Add New <IconPlus size={18} /></Button> */}
          <Button onClick={onTailorClick} className="bg-secondary-800 rounded-md text-primary-900">{t("view_designs")} <span className="xs:text-[12px] text-[15px] p-0"><IconChevronDown /></span> </Button>
        </div>
      </article>
    </CardContainer>
  )
}

export default TailorCard;