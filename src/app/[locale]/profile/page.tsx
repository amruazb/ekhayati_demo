"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/provider/AuthContext";
import { getToken } from "@/utils";
import { extractError, getUserProfile } from "@/provider";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {
  IconEdit,
  IconEye,
  IconNeedleThread,
  IconTrash,
} from "@tabler/icons-react";
import CardContainer from "@/abstract/CardContainer";
import moment from "moment";
import UserAddresses from "./components/UserAddresses";
import UserSizeProfiles from "./components/UserSizeProfiles";
import OrderDetailsDialog from "./components/OrderDetials";
import UpdateUserProfile from "./components/UpdateUserProfile";
import { useTranslations } from "next-intl";

const CustomerProfilePage = (props: any) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [userData, setUserData] = useState<any>({});
  const [orders, setOrders] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [sizeProfiles, setSizeProfiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customOrders, setCustomOrders] = useState<any[]>([]);
  const [selectedOrderData, setSelectedOrderData] = useState<any>(null);
  const [orderDataDialogOpen, setOrderDataDialogOpen] = useState(false);
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);

  const ctx = useAuth();
  const t = useTranslations("profile");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const token: any = ctx.token || getToken();
    const { data, error }: any = await getUserProfile(token);
    console.log(data?.customOrders);

    if (error) {
      toast.error(extractError(error));
    }

    setOrders(data.orders);
    setUserData(data.userData?.[0]);
    setAddresses(data.addresses);
    setSizeProfiles(data.sizeProfiles);
    setCustomOrders([...(data?.customOrders || []), ...(data?.orders || [])]);
    setInitialLoading(false);
    setIsLoading(false);
  };

  const handleReload = () => {
    setIsLoading(true);
    loadData();
  };

  const handleOpenProfileEditDialog = () => {
    setEditProfileDialogOpen(true);
  };

  const handleCancelSuccessful = () => {
    setOrderDataDialogOpen(false);
    loadData();
  }

  const getStatusChip = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Chip className="bg-blue-500">{t("pending")}</Chip>;
      case "PROCESSING":
        return <Chip className="bg-secondary text-primary">{t("sewing")}</Chip>;
      case "SEWING":
        return <Chip className="bg-secondary text-primary">{t("sewing")}</Chip>;
      case "APPROVED":
        return <Chip className="bg-success text-white">{t("approved")}</Chip>;
      case "ON THE WAY":
        return <Chip className="bg-secondary text-primary">{t("on_the_way")}</Chip>;
      case "DELIVERED":
        return <Chip className="bg-success text-primary">{t("delivered")}</Chip>;
      case "CANCELLED":
        return <Chip className="bg-danger text-primary">{t("cancelled")}</Chip>;
      case "REJECTED":
        return <Chip className="bg-danger text-primary">{t("rejected")}</Chip>;
      default:
        return <Chip className="bg-secondary text-primary">{t(status.toLowerCase())}</Chip>;
    }
  };

  if (initialLoading) {
    return (
      <main className="min-h-screen min-w-screen w-full flex flex-col items-center justify-start overflow-hidden py-12 px-6 xs:px-3">
        <section className="w-full min-h-[400px] max-w-main flex flex-col items-center justify-center">
          <CircularProgress color="secondary" />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen min-w-screen w-full flex flex-col items-center justify-start overflow-hidden py-12 px-6 xs:px-3">
      <section className="w-full max-w-main flex flex-col items-center justify-center">
        <header className="w-full flex flex-col items-start justify-start">
          <h1
            style={{ textTransform: "capitalize" }}
            className="text-white xs:text-[25px] text-4xl font-black"
          >
            {userData?.name || userData?.username || userData?.email }{t("apostrophe_s")}{" "}
            <span className="text-secondary">{t("profile")}</span>{" "}
            <Button
              isIconOnly
              className="bg-secondary text-[20px] min-w-[30px] min-h-[30px] p-x-0 rounded-xl hover:bg-secondary/80"
              onClick={handleOpenProfileEditDialog}
            >
              <IconEdit size={18} />
            </Button>
          </h1>
          <p className="text-caption">{t("here_you_can_edit")}</p>
        </header>

        <div className="my-5"></div>

        <div className="w-full">
          <CardContainer scissors={false}>
            <Table
              classNames={{
                wrapper: ["bg-transparent w-full"],
                th: ["bg-primary", "text-secondary"],
                thead: ["text-[26px]"],
              }}
            >
              <TableHeader>
                <TableColumn className="text-[14px] text-start">{t("name")}</TableColumn>
                <TableColumn className="text-[14px] text-start">{t("last_update")}</TableColumn>
                <TableColumn className="text-[14px] text-start">{t("status")}</TableColumn>
                <TableColumn className="text-[14px] text-start">{t("actions")}</TableColumn>
              </TableHeader>
              <TableBody>
                {/**@ts-ignore */}
                {customOrders?.map((item: any, i) => {
                  return (
                    <TableRow key={"custom-order-" + i}>
                      <TableCell colSpan={1}>
                        <div className="flex items-center">
                          <IconNeedleThread className="text-secondary mx-1" />
                          {Object(item).hasOwnProperty("delivery_note") ? (
                            <p className="ml-2">{t("order_number")} {item.id}</p>
                          ) : (
                            <p className="ml-2">{t("custom_order_number")} {item.id}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell colSpan={1}>
                        {moment(item.updatedAt).format("DD/MM/YYYY hh:mm")}
                      </TableCell>
                      <TableCell colSpan={1}>
                        {getStatusChip(item.status)}
                      </TableCell>
                      <TableCell colSpan={1}>
                        <span>
                          <Button
                            onClick={() => {
                              setSelectedOrderData(item);
                              setOrderDataDialogOpen(true);
                            }}
                            className="bg-transparent min-w-[16px] min-h-[16px]"
                          >
                            <IconEye size={16} />
                          </Button>

                          {/* {["PENDING", "APPROVED"].includes(item?.status) && (
                            <Button className="bg-transparent min-w-[16px] min-h-[16px]">
                              <IconTrash size={16} />
                            </Button>
                          )} */}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContainer>
        </div>
      </section>

      <div className="my-8"></div>

      <section className="w-full max-w-main flex flex-col items-center justify-center">
        <UserAddresses
          setIsLoading={setIsLoading}
          addresses={addresses}
          onComplete={handleReload}
        />
      </section>

      <div className="my-8"></div>

      <section className="w-full max-w-main flex flex-col items-center justify-center">
        <UserSizeProfiles
          setIsLoading={setIsLoading}
          sizeProfiles={sizeProfiles}
          onComplete={handleReload}
        />
      </section>

      <ToastContainer />

      {isLoading && (
        <div className="w-screen h-screen bg-black/50 flex items-center justify-center fixed top-0 left-0 z-[9999] overflow-hidden">
          <CircularProgress color="secondary" />
        </div>
      )}

      <OrderDetailsDialog
        onClose={() => setOrderDataDialogOpen(false)}
        onCancel={handleCancelSuccessful}
        isOpen={orderDataDialogOpen}
        orderData={selectedOrderData}
      />

      <UpdateUserProfile
        onClose={() => setEditProfileDialogOpen(false)}
        isOpen={editProfileDialogOpen}
        handleCompleted={handleReload}
        userData={userData}
      />
    </main>
  );
};

export default CustomerProfilePage;
