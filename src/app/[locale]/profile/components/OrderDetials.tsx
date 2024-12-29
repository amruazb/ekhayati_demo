"use client";

import { cancelCustomOrder, extractError } from "@/provider";
import { useAuth } from "@/provider/AuthContext";
import { useRouter } from "@/utils";
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface OrderDetailsDialogProps {
  isOpen: boolean;
  orderData: any;
  onClose: () => void;
  onCancel: () => void;
}

export default function OrderDetailsDialog(props: OrderDetailsDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const t = useTranslations("profile");
  const ctx = useAuth();

  const handleCancelOrder = async () => {
    const body = { id: props?.orderData?.id };
    const token = ctx?.token;
    setIsLoading(true);

    try {
      const { data, error } = await cancelCustomOrder(token, body);

      if (data) {
        toast.success("Order cancelled successfully");
        props.onCancel();
      }

      if (error) {
        toast.error(extractError(error));
      }

      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);

      if (err?.message) {
        toast.error(err?.message);
      }
    }
  };

  const handleMakePaymentForCustom = () => {
    router.push({
      pathname: "/checkout/address",
      query: {
        orderType: "custom",
        orderId: props?.orderData?.id,
      },
    });
  };

  useEffect(() => {
    console.log(props);
  }, [])

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalContent>
        <ModalHeader>{t("order_details")}</ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          {!Object(props.orderData).hasOwnProperty("delivery_note") ? (
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <h1 className="">{t("design")}:</h1>
                <div className="my-3"></div>
                <Image
                  src={props?.orderData?.design?.url || props?.orderData?.mukhawar?.main_image?.url}
                  width={150}
                  height={150}
                  className="object-cover aspect-square"
                />
              </div>

              <div className="flex flex-col">
                <h1 className="w-full">{t("fabric")}:</h1>
                <div className="my-3"></div>
                <Image
                  src={props?.orderData?.fabric?.main_image?.url}
                  width={150}
                  height={150}
                  className="object-cover aspect-square"
                />
              </div>

              <div className="flex flex-row items-center justify-between px-2 col-span-2">
                <h3>{t("fabric_price")}</h3>
                <h3>AED {props?.orderData?.price}</h3>
              </div>

              <div className="flex flex-row items-center justify-between px-2 col-span-2">
                <h3>{t("design_price")}</h3>
                <h3>AED {props?.orderData?.tailor_fee}</h3>
              </div>

              {props?.orderData?.tax > 0 ? (
                <div className="flex flex-row items-center justify-between px-2 col-span-2">
                  <h3>{t("tax")}</h3>
                  <h3>AED {props?.orderData?.tax}</h3>
                </div>
              ) : (
                <></>
              )}

              <div className="flex flex-row items-center justify-between px-2 col-span-2">
                <h3>{t("delivery_charge")}</h3>
                <h3>AED {props?.orderData?.delivery_charge}</h3>
              </div>

              <div className="flex flex-row items-center justify-between px-2 col-span-2">
                <h3 className="font-bold text-lg">{t("total_amount")}</h3>
                <h3 className="font-bold text-lg">
                  AED{" "}
                  {(props?.orderData?.tailor_fee || 0) +
                    (props?.orderData?.delivery_charge || 0) +
                    (props?.orderData?.tax || 0) +
                    (props?.orderData?.price || 0)}
                </h3>
              </div>

              {props?.orderData?.status === "APPROVED" && (
                <div className="flex flex-row items-center justify-end col-span-2">
                  <Button
                    isLoading={isLoading}
                    onClick={handleCancelOrder}
                    color="danger"
                    className="mx-2 rounded-md"
                  >
                    {t("cancel_order")}
                  </Button>
                  <Button
                    disabled={isLoading}
                    onClick={handleMakePaymentForCustom}
                    className="bg-secondary rounded-md"
                  >
                    {t("make_payment")}
                  </Button>
                </div>
              )}

              {props?.orderData?.status === "ON THE WAY" && props?.orderData?.tracking_link && (
                <div className="flex flex-row items-center justify-end col-span-2">
                  <Button
                    disabled={isLoading}
                    onClick={() => {
                      window.open(props?.orderData?.tracking_link, "_blank");
                    }}
                    className="bg-secondary rounded-md"
                  >
                    {t("track_order")}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full">
              <Table>
                <TableHeader
                  columns={[
                    { name: t("item") },
                    { name: t("quantity") },
                    { name: t("price") },
                  ]}
                >
                  {(column) => <TableColumn key={column.name}>{column.name}</TableColumn>}
                </TableHeader>
                <TableBody>
                  {props?.orderData?.mekhwar?.map((item: any, i: number) => {
                    return (
                      <TableRow key={"mekhwar-in-table" + i}>
                        <TableCell>
                          <Image
                            width={50}
                            height={50}
                            alt={item?.mekhwar?.title}
                            src={item?.mekhwar?.main_image?.url}
                          />
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.mekhwar?.price}</TableCell>
                      </TableRow>
                    );
                  })}

                  <TableRow className={`${props?.orderData?.tax ? "" : "hidden"}`}>
                    <TableCell>{t("tax")}</TableCell>
                    <TableCell>{""}</TableCell>
                    <TableCell>AED {props?.orderData?.tax}</TableCell>
                  </TableRow>

                  <TableRow className={`${props?.orderData?.delivery_charge ? "" : "hidden"}`}>
                    <TableCell>{t("delivery_charge")}</TableCell>
                    <TableCell>{""}</TableCell>
                    <TableCell>AED {props?.orderData?.delivery_charge}</TableCell>
                  </TableRow>

                  <TableRow className={`${props?.orderData?.discount ? "" : "hidden"}`}>
                    <TableCell>{t("discount")}</TableCell>
                    <TableCell>{""}</TableCell>
                    <TableCell>AED {props?.orderData?.discount}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>{t("total")}</TableCell>
                    <TableCell>{""}</TableCell>
                    <TableCell>{props?.orderData?.total}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
