"use client";
import { Avatar, Button, Card, CardHeader, Modal, ModalContent } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "..";
import { useAuth } from "@/provider/AuthContext";
import { IconEye, IconNeedleThread } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import CardContainer from "@/abstract/CardContainer";

export interface FabricBuyOptionsProps {
  id?: number;
  sizes?: any[];
  description?: string;
  patterns?: any[];
}

export const FabricBuyOptions = (props: FabricBuyOptionsProps) => {
  const [selectFabricPatternDialogOpen, setSelectFabricPatternDialogOpen] = useState(false);

  const ctx = useAuth();
  const router = useRouter();
  const t = useTranslations("customization");

  const [CustomDesignStepDialogOpen, setCustomDesignStepDialogOpen] = useState(false);

  const handleNextClick = () => {
    // if (!ctx.isAuthenticated) {
    //   return router.push("/login");
    // }

    if (props?.patterns?.length) {
      setSelectFabricPatternDialogOpen(true);
      return;
    }

    if (props?.id) moveToCustomization(props?.id);
  };

  const moveToCustomization = (fabricId: number, selectedPattern?: string) => {
    const query: any = {
      fabricId: fabricId,
    };

    if (selectedPattern) {
      query["selectedPattern"] = selectedPattern;
    }

    router.push({
      pathname: "/custom-mekhwar",
      query,
    });
  };

  return (
    <div className="flex flex-col justify-start items-start w-[100%]">
      <p className="m-0 mt-0 text-white font-[14px] w-[100%]">{props?.description}</p>

      <div className="xs:my-[10px] my-[20px] h-full"></div>

      <Button
        onClick={handleNextClick}
        className={`bg-primary-700 text-secondary text-[16px] font-bold min-w-full min-h-0 py-6 rounded-[6px]`}
        startContent={<IconNeedleThread size={18} />}
      >
        {t("start_customization")}
      </Button>

      {props?.patterns?.length && props?.patterns?.length > 0 ? (
        <Modal
          isOpen={selectFabricPatternDialogOpen}
          onClose={() => setSelectFabricPatternDialogOpen(false)}
          size="sm"
        >
          <ModalContent>
            <CardContainer scissors={false}>
              <div className="w-full h-full flex flex-col items-start justify-start p-3">
                <h1 className="text-xl font-bold text-secondary text-[16px]">
                  Select Pattern
                </h1>
                <div className="w-full h-full flex flex-col">
                  {props?.patterns?.map((pattern) => (
                    <Card
                      key={pattern.id}
                      className="max-w-[340px] bg-transparent shadow-sm px-0"
                    >
                      <CardHeader className="justify-between pr-0 pl-1">
                        <div className="flex gap-5">
                          <Avatar
                            isBordered
                            radius="sm"
                            size="md"
                            src={pattern?.image?.data?.attributes?.url}
                          />
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                              {pattern?.title}
                            </h4>
                            {/* <h5 className="text-small tracking-tight text-default-400">
                            {pattern?.price} AED
                          </h5> */}
                          </div>
                        </div>
                        <Button
                          color="primary"
                          radius="full"
                          size="sm"
                          onClick={() => moveToCustomization(props?.id || 0, pattern.id)}
                        >
                          {t("select")}
                        </Button>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContainer>
          </ModalContent>
        </Modal>
      ) : null}
    </div>
  );
};
