"use client";

import { FabricCard } from "@/components";
import { createCustomOder, extractError, getFabricListing } from "@/provider";
import { useAuth } from "@/provider/AuthContext";
import { Button, CircularProgress, Pagination } from "@nextui-org/react";
import {
  IconCheck,
  IconChevronRight,
  IconChevronLeft,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export interface SecondStepProps {
  onNext: (data: any) => void;
  orderData: any;
  handResize: (f: any) => void;
  onPrevious: () => void;
}

interface CustomOrderPostI {
  color: string;
  customerInstructions: string;
  design: number;
  design2: number;
  design3: number;
  design4: number;
  fabric: number;
  style: string;
  arm_length: number;
  shoulder: number;
  cup: string;
  wrist_style: string;
  neck_style: string;
  chest_point: number;
  bust: number;
  wrist: number;
  neck: number;
  hips: number;
  height: number;
  arm_width: number;
  sleeves_length: number;
  top_length: number;
  top_width: number;
  size: string;
  save_size_profile: boolean;
}

export default function SecondStep(props: SecondStepProps) {
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [fabricData, setFabricData] = useState<any[]>();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedFabric, setSelectedFabric] = useState<any>();
  const [isOrdering, setIsOrdering] = useState(false);

  const ctx = useAuth();
  const t = useTranslations("shop");

  useEffect(() => {
    getFabricData();
  }, []);

  const getFabricData = async () => {
    ctx.checkAuth();
    const { data, error } = await getFabricListing(ctx.token, {
      "pagination[page]": page,
      "pagination[pageSize]": 10,
    });

    if (error) {
      toast.error(extractError(error));
    }

    setFabricData(data?.data);

    setTotalPages(data?.meta?.pagination?.pageCount || 0);
    setPage(data?.meta?.pagination?.page || 0);

    setInitialLoading(false);
  };

  const handlePageChange = async (p: number) => {
    setIsLoading(true);
    setPage(p);
    const { data, error } = await getFabricListing(ctx.token, {
      "pagination[page]": p,
      "pagination[pageSize]": 10,
    });

    if (error) {
      toast.error(extractError(error));
    }

    setFabricData(data?.data);

    setTotalPages(data?.meta?.pagination?.pageCount || 0);
    setIsLoading(false);
  };

  const handleOnNext = async () => {
    if (!selectedFabric) {
      toast.error("Please select a fabric");
      return;
    }
    setIsOrdering(true);

    const uploadData: CustomOrderPostI = {
      fabric: selectedFabric,
      color: props?.orderData?.color,
      customerInstructions: props?.orderData?.customerInstructions,
      design: props?.orderData?.image.id,
      design2: props?.orderData?.image2?.id,
      design3: props?.orderData?.image3?.id,
      design4: props?.orderData?.image4?.id,
      style: props?.orderData?.styles,
      size: props?.orderData?.size,
      shoulder: props?.orderData?.shoulder || 0,
      bust: props?.orderData?.bust || 0,
      wrist: props?.orderData?.wrist || 0,
      top_length: props?.orderData?.top_length || 0,
      top_width: props?.orderData?.top_width || 0,
      arm_length: props?.orderData?.arm_length || 0,
      cup: props?.orderData?.cup || "A",
      chest_point: props?.orderData?.chest_point || 0,
      neck: props?.orderData?.neck || 0,
      hips: props?.orderData?.hips || 0,
      height: props?.orderData?.height || 0,
      arm_width: props?.orderData?.hips || 0,
      sleeves_length: props?.orderData?.sleeves_length || 0,
      wrist_style: props?.orderData?.wrist_style || 0,
      neck_style: props?.orderData?.neck_style || 0,
      save_size_profile: props?.orderData?.saveSizeProfile,
    };

    try {
      const { data, error } = await createCustomOder(ctx.token, {
        data: uploadData,
      });

      if (error) {
        toast.error(extractError(error));
        setIsOrdering(false);
        return;
      }
      setIsOrdering(false);
      props.onNext(data);
    } catch (err) {
      toast.error(extractError(err));
      setIsOrdering(false);
      return;
    }
  };


  const handleOnBack = () =>{
    props.onNext("prev");
  };

  return (
    <div className="w-full min-h-main xs:flex xs:flex-col xs:items-center p-3">
      <div>
        {initialLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="secondary" size="sm" />
          </div>
        )}

        {isLoading && (
          <div className="w-screen h-screen fixed top-0 flex justify-center items-center z-10 backdrop-blur-sm">
            <CircularProgress color="secondary" />
          </div>
        )}

        {!initialLoading && fabricData?.length && (
          <div
            className="w-full grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            }}
          >
            {fabricData.map((fabric, index) => {
              return (
                <div
                  key={`fabric-${index}`}
                  className="relative"
                  onClick={() => setSelectedFabric(fabric.id)}
                >
                  {
                    <motion.div
                      initial={
                        selectedFabric === fabric?.id
                          ? { scale: 0 }
                          : { scale: 1 }
                      }
                      animate={
                        selectedFabric === fabric?.id
                          ? { rotate: 360, scale: 1 }
                          : { scale: 0, rotate: -360 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className={`absolute top-[12px] right-[32px] z-[100000] bg-secondary rounded-full p-2 shadow-xl`}
                    >
                      <IconCheck size={16} />
                    </motion.div>
                  }

                  <FabricCard
                    image={
                      fabric?.attributes?.main_image?.data?.attributes?.url
                    }
                    name={fabric?.attributes?.name}
                    price={fabric?.attributes?.price}
                    tailorName={
                      fabric?.attributes?.tailor?.data?.attributes?.name
                    }
                    key={`fabric-${index}`}
                    preventDefault={true}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="w-full mt-5 flex justify-center items-center">
          {totalPages > 1 && (
            <Pagination
              color="secondary"
              total={totalPages}
              initialPage={page}
              onChange={handlePageChange}
            />
          )}
        </div>
      </div>
      <div className="w-full mt-5 flex justify-center items-center">
        <Button
          isDisabled={!selectedFabric || isOrdering}
           onClick={handleOnBack}
          className="bg-primary-700 text-white max-w-[300px] text-[16px] font-bold w-full min-h-0 py-6 rounded-[6px] m-2"
        >
          {t("back")}
        </Button>
        <Button
          isDisabled={!selectedFabric || isOrdering}
          onClick={handleOnNext}
          className="bg-primary-700 text-white max-w-[300px] text-[16px] font-bold w-full min-h-0 py-6 rounded-[6px]"
          startContent={
            isOrdering ? (
              <CircularProgress
                color="secondary"
                classNames={{ svg: "w-[20px]" }}
              />
            ) : (
              <IconChevronRight size={18} />
            )
          }
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
}
