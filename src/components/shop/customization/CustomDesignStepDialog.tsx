'use client'
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
import CardContainer from "@/abstract/CardContainer";
import { useRouter } from "@/utils";
import { IconChevronRight, IconInfoCircle } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export interface CustomDesignStepDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSize: string | null;
  selectedSizeProfile: any;
  shoulder?: any;
  wrist?: any;
  bust?: any;
  arm_length?: any;
  top_length?: any;
  top_width?: any;
  saveSizeProfile?: any;
  id: number;
}

const CustomDesignStepDialog = ({id, open, onOpenChange, selectedSize, selectedSizeProfile, shoulder, wrist, bust, arm_length, top_length, top_width, saveSizeProfile }: CustomDesignStepDialogProps) => {
  const [nextStep, setNextStep] = React.useState("tailor");
  const router = useRouter();
  const t = useTranslations("shop");

  const onContinue = () => {
    const query = {
      shoulder: shoulder,
      wrist: wrist,
      bust: bust,
      arm_length: arm_length,
      top_length: top_length,
      top_width: top_width,
      saveSizeProfile: saveSizeProfile,
      selectedSize: selectedSize,
      selectedSizeProfile: selectedSizeProfile,
      fabricId: id,
    };
    if (nextStep === "tailor") {
      router.push({
        pathname: `/custom/journey/[fabricId]/tailor`,
        params: {
          fabricId: id,
        },
        query,
      }, {
        scroll: true,
      });
    } else {
      router.push({
        pathname: `/custom/journey/[fabricId]/design`,
        params: {
          fabricId: id,
        },
        query,
      }, {
        scroll: true
      });
    }
  }
  return (
    <>
      <Modal isOpen={open} onOpenChange={onOpenChange}>
        <ModalContent className="bg-primary">
          {(onClose) => (
            <CardContainer noPadding={true} scissors={false}>
              <div className="px-2 py-6">
              <ModalHeader className="flex flex-row justify-start items-center">
                <IconInfoCircle size={24} className="mr-2 text-secondary" />
                <h1 className="text-secondary text-[20px] text-bold">Custom Mekhwar Process</h1>
              </ModalHeader>
              <ModalBody>
                <p>
                  Please select whether you want to choose a design or a tailor for to proceed with your custom design order.
                </p>

                <RadioGroup value={nextStep} onChange={(e) => setNextStep(e.target.value)} className="mt-5" color="secondary" orientation="horizontal">
                  <Radio value="tailor">Choose Tailor</Radio>
                  <Radio value="design">Choose Design</Radio>
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onContinue} color="secondary" className="bg-secondary-800 text-black px-10 py-4 rounded-[5px]" onPress={onContinue}>
                  <IconChevronRight /> {t("next")}
                </Button>
              </ModalFooter>
              </div>
            </CardContainer>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CustomDesignStepDialog;