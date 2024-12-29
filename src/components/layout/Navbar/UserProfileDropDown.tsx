"use client"
import { useAuth } from "@/provider/AuthContext";
import { Link, useRouter } from "@/utils";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { IconUser } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export function UserProfileDropDown(props: any) {
  const ctx = useAuth();
  const t = useTranslations("navigation");
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/profile");
  }, [])

  const handleLogout = () => {
    ctx.logout();
    router.push("/");
  };

  return !ctx?.isAuthenticated ? (
    <Link prefetch={true} href={"/login"}>
      <Button
        isIconOnly
        className="bg-transparent text-sm md:text-lg lg:text-xl"
        aria-label="Like"
      >
        <IconUser />
      </Button>
    </Link>
  ) : (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          className="bg-transparent text-sm md:text-lg lg:text-xl"
          aria-label="Like"
        >
          <IconUser />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Example with disabled actions"
        disabledKeys={["edit", "delete"]}
      >
        <DropdownItem key="new" onClick={() => router.push("/profile")}>
          {t("user_profile")}
        </DropdownItem>
        <DropdownItem key="copy" onClick={handleLogout} className="text-danger">
          {t("logout")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
