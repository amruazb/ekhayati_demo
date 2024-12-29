"use client";

import ShopPageHeader from "@/components/shop/shop-page-header";
import { useAuth } from "@/provider/AuthContext";
import { useEffect, useState } from "react";
import AddressLine from "./components/AddressLine";
import CreateAddressDialog from "./components/CreateAddressDialog";
import { Button, CircularProgress } from "@nextui-org/react";
import { IconChevronRight, IconPlus } from "@tabler/icons-react";
import { getToken, useRouter } from "@/utils";
import { deleteCustomerAddress, extractError } from "@/provider";
import { toast, ToastContainer } from "react-toastify";
import UpdateAddressDialog from "./components/UpdateAddressDialog";
import { getUserAddresses, storeAddresses } from "@/utils/cart";
import { useTranslations } from "next-intl";

export default function CheckoutAddressPage(props: any) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [createAddressDialogOpen, setCreateAddressDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editAddressDialogOpen, setEditAddressDialogOpen] = useState(false);
  const [editAddressData, setEditAddressData] = useState<any>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const ctx = useAuth();
  const router = useRouter();
  const t = useTranslations("shop");
  
  useEffect(() => {
    const add = getUserAddresses();
    setAddresses(add);
    setInitialLoadComplete(true);
  }, []);

  const handleDelete = async (id: any) => {
    setIsLoading(true);
    const { data, error } = await deleteCustomerAddress(getToken(), {id});

    if (data) {
      setIsLoading(false);
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
      })
    } else {
      setIsLoading(false);
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
  }

  const handleEdit = (id: any) => {
    const address = addresses?.find((item: any) => item.id == id);
    setEditAddressDialogOpen(true);
    setEditAddressData(address);
  }

  const handleMoveToSummary = () => {
    // Check if the user is logged in
    if (!ctx.isAuthenticated) {
      // Redirect to login page with a query parameter to return to the current page after login
      router.push({
        pathname: "/login",
        query: {
          redirect: "/checkout/address", // Adjust this to match the current page URL
        },
      });
      return;
    }
  
    const params = props?.searchParams;
  
    // Proceed to the checkout summary if the user is authenticated
    router.push({
      pathname: "/checkout/summary",
      query: {
        ...params,
        addressId: selectedAddress,
      },
    });
  };
  

  return (
    <main className="min-h-screen min-w-main w-full flex flex-col items-start justify-start overflow-hidden py-12 px-6 xs:px-3">
      <ShopPageHeader
        title={t("your_address_l")}
        coloredTitle={t("your_address_t")}
        description={t("cart_description")}
      />

      <div className=" w-full grid grid-cols-1 gap-8 align-content-center justify-items-center">
        {addresses?.length > 0 &&
          addresses?.map((item: any, index) => {
            return (
              <AddressLine
                key={"address-num-" + index}
                title={item.name}
                value={item.address}
                mobile={item.mobile}
                type={item.type}
                onClick={(id) => setSelectedAddress(id)}
                selectedValue={selectedAddress}
                id={item.id}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            );
          })}
        {(!addresses?.length && initialLoadComplete == true) && (
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-caption ">No addresses found</p>
          </div>
        )}

        {(isLoading || !initialLoadComplete) && (
          <div className="h-screen w-screen top-0 left-0 flex items-center justify-center z-10 absolute bg-black/50">
            <CircularProgress color="secondary" />
            <p className="text-caption ">Loading...</p>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-12 min-h-main">
        <div className="w-[80%] border-t-1 border-secondary-800 border-dashed h-[1px] flex items-center justify-center">
          <Button
            onClick={() => setCreateAddressDialogOpen(true)}
            isIconOnly
            className="rounded-full bg-secondary-800 min-h-[30px] min-w-[30px] h-[30px] w-[30px]"
            fullWidth={false}
          >
            <IconPlus className="text-primary-800 font-bold" size={22} />
          </Button>
        </div>
        <p className="mt-5 text-sm text-secondary-800">{t("add_new_address")}</p>
      </div>

      <div className="w-full flex justify-center items-center mt-12">
        <Button
          radius="sm"
          color="secondary"
          className="mt-12 bg-secondary-800 text-primary-900 font-normal text-[16px] px-6 disabled:bg-secondary-800/50"
          disabled={!selectedAddress}
          onClick={handleMoveToSummary}
        >
          <IconChevronRight size={18} /> {t("next")}
        </Button>
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
      <ToastContainer />
    </main>
  );
}
