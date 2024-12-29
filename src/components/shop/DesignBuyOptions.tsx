'use client'
import { useAuth } from "@/provider/AuthContext";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "..";
import { addCustomToCart, extractError } from "@/provider";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { IconShoppingBag } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

const formSchema = Yup.object().shape({
  shoulder: Yup.number().required('Please enter your shoulder size').min(1),
  wrist: Yup.number().required('Please enter your wrist size').min(1),
  bust: Yup.number().required('Please enter your bust size').min(1),
  arm_length: Yup.number().required('Please enter your arm length size').min(1),
  top_length: Yup.number().required('Please enter your top length size').min(1),
  top_width: Yup.number().required('Please enter your top width size').min(1),
  saveSizeProfile: Yup.boolean(),
});

interface DesignBuyOptionsForm {
  shoulder: number;
  bust: number;
  arm_length: number;
  wrist: number;
  top_length: number;
  top_width: number;
  saveSizeProfile: boolean;
}

export interface DesignBuyOptionsProps {
  id?: string;
  sizes?: any[];
  description?: string;
  query?: any;
  tailorId?: number;
}

export default function DesignBuyOptions (props: DesignBuyOptionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("shop");

  const ctx = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
  } = useForm<DesignBuyOptionsForm>({
    mode: "onTouched",
    //@ts-ignore
    resolver: yupResolver(formSchema)
  });

  const handleAddToCart = async () => {
    setIsLoading(true);
    const { data, error } = await addCustomToCart(ctx.token, {...props.query, designId: props.id, tailorId: props.tailorId });

    if (error) {
      toast.error(extractError(error));
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    //@ts-ignore
    toast.success("Added successfully");
  }

  return (
    <div className="flex flex-col justify-start items-start w-[100%]">

      <div className="my-[8px]"></div>

      <div className="my-[10px]"></div>

      <p className="m-0 mt-0 text-white font-[14px] w-[100%]">{props?.description}</p>

      <div className="my-[6px]"></div>

      <Button 
        onClick={handleAddToCart}
        isLoading={isLoading}
        className="bg-primary-700 text-white text-[16px] font-bold min-w-full min-h-0 py-6 rounded-[6px]"
        startContent={<IconShoppingBag size={18} />}>{t("add_to_cart")}</Button>

      <ToastContainer />
    </div>
  );
}

