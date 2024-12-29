"use client";

import { useState } from "react";
import BuyOptions from "./BuyOptions";
import ImageUpload from "./ImageUpload";
import { toast } from "react-toastify";

export interface FirstStepProps {
  onNext: (f: any) => void;
  handResize: (f: any) => void;
}
export default function FirstStep(props: FirstStepProps) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFile2, setUploadedFile2] = useState(null);
  const [uploadedFile3, setUploadedFile3] = useState(null);
  const [uploadedFile4, setUploadedFile4] = useState(null);
  const handleMoveToFabric = (data: any) => {
    if (!uploadedFile && !uploadedFile2 && !uploadedFile3 && !uploadedFile4) {
      toast.error("Please upload an image", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    props.onNext({
      ...data,
      image: uploadedFile,
      image2: uploadedFile2,
      image3: uploadedFile3,
      image4: uploadedFile4,
    });
  };
  return (
    <div className="grid grid-cols-2 small:grid-cols-1 xs:grid-cols-1 gap-4 p-3 justify-items-center items-center">
      <div className="col-span-1 xs:max-w-[95vw] small:max-w-[95vw] large:w-[600px] m-5 flex-row">
        <ImageUpload check={true} onUpload={(e) => setUploadedFile(e)} height="403px" />
        <div className="grid grid-cols-3 gap-4">
          <ImageUpload onUpload={(e) => setUploadedFile2(e)} />
          <ImageUpload onUpload={(e) => setUploadedFile3(e)} />
          <ImageUpload onUpload={(e) => setUploadedFile4(e)} />
        </div>
      </div>

      <div className="col-span-1 max-w-[95vw]">
        <BuyOptions
          onNext={handleMoveToFabric}
          handleResize={props.handResize}
        />
      </div>
    </div>
  );
}
