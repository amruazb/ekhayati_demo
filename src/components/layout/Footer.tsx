import Image from "next/image";
import { Link } from "..";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandX } from "@tabler/icons-react";
import { getFooter } from "@/provider";
import Link2 from "next/link";
import { getLocale } from "next-intl/server";

async function getData(props: any) {
  const locale = await getLocale();

  try {
    const { data, error } = await getFooter(locale);
    
    if (error) throw error;

    return data;
  } catch (err) {
    // return err;
  }
}

export const Footer = async (props: any) => {

  const footerData = await getData(props);
  return (
    <div className="w-full sm:min-h-[450px] xs:min-h-[750px] bg-primary-800 xs:mt-12 gap-[24px] px-[12.4vw] py-[11vh]">
      {/* div with width main */}
      <div className="w-full max-w-main xs:py-0 grid sm:grid-cols-3 sm:gap-5 sm:items-space-between">

        <div className="sm:px-3 space-y-2 flex flex-col justify-between items-start leading-[23.9px] sm:text-start xs:text-center">
          <div className="flex flex-col justify-start sm:items-start xs:items-center">
            <Image 
              priority={true} 
              unoptimized 
              alt="E-Khayati footer logo" 
              width={"0"} 
              height={"0"} 
              sizes="100vw"
              src={footerData?.data?.attributes?.logo?.data?.attributes?.url || ""}
              className="sm:w-[162px] sm:h-[38px] h-auto" />
            <div className="my-5"></div>
            <p className="text-caption">{footerData?.data?.attributes?.tag_line}</p>
          </div>

          <div className="flex flex-row sm:justify-between sm:w-[50%] xs:w-full xs:hidden">
            {footerData?.data?.attributes?.tiktok ? <Link2 href={footerData?.data?.attributes?.tiktok} target="_blank"><IconBrandTiktok /></Link2> : null}
            {footerData?.data?.attributes?.twitter ? <Link2 href={footerData?.data?.attributes?.twitter} target="_blank"><IconBrandX /></Link2> : null}
            {footerData?.data?.attributes?.facebook ? <Link2 href={footerData?.data?.attributes?.facebook} target="_blank"><IconBrandFacebook /></Link2> : null}
            {footerData?.data?.attributes?.instagram ? <Link2 href={footerData?.data?.attributes?.instagram} target="_blank"><IconBrandInstagram /></Link2> : null}
          </div>
        </div>


        {
          footerData?.data?.attributes?.link_section?.map((item, index: number) => (
            <div key={`footer-section-${index}`} className={`${index === 0 ? "sm:pl-20" : "sm:pl-10"} flex flex-col sm:items-start sm:justify-start xs:items-center xs:mt-12`}>
              <h1 className="footer-section-title text-white text-medium text-l">{item.title}</h1>
              {
                item.Links?.map((link, index2: number) => (
                  <Link2 key={`footer-section-${index}-link-${index2}`} href={link?.URL || "#"} className={`text-caption  my-3 ${index2 === 0 ? "h-3" : ""}`}>{link.display_name}</Link2>
                ))
              }
            </div>
          ))
        }


          <div className="flex flex-row justify-between sm:w-[100%] px-5 mt-8 text-[25px] xs:w-full sm:hidden">
          {footerData?.data?.attributes?.tiktok ? <Link2 href={footerData?.data?.attributes?.tiktok} target="_blank"><IconBrandTiktok /></Link2> : null}
            {footerData?.data?.attributes?.twitter ? <Link2 href={footerData?.data?.attributes?.twitter} target="_blank"><IconBrandX /></Link2> : null}
            {footerData?.data?.attributes?.facebook ? <Link2 href={footerData?.data?.attributes?.facebook} target="_blank"><IconBrandFacebook /></Link2> : null}
            {footerData?.data?.attributes?.instagram ? <Link2 href={footerData?.data?.attributes?.instagram} target="_blank"><IconBrandInstagram /></Link2> : null}
          </div>
      </div>
    </div>
  )
}