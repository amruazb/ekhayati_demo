"use client";
import { Input } from "@nextui-org/input";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import React from "react";

function isNumberKey(evt: any) {
  var charCode = evt?.which ? evt.which : evt.keyCode;
  if ((charCode >= 48 && charCode <=57) || (charCode >= 96 && charCode <=105) || charCode == 8) {
    return true
  }
  return evt.preventDefault();;
}

interface ThemeInputProps {
  value?: string | number;
  value2?: number;
  color?: string;
  label?: string;
  max?: number;
  maxLength?: number;
  type?: "email" | "text" | "password" | "number";
  endItem?: any;
  placeholder?: string;
  className?: string;
  radius?: string;
  name?: string;
  errorMessage?: string;
  classNames?: {
    inputWrapper?: string[];
    label?: string[];
  };
  step?: any;
  extras?: any;
  disabled?: boolean;
  custom?: boolean;
  onChange?: (e: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
  onEnter?: () => void;
  onClear?: () => void;
  onPaste?: () => void;
  allowOnlyNumbers?: boolean;
}
export const ThemeInput = (props: ThemeInputProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const className =
    "bg-primary-800 rounded-xl xs:rounded-md focus:outline-none";
  const classnames = {
    inputWrapper: [
      "h-[48px]",
      "text-white border-primary-800",
      "bg-transparent active:bg-primary-800",
      "data-[hover=true]:bg-primary-800 data-[hover=true]:border-primary",
      "data-[focus=true]:bg-primary-800",
      "group[data-fucus=true]:bg-primary-800",
      "group-data-[focus=true]:bg-primary-800",
      "group-data-[hover=true]:bg-primary-800",
      props?.classNames?.inputWrapper?.length
        ? props.classNames!.inputWrapper
        : "",
    ],
    label: ["text-white/50", "xs:text-[12px]"],
  };
  return (
    <>
      <Input
        color="secondary"
        {...(props.disabled && { disabled: props.disabled })}
        variant="bordered"
        label={props.label}
        type={
          props.type === "password"
            ? isVisible
              ? "text"
              : "password"
            : props.type
        }
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={className}
        radius="lg"
        name={props?.name}
        size="sm"
        step={props?.step || "any"}
        classNames={classnames}
        {...props?.extras}
        errorMessage={props?.errorMessage}
        isInvalid={props?.errorMessage ? true : false}
        defaultValue={props?.value}
        {...(props.custom && { value: props.value2 })}
        onKeyDown={props?.allowOnlyNumbers ? isNumberKey : undefined}
        endContent={
          props?.type === "password" ? (
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <IconEye className="text-[20px] text-secondary pointer-events-none" />
              ) : (
                <IconEyeClosed className="text-[20px] text-secondary pointer-events-none" />
              )}
            </button>
          ) : props.endItem ? (
            props.endItem
          ) : null
        }
        maxLength={props?.maxLength}
        max={props?.max}
        aria-label={props?.label || "input"}
      />
    </>
  );
};
