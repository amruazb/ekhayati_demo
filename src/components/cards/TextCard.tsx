"use client";
import CardContainer from "@/abstract/CardContainer";
import PrimaryButton from "../buttons/PrimaryButton";
import LinkButton from "../buttons/LinkButton";
import { motion } from "framer-motion";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "..";
import { useTranslations } from "next-intl";
import { useAuth } from "@/provider/AuthContext";

interface TextCardProps {
  firstWord?: string;
  title?: string;
  description?: string;
  background?: string;
  actions: {
    id?: number | undefined;
    type?: "primary" | "secondary" | "link" | undefined;
    link?: any | undefined;
    title?: string | undefined;
    requiresAuth?: boolean | undefined;
  }[];
}
export const TextCard = ({
  title,
  description,
  actions,
  firstWord,
  background,
}: TextCardProps) => {
  const router = useRouter();
  const t = useTranslations("shop");

  const ctx = useAuth();

  return (
    <motion.div
      className="w-full h-full"
      whileHover={{ scale: 0.99, filter: "brightness(110%)" }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundImage: background ? `url(${background})` : "unset",
      }}
    >
      <CardContainer transparentBg={true} scissors={true}>
        <div className="w-full h-full flex items-center justify-center py-20 px-4 large:py-0">
          <div className="xs:text-center sm:text-start">
            <div>
              <span className="xs:text-4xl sm:text-6xl text-secondary font-black ">
                {firstWord}
              </span>
              <span className="xs:text-4xl sm:text-6xl text-white font-black "> {title}</span>
            </div>
            <h2 className="text-caption my-5 md:text-xl font-caption ">{description}</h2>
            <div className="lg:mt-5 flex xs:justify-center justify-start align-center">
              {actions?.length > 0 &&
                actions.map((item, index) =>
                  item.type === "link" ? (
                    <div
                      className="flex justify-center items-center"
                      key={`button-link-${index}`}
                    >
                      {index > 0 ? <div className="xs:mx-3 sm:mx-1 inline"></div> : null}{" "}
                      <LinkButton
                        key={`text-card-button-${index}`}
                        to={item.requiresAuth && !ctx.isAuthenticated ? "/login" : item.link}
                        title={item.title || ""}
                        endIcon={<IconChevronRight />}
                      />{" "}
                    </div>
                  ) : (
                    <div
                      className="flex justify-center items-center"
                      key={`button-not-link-${index}`}
                    >
                      {index > 0 ? <div className="xs:mx-3 sm:mx-1 inline"></div> : null}{" "}
                      <PrimaryButton
                        onClick={() =>
                          router.push(
                            (item.requiresAuth || item?.link?.match(/custom-mekhwar/ig)?.length > 0) && !ctx.isAuthenticated ? "/login" : item.link
                          )
                        }
                        title={item.title || ""}
                      />{" "}
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </CardContainer>
    </motion.div>
  );
};

export default TextCard;
