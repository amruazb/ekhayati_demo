"use client";
import React from "react";
import { IconEye, IconTrash, IconUpload } from "@tabler/icons-react";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import "yet-another-react-lightbox/styles.css";
import { useTranslations } from "next-intl";
import UploadDesignComponent from "./UploadDesignComponent";
import ChooseDesignComponent from "./ChooseDesignComponent";
import CardContainer from "@/abstract/CardContainer";

export interface StepOneProps {
  selectedDesign: number | null;
  onSelectDesign: (id: number) => void;
  uploadedDesign: File[] | [];
  handleUpload: (file: File) => void;
  handleDeleteUpload: (index: number) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  designToSelect: number | null;
  setSelectedDesign: (id: number | null) => void;
  setUploadedDesign: (files: File[] | []) => void;
}

export default function StepOne({ selectedDesign, onSelectDesign, uploadedDesign, handleUpload, handleDeleteUpload, modalOpen, designToSelect, setSelectedDesign, setUploadedDesign, setModalOpen}: StepOneProps) {
  const t = useTranslations("customization");

  return (
    <div className="w-full flex justify-between items-start xs:flex-col-reverse flex-row">
      <UploadDesignComponent
        uploadedDesigns={uploadedDesign}
        handleUpload={handleUpload}
        handleDelete={handleDeleteUpload}
      />
      <ChooseDesignComponent
        selectedDesign={selectedDesign}
        onSelectDesign={onSelectDesign}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size="sm">
        <ModalContent>
          <CardContainer scissors={false}>
            <ModalHeader>{t("modal_choose_design")}</ModalHeader>
            <ModalBody>
              {t("modal_your_uploaded_designs_will_be_deleted")}
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  setModalOpen(false);
                }}
                className="bg-transparent text-danger"
              >
                {t("modal_cancel")}
              </Button>
              <Button
                onClick={() => {
                  setSelectedDesign(designToSelect);
                  setUploadedDesign([]);
                  setModalOpen(false);
                }}
                className="bg-primary text-white"
              >
                {t("modal_confirm")}
              </Button>
            </ModalFooter>
          </CardContainer>
        </ModalContent>
      </Modal>
    </div>
  );
}
