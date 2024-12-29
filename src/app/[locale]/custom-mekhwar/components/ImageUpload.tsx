"use client";

import CardContainer from "@/abstract/CardContainer";
import { quseUploadFile } from "@/provider";
import { useAuth } from "@/provider/AuthContext";
import { Button, CircularProgress } from "@nextui-org/react";
import { IconCloudUp, IconLink } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export interface ImageUploadProps {
  onUpload: (f: any) => void;
  height?: string;
  check?:boolean;
}

const fileToDataUri = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      resolve(event.target.result);
    };
    reader.readAsArrayBuffer(file);
  });

export default function ImageUpload(props: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<any | null>(null);

  const ctx = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("shop");

  useEffect(() => {
    ctx.checkAuth();
  }, []);

  const handleUpload = async (f: any) => {
    if (f) {
      setIsLoading(true);
      const newF = await fileToDataUri(f);
      let fd = new FormData();
      //@ts-ignore
      fd.append("files", f);
      fd.append("abc", "123");

      try {
        const res = await quseUploadFile(ctx.token, fd);
        setUploadedFile(res.data[0]);
        toast.success("File uploaded successfully");
        props.onUpload(res.data[0]);
      } catch (err: any) {
        toast.error(err?.message || "Error uploading file");
      }

      setIsLoading(false);
    }
  };

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files?.[0]);
    handleUpload(e.target.files?.[0]);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
      
      <div className={`w-15 ${props.height ? "" : "h-15"} flex mb-2 items-start justify-end p-[2px] relative overflow-hidden`} style={{ height: props.height }}>
        {/**@ts-ignore */}
        <input
          ref={fileInputRef}
          accept="image/*"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />

        {
          uploadedFile?.url && (
            <Image alt="" src={uploadedFile?.url} width="0" height="0" sizes="100vw" className="w-full h-full absolute top-0 left-0 object-cover" />
          )
        }
        
        <div className="w-full bg-white aspect-square rounded-[25px] h-full flex items-center justify-center">
          {!isLoading && !uploadedFile && (
            <Button
              onClick={handleUploadClick}
              className="rounded-md bg-primary-900 px-10 py-5 text-white"
            >
              <IconCloudUp /> {props.check ? t("upload_one_or_more_photos") : ""}
            </Button>
          )}

          {isLoading && (
            <Button className="rounded-md bg-primary-900 px-10 py-5 text-white">
              <CircularProgress
                isDisabled
                color="secondary"
                classNames={{ svgWrapper: "mr-3", svg: "w-[25px]" }}
                className="w-[15px] h-[15px]"
              />{" "}
              {props.check ? t("upload_one_or_more_photos") : ""}
            </Button>
          )}

          {!isLoading && uploadedFile && (
            <Button
              onClick={handleUploadClick}
              className="rounded-md bg-primary-900 px-10 py-5 text-white"
            >
              <IconLink /> Edit Uploaded
            </Button>
          )}
        </div>
      </div>
      
  );
}
