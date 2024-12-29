"use client";

import { useEffect, useState } from "react";
import AddressLine from "./components/SizeProfileLine";
import { Button } from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import { getToken } from "@/utils";
import { deleteCustomerAddress, deleteSizeProfile, extractError } from "@/provider";
import { toast } from "react-toastify";
import CreateSizeProfileDialog from "./components/CreateSizeProfileDialog";
import UpdateSizeProfileDialog from "./components/UpdateSizeProfileDialog";
import { useTranslations } from "next-intl";

export interface UserSizeProfilesProps {
  sizeProfiles: any[];
  onComplete: () => void;
  setIsLoading: (v: boolean) => void;
}

export default function UserSizeProfiles(props: UserSizeProfilesProps) {
  const [sizeProfiles, setSizeProfiles] = useState<any[]>([]);
  const [createSizeProfileDialogOpen, setCreateSizeProfileDialogOpen] = useState(false);
  const [editSizeProfileOpen, setEditSizeProfileDialogOpen] = useState(false);
  const [editSizeProfile, setEditSizeProfileData] = useState<any>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(true);

  const t = useTranslations("profile");

  useEffect(() => {
    const add = props.sizeProfiles;
    setSizeProfiles(add);
    setInitialLoadComplete(false);
  }, [props.sizeProfiles]);

  const handleDelete = async (id: any) => {
    props.setIsLoading(true);
    const { data, error } = await deleteSizeProfile(getToken(), { id });

    if (data) {
      props.setIsLoading(false);

      toast.success("Size profile deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      props.onComplete();
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
    const address = sizeProfiles?.find((item: any) => item.id == id);
    setEditSizeProfileDialogOpen(true);
    setEditSizeProfileData(address);
  };

  return (
    <div className="w-full flex flex-col items-start justify-start overflow-hidden">
      <header className="w-full flex flex-row items-start justify-between">
        <div>
          <h1
            style={{ textTransform: "capitalize" }}
            className="text-white xs:text-[25px] text-3xl font-black"
          >
            {t("my_size_profiles_l")} <span className="text-secondary">{t("my_size_profiles_t")}</span>{" "}
          </h1>
          <p className="text-caption text-md xs:text-[15px] mt-2">
            {t("here_you_can_edit_your_size_profiles")}
          </p>
        </div>

        <Button onClick={() => setCreateSizeProfileDialogOpen(true)} className="bg-secondary-800 rounded-md text-primary-900">{t("add_new")} <IconPlus size={18} /></Button>
      </header>

      <div className="my-5"></div>

      <div className="w-full grid grid-cols-1 gap-8 align-content-center justify-items-center">
        {sizeProfiles?.length > 0 &&
          sizeProfiles?.map((item: any, index) => {
            return (
              <AddressLine
                key={"size-profile-num-" + index}
                title={item.title}
                shoulder={item.shoulder}
                hips={item.hips}
                height={item.height}
                chest_point={item.chest_point}
                cup={item.cup}
                bust={item.bust}
                wrist={item.wrist}
                neck={item.neck}
                sleeves_length={item.sleeves_length}
                arm_width={item.arm_width}
                id={item.id}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            );
          })}
        {!sizeProfiles?.length && initialLoadComplete == true && (
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-caption ">{t("no_size_profile_found")}</p>
          </div>
        )}
      </div>

      <CreateSizeProfileDialog
        isOpen={createSizeProfileDialogOpen}
        handleCompleted={(d) => {
          setCreateSizeProfileDialogOpen(false);
          props.onComplete();
        }}
        handleClose={() => setCreateSizeProfileDialogOpen(false)}
      />

      <UpdateSizeProfileDialog
        isOpen={editSizeProfileOpen}
        sizeProfile={editSizeProfile}
        handleCompleted={() => {
          setEditSizeProfileDialogOpen(false);
          props.onComplete();
        }}
        handleClose={() => {
          setEditSizeProfileDialogOpen(false);
          setEditSizeProfileData(null);
        }}
      />
    </div>
  );
}
