'use client'
import React from "react";
import { Tabs, Tab, Progress, Button } from "@nextui-org/react";
import { Rating } from "react-simple-star-rating";
import { IconCheck } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
export interface RatingsSectionProps {
  description?: string;
  highlights?: string[];
}

interface IStats {
  averageScore: number;
  reviewsCount: number | null;
}

interface IAuthor {
  username: string;
  email: string;
  id: number;
}

interface IReview {
  id: number;
  createdAt: string;
  comment: string | null;
  author: IAuthor | null;
  score: number;
}

export const RatingsSection = ({ description, highlights }: RatingsSectionProps) => {
  const t = useTranslations("shop")

  return (
    <section className="ratings-by-customers w-full">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        className="w-full"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider xs:justify-center",
          cursor: "w-full bg-secondary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-secondary"

        }}
      >
        <Tab
          key="description"
          title={
            <div className="flex items-center space-x-2">
              <span className="px-10">{t("description")}</span>
            </div>
          }
        >
          <div className="w-full py-6">
            {/* <h2 className="product-description m-0 p-0 text-secondary-800 text-[24px] font-bold">{t("product_description")}</h2>

            <div className="my-6"></div>

            <div className="text-white font-[16px] max-w-[1054px]">{description}</div>

            <div className="my-12"></div> */}

            <h2 className="product-description m-0 p-0 text-secondary-800 text-[24px] font-bold">{t("product_description")}</h2>

            <ul>
              {
                highlights?.map((item, index) => {
                  return (
                    <li key={index} className="text-white font-[16px] max-w-[1054px] flex flex-row my-4 items-start justify-start">
                      <span className="bg-white rounded-full p-1 text-secondary mr-3">{<IconCheck size={12} />}</span>
                      <span className="text-white text-[16px]">{item}</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </Tab>

        <Tab
        className="hidden"
          key="reviews"
          title={
            <div className="flex items-center space-x-2">
              <span className="px-10">{t("reviews")}</span>
            </div>
          }
        >
          <div className="w-full flex flex-col justify-start items-start">
            <div className="w-full py-6 bg-primary-700 rounded-[10px] p-8 sm:py-12 mt-10">
              {/* average rating number */}
              <div className="flex flex-row justify-start items-center">

                <div className="rating-amount flex xs:flex-row sm:flex-col justify-center items-center sm:p-8 xs:w-full sm:w-[25%]">
                  <div className="xs:mr-8">
                    <h4 className="text-white font-bold text-[56px] m-0">4.5</h4>
                    <p className="text-caption font-[16px] mt-2">of 5 {t("reviews")}</p>
                  </div>
                  <Rating emptyStyle={{display: "flex"}} size={18} disableFillHover={true} iconsCount={5} />
                </div>

                <div className=" xs:hidden sm:flex flex-col w-full">

                  <div className="flex flex-row justify-start items-center my-1">
                    <h5 className="text-white text-[18px] font-medium min-w-[146px]">{t("excellent")}</h5>
                    <Progress className="ml-4 text-secondary min-w-[145px] h-[5px]" classNames={{ indicator: ["bg-secondary-800"] }} color="secondary" value={80} maxValue={100} />
                    <span className="text-caption text-[16px] ml-[25px]">100</span>
                  </div>

                  <div className="flex flex-row justify-start items-center my-1">
                    <h5 className="text-white text-[18px] font-medium min-w-[146px]">{t("good")}</h5>
                    <Progress className="ml-4 text-secondary min-w-[145px] h-[5px]" classNames={{ indicator: ["bg-secondary-800"] }} color="secondary" value={80} maxValue={100} />
                    <span className="text-caption text-[16px] ml-[25px]">100</span>
                  </div>
                  <div className="flex flex-row justify-start items-center my-1">
                    <h5 className="text-white text-[18px] font-medium min-w-[146px]">{t("average")}</h5>
                    <Progress className="ml-4 text-secondary min-w-[145px] h-[5px]" classNames={{ indicator: ["bg-secondary-800"] }} color="secondary" value={80} maxValue={100} />
                    <span className="text-caption text-[16px] ml-[25px]">100</span>
                  </div>
                  <div className="flex flex-row justify-start items-center my-1">
                    <h5 className="text-white text-[18px] font-medium min-w-[146px]">{t("bellow_average")}</h5>
                    <Progress className="ml-4 text-secondary min-w-[145px] h-[5px]" classNames={{ indicator: ["bg-secondary-800"] }} color="secondary" value={80} maxValue={100} />
                    <span className="text-caption text-[16px] ml-[25px]">100</span>
                  </div>
                  <div className="flex flex-row justify-start items-center my-1">
                    <h5 className="text-white text-[18px] font-medium min-w-[146px]">{t("poor")}</h5>
                    <Progress className="ml-4 text-secondary min-w-[145px] h-[5px]" classNames={{ indicator: ["bg-secondary-800"] }} color="secondary" value={80} maxValue={100} />
                    <span className="text-caption text-[16px] ml-[25px]">100</span>
                  </div>

                </div>

              </div>

              <div className="xs:hidden w-full mt-2 sm:flex flex-row justify-center items-center">
                <Button
                  className="w-[60%] border-white/50 text-[14px] text-[#BFCCCD] rounded-[7px] py-6 border-1 mt-5"
                  variant="bordered"
                >Leave Comment</Button>
              </div>
            </div>

            <div className=" sm:hidden xs:flex flex-col w-full mt-8">

              <div className="flex flex-row justify-start items-center my-1">
                <h5 className="text-white text-[18px] font-medium min-w-[146px]">{t("excellent")}</h5>
                <Progress className="ml-4 text-secondary min-w-[145px] h-[5px]" classNames={{ indicator: ["bg-secondary-800"] }} color="secondary" value={80} maxValue={100} />
                <span className="text-caption text-[16px] ml-[25px]">100</span>
              </div>

              <div className="flex flex-row justify-start items-center my-1">
                <h5 className="text-white text-[18px] font-medium min-w-[146px]">{t("good")}</h5>
                <Progress className="ml-4 text-secondary min-w-[145px] h-[5px]" classNames={{ indicator: ["bg-secondary-800"] }} color="secondary" value={80} maxValue={100} />
                <span className="text-caption text-[16px] ml-[25px]">100</span>
              </div>
              <div className="flex flex-row justify-start items-center my-1">
                <h5 className="text-white text-[18px] font-medium min-w-[146px]">{t("average")}</h5>
                <Progress className="ml-4 text-secondary min-w-[145px] h-[5px]" classNames={{ indicator: ["bg-secondary-800"] }} color="secondary" value={80} maxValue={100} />
                <span className="text-caption text-[16px] ml-[25px]">100</span>
              </div>
              <div className="flex flex-row justify-start items-center my-1">
                <h5 className="text-white text-[18px] font-medium min-w-[146px]">{t("bellow_average")}</h5>
                <Progress className="ml-4 text-secondary min-w-[145px] h-[5px]" classNames={{ indicator: ["bg-secondary-800"] }} color="secondary" value={80} maxValue={100} />
                <span className="text-caption text-[16px] ml-[25px]">100</span>
              </div>
              <div className="flex flex-row justify-start items-center my-1">
                <h5 className="text-white text-[18px] font-medium min-w-[146px]">{t("poor")}</h5>
                <Progress className="ml-4 text-secondary min-w-[145px] h-[5px]" classNames={{ indicator: ["bg-secondary-800"] }} color="secondary" value={80} maxValue={100} />
                <span className="text-caption text-[16px] ml-[25px]">100</span>
              </div>

            </div>

            <div className="w-full py-6 bg-primary-700 rounded-[10px] p-8 sm:py-12 mt-10">
              <h4>Saliha Salim</h4>
              <Rating emptyStyle={{display: "flex"}} size={18} disableFillHover={true} iconsCount={5} />
              <p className="text-white text-[15px] mt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim suscipit earum ut itaque beatae quae rem hic obcaecati magnam, quas cum officiis fugit vitae perspiciatis aspernatur explicabo inventore asperiores aperiam!</p>
            </div>

            <div className="w-full py-6 bg-primary-700 rounded-[10px] p-8 sm:py-12 mt-10">
              <h4>Salim Suhaila</h4>
              <Rating emptyStyle={{display: "flex"}} size={18} disableFillHover={true} iconsCount={5} />
              <p className="text-white text-[15px] mt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim suscipit earum ut itaque beatae quae rem hic obcaecati magnam, quas cum officiis fugit vitae perspiciatis aspernatur explicabo inventore asperiores aperiam!</p>
            </div>

            <div className="w-full py-6 bg-primary-700 rounded-[10px] p-8 sm:py-12 mt-10">
              <h4>Saliha w Salim</h4>
              <Rating emptyStyle={{display: "flex"}} size={18} disableFillHover={true} iconsCount={5} />
              <p className="text-white text-[15px] mt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim suscipit earum ut itaque beatae quae rem hic obcaecati magnam, quas cum officiis fugit vitae perspiciatis aspernatur explicabo inventore asperiores aperiam!</p>
            </div>

            <div className="w-full py-6 flex justify-center items-center rounded-[10px] p-8 sm:py-12 mt-10">
              <Button variant="bordered" className="border-secondary-800 text-secondary-800">View More</Button>
            </div>
          </div>
        </Tab>


      </Tabs>
    </section>
  )
}

export default RatingsSection;