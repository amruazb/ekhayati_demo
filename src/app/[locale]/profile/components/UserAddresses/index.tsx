"use client";

import ShopPageHeader from "@/components/shop/shop-page-header";
import { useEffect, useState } from "react";
import AddressLine from "./components/AddressLine";
import CreateAddressDialog from "./components/CreateAddressDialog";
import { Button, CircularProgress } from "@nextui-org/react";
import { IconChevronRight, IconEdit, IconPlus } from "@tabler/icons-react";
import { getToken, useRouter } from "@/utils";
import { deleteCustomerAddress, extractError } from "@/provider";
import { toast } from "react-toastify";
import UpdateAddressDialog from "./components/UpdateAddressDialog";
import { getUserAddresses, storeAddresses } from "@/utils/cart";
import { useTranslations } from "next-intl";

export interface UserAddressesProps {
  addresses: any[];
  onComplete: () => void;
  setIsLoading: (v: boolean) => void;
}

export default function UserAddresses(props: UserAddressesProps) {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [createAddressDialogOpen, setCreateAddressDialogOpen] = useState(false);
  const [editAddressDialogOpen, setEditAddressDialogOpen] = useState(false);
  const [editAddressData, setEditAddressData] = useState<any>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(true);

  const t = useTranslations("profile");

  useEffect(() => {
    const add = props.addresses;
    setAddresses(add);
    setInitialLoadComplete(false);
  }, [props.addresses]);

  const handleDelete = async (id: any) => {
    props.setIsLoading(false);
    const { data, error } = await deleteCustomerAddress(getToken(), { id });

    if (data) {
      props.setIsLoading(false);
      //@ts-ignore
      setAddresses(data);
      storeAddresses(data);

      toast.success("Address deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      props.setIsLoading(false);
      toast.error(extractError(error), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleEdit = (id: any) => {
    const address = addresses?.find((item: any) => item.id == id);
    setEditAddressDialogOpen(true);
    setEditAddressData(address);
  };

  return (
    <div className="w-full flex flex-col items-start justify-start overflow-hidden">
      <header className="w-full flex flex-row items-start justify-between">
        <div>
          <h1
            style={{ textTransform: "capitalize" }}
            className="text-white xs:text-[25px] text-3xl font-black"
          >
            {t("my_addresses_l")} <span className="text-secondary">{t("my_addresses_t")}</span>{" "}
          </h1>
          <p className="text-caption text-md xs:text-[15px] mt-2">
            {t("here_you_can_edit_your_delivery_addresses")}
          </p>
        </div>

        <Button onClick={() => setCreateAddressDialogOpen(true)} className="bg-secondary-800 rounded-md text-primary-900">{t("add_new")} <IconPlus size={18} /></Button>
      </header>

      <div className="my-5"></div>

      <div className="w-full grid grid-cols-1 gap-8 align-content-center justify-items-center">
        {addresses?.length > 0 &&
          addresses?.map((item: any, index) => {
            return (
              <AddressLine
                key={"address-num-" + index}
                title={item.name}
                value={item.address}
                mobile={item.mobile}
                type={item.type}
                id={item.id}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            );
          })}
        {!addresses?.length && initialLoadComplete == true && (
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-caption ">{t("addresses_not_found")}</p>
          </div>
        )}
      </div>

      <CreateAddressDialog
        isOpen={createAddressDialogOpen}
        handleCompleted={(d) => {
          setCreateAddressDialogOpen(false);
          setAddresses(d);
        }}
        handleClose={() => setCreateAddressDialogOpen(false)}
      />

      <UpdateAddressDialog
        isOpen={editAddressDialogOpen}
        address={editAddressData}
        handleCompleted={(d) => {
          const ad = getUserAddresses();
          setAddresses(ad);
          setEditAddressDialogOpen(false);
          setAddresses(d);
        }}
        handleClose={() => {
          setEditAddressDialogOpen(false);
          setEditAddressData(null);
        }}
      />
    </div>
  );
}
