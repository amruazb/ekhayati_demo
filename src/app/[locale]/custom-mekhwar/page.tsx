"use client";
import { Button, Progress } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import StepOne from "./components/StepOne";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";

export default function CustomizationPageV2() {
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
  const [uploadedDesign, setUploadedDesign] = useState<File[] | []>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [designToSelect, setDesignToSelect] = useState<number | null>(null);
  const [sizes, setSizes] = useState<any>({});

  const [selectedFabricId, setSelectedFabricId] = useState<number | null>(null);
  const [selectedFabricPattern, setSelectedFabricPattern] = useState<number | null>(null);

  const [hasPrice, setHasPrice] = useState(false);

  const [step, setStep] = useState(0);

  const t = useTranslations("customization");
  const step3Ref = useRef<any>(null);

  const urlQuery = useSearchParams();

  const onSelectDesign = (id: number) => {
    if (uploadedDesign?.length) {
      setDesignToSelect(id);
      setModalOpen(true);
      return;
    }
    setSelectedDesign(id);
  };

  const handleUpload = (file: File) => {
    setUploadedDesign((oldFiles) => [...oldFiles, file]);
    setSelectedDesign(null);
  };

  const handleDeleteUpload = (index: number) => {
    setUploadedDesign((oldFiles) => oldFiles.filter((_, i) => i !== index));
  };

  const getTitle = () => {
    switch (step) {
      case 0:
        return t("choose_or_upload_your_design");
      case 1:
        return t("choose_your_fabric");
      case 2:
        return t("fill_your_size");
      case 3:
        return t("order_summary");
      case 4:
        return hasPrice ? t("processing_for_payment") : t("reviewing_your_order");
      default:
        return t("choose_or_upload_your_design");
    }
  };

  const getNext = () => {
    switch (step) {
      case 0:
        return t("next_choose_your_fabric");
      case 1:
        return t("next_fill_your_size");
      case 2:
        return t("next_order_summary");
      case 3:
        return t("next_order_pending");
      case 4:
        return "";
      default:
        return t("next_choose_your_fabric");
    }
  };

  const getPercentage = () => {
    switch (step) {
      case 0:
        return 0;
      case 1:
        return 25;
      case 2:
        return 50;
      case 3:
        return 75;
      case 4:
        return 100;
      default:
        return 0;
    }
  };

  const handleNext = async () => {
    if (step === 0 && !selectedDesign && uploadedDesign.length === 0) {
      toast.error(t("toast_select_a_design_or_upload_one"));
      return;
    }

    if (step === 0 && urlQuery.get("fabricId")) {
      setStep(2);
      return;
    }

    if (step === 1 && !selectedFabricId) {
      toast.error(t("toast_select_a_fabric"));
      return;
    }

    //@ts-ignore
    if (step === 2) {
      const res = await step3Ref.current?.isValid();
      // toast.error(t("toast_fill_your_size"));
      if (!res) return;
      setSizes(res);
    }

    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 0) {
      return;
    }
    setStep(step - 1);
  };

  const initPage = () => {
    const fabricId = urlQuery.get("fabricId");
    const designId = urlQuery.get("designId");
    const patternId = urlQuery.get("selectedPattern");

    if (fabricId) {
      setSelectedFabricId(parseInt(fabricId));
    }

    if (patternId) {
      setSelectedFabricPattern(parseInt(patternId));
    }

    if (designId) {
      setSelectedDesign(parseInt(designId));
      setStep(1);
    }
  };

  useEffect(() => {
    initPage();
  }, []);

  return (
    <main className="w-full min-h-screen2 flex flex-col justify-start items-center py-10 px-8">
      <section className=" w-full max-w-main flex flex-col items-start justify-start">
        <div className="flex flex-col items-center justify-start w-full">
          <h1 aria-label="title" className="text-xl font-bold text-secondary-800">{getTitle()}</h1>
          <h2 aria-label="title" className="text-sm font-normal text-white my-2">{getNext()}</h2>
          <Progress
            aria-label="Downloading..."
            size="sm"
            value={getPercentage()}
            color="secondary"
            // showValueLabel={true}
            className="max-w-md"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step ? step : "empty"}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="h-full w-full mt-5"
            aria-label="step-content"
          >
            {step === 0 && (
              <StepOne
                selectedDesign={selectedDesign}
                onSelectDesign={onSelectDesign}
                uploadedDesign={uploadedDesign}
                handleUpload={handleUpload}
                handleDeleteUpload={handleDeleteUpload}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                designToSelect={designToSelect}
                setSelectedDesign={setSelectedDesign}
                setUploadedDesign={setUploadedDesign}
              />
            )}

            {step === 1 && (
              <StepTwo
                selectedFabricId={selectedFabricId}
                onSelectFabric={setSelectedFabricId}
                selectedFabricPattern={selectedFabricPattern}
                onSelectFabricPattern={setSelectedFabricPattern}
              />
            )}

            {step === 2 && <StepThree ref={step3Ref} sizes={sizes} />}

            {step === 3 && (
              <StepFour
                selectedDesign={selectedDesign}
                uploadedDesign={uploadedDesign}
                sizes={sizes}
                selectedFabricId={selectedFabricId}
                selectedFabricPattern={selectedFabricPattern}
                handleHasPrice={setHasPrice}
              />
            )}

            {step === 4 && (
              <StepFive
                selectedDesign={selectedDesign}
                uploadedDesign={uploadedDesign}
                sizes={sizes}
                selectedFabricId={selectedFabricId}
                selectedFabricPattern={selectedFabricPattern}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </section>
      <section className={`w-full max-w-main text-end mt-5 justify-center items-center ${step === 4 ? "hidden" : "flex"}`}>
        <Button
          onClick={handleBack}
          className="bg-primary-700 disabled:bg-primary-700/50 text-white rounded-md"
        >
          <IconChevronLeft />
          <span className="mr-1"></span>
          {t("flow_back")}
        </Button>
        <span className="mx-2"></span>
        <Button onClick={handleNext} className="bg-primary-700 text-white rounded-md">
          {t("flow_next")}
          <span className="mr-1"></span>
          <IconChevronRight />
        </Button>
      </section>

      <ToastContainer />
    </main>
  );
}
