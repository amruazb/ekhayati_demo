"use client";

import CardContainer from "@/abstract/CardContainer";
import { ThemeInput } from "@/components/input/theme-input";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface RequestPasswordResetDialogProps {
  dialogOpen: boolean;
  handleClose: () => void;
}

const formSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email")
    .email("Email is not valid"),
});

export default function RequestPasswordResetDialog(
  props: RequestPasswordResetDialogProps
) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    //@ts-ignore
    resolver: yupResolver(formSchema),
  });

  const handleSendEmail = (v: any) => {
  };

  const handleCancel = () => {
    reset({ email: "" });
    props.handleClose();
  };

  return (
    <Modal isOpen={props.dialogOpen} onClose={props.handleClose}>
      <ModalContent>
        <CardContainer scissors={false}>
          <ModalHeader>
            <h1>Request Password Reset</h1>
          </ModalHeader>
          <ModalBody className="flex flex-col ">
            <ThemeInput
              label="Email"
              extras={{ ...register("email") }}
              errorMessage={errors.email?.message}
            />
          </ModalBody>

          <ModalFooter className="w-full flex justify-end items-end">
            <Button
              onClick={handleCancel}
              className="bg-transparent"
              variant="bordered"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(handleSendEmail)}
              variant="solid"
              color="secondary"
            >
              Submit
            </Button>
          </ModalFooter>
        </CardContainer>
      </ModalContent>
    </Modal>
  );
}
