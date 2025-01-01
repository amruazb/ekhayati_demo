"use client";
import {
  Badge,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconHeart, IconShoppingCart } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Link } from "@/utils/navigation";
import { useAuth } from "@/provider/AuthContext";
import { IconMenu2 } from "@tabler/icons-react";
// import HamburgerIcon from "@/components/buttons/HamburgerIcon";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
} from "@tabler/icons-react";
import { UserProfileDropDown } from "./UserProfileDropDown";
import SearchBarMobile from "./SearchBarMobile";
import SearchBar from "./SearchBar";

// Main component definition
const NavbarClientComponent = () => {
  // Hooks and context initialization
  const pathname: any = usePathname();
  const locale = useLocale();
  const t = useTranslations("navigation");
  const router = useRouter();

  const ctx = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItems: any[] = [
    {
      name: t("home"),
      path: "/",
      authRequired: false,
    },
    {
      name: t("shop"),
      path: "/shop",
      authRequired: false,
    },
    {
      name: t("customize"),
      path: "/custom-mekhwar",
      authRequired: true,
    },
    {
      name: t("tailors"),
      path: "/shop/tailors",
      authRequired: false,
    },
    {
      name: t("about"),
      path: "/about",
      authRequired: false,
    },
    {
      name: t("contact"),
      path: "/contact",
      authRequired: false,
    },
  ];
  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="w-full bg-primary-700 border-b-3 border-secondary-800 sm:h-[60px] overflow-hidden"
      classNames={{
        wrapper: [
          "max-w-main",
          "sm:flex",
          "sm:items-center",
          "sm:justify-between",
        ],
      }}
      shouldHideOnScroll={true}
    >
      <NavbarContent className="nav-lap:hidden pr-3" justify="start">
        <NavbarBrand>
          <Link href={"/"}>
            <Image
              priority={true}
              unoptimized
              src="/assets/images/logo.png"
              alt=""
              width="0"
              height="0"
              sizes="100vw"
              aria-label="Logo"
              className="w-full xs:max-w-[135.39px] xs:min-h-[28.2px] sm:max-w-[140px] sm:h-[30px]"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="nav-lap:hidden" justify="end">
        

        <div className="flex items-center gap-1 md:gap-2 lg:gap-3 xl:gap-4 2xl:gap-6">
          <Link
            prefetch={true}
            // href={ctx.isAuthenticated ? "/favorites" : "/login"}
            href={"/favorites"}
          >
            <Button
              isIconOnly
              className="bg-transparent text-sm md:text-lg lg:text-xl"
              aria-label="Like"
            >
              <IconHeart />
            </Button>
          </Link>

          <Link prefetch={true} href={"/cart"}>
          {/* <Link prefetch={true} href={ctx.isAuthenticated ? "/cart" : "/login"}> */}
            <Badge
              content={ctx.cartItemCount}
              showOutline={false}
              isInvisible={ctx.cartItemCount < 1 || !ctx.isAuthenticated}
              variant="flat"
              color="secondary"
            >
              <Button
                isIconOnly
                className="bg-transparent text-sm md:text-lg lg:text-xl"
                aria-label="Like"
              >
                <IconShoppingCart />
              </Button>
            </Badge>
          </Link>

          {/* <Link
            prefetch={true}
            href={ctx.isAuthenticated ? "/profile" : "/login"}
          >
            <Button
              isIconOnly
              className="bg-transparent text-sm md:text-lg lg:text-xl"
              aria-label="Like"
            >
              <IconUser />
            </Button>
          </Link> */}

          {/* <Link
            href={pathname.replace(/\/ar\/|\/en\/|\/ar|\/en/, "/")}
            locale={locale === "en" ? "ar" : "en"}
          >
            <Button
              isIconOnly
              className="bg-transparent text-sm md:text-lg lg:text-xl"
              aria-label="Like"
            >
              <p className="text-white text-sm md:text-lg lg:text-xl">
                {locale === "en" ? "ع" : "En"}
              </p>
            </Button>
          </Link> */}
          <Link
            prefetch={true}
            href={ctx.isAuthenticated ? "/profile" : "/login"}
          >
            <Button
              isIconOnly
              className="bg-transparent text-sm md:text-lg lg:text-xl"
              aria-label="Like"
            >
              <IconUser />
            </Button>
          </Link>
          <Link
            href={pathname.replace(/\/ar\/|\/en\/|\/ar|\/en/, "/")}
            locale={locale === "en" ? "ar" : "en"}
          >
            <Button
              isIconOnly
              className="bg-transparent text-sm md:text-lg lg:text-xl"
              aria-label="Like"
            >
              <p className="text-white text-sm md:text-lg lg:text-xl">
                {locale === "en" ? "ع" : "En"}
              </p>
            </Button>
          </Link>
        </div>

        {/* <HamburgerIcon onClick={() => setIsMenuOpen(!isMenuOpen)} /> */}
        <NavbarMenuToggle
          icon={<IconMenu2 />}
          className="text-[24px]"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent
        className="hidden nav-lap:flex gap-8 items-center justify-center"
        justify="center"
      >
        <Link href={"/"}>
          <Image
            priority={true}
            unoptimized
            src="/assets/images/logo.png"
            alt=""
            height={`${31}`}
            width={148.8}
            className="sm:h-auto sm:min-w-[148.8px]"
          />
        </Link>

        <div style={{ paddingBottom: '10px' }}>
      <SearchBarMobile />
    </div>
        {menuItems.map((item, index) => {
          return (
            <NavbarItem
              key={`main-${item.name}-${item.path} grid grid-cols-5 gap-[50px]`}
            >
              <Link
                onClick={handleCloseMenu}
                prefetch={true}
                color={"secondary"}
                className={` text-[16px] col-span-1  text-base font-weight-500 transition-all transform hover:text-secondary hover:scale-110  ${
                  pathname === "/" + locale && pathname === item.path + locale
                    ? "text-secondary"
                    : pathname == "/" + locale + item.path
                    ? "text-secondary"
                    : "text-white/50"
                }`}
                href={
                  item.authRequired && !ctx?.isAuthenticated
                    ? "/login"
                    : item.path
                }
              >
                {item.name}
              </Link>
            </NavbarItem>
          );
        })}

        <div className="flex items-center gap-1 md:gap-2 lg:gap-3 xl:gap-4 2xl:gap-6">
          <Link
            prefetch={true}
            // href={ctx.isAuthenticated ? "/favorites" : "/login"}
            href={"/favorites"}
          >
            <Button
              isIconOnly
              className="bg-transparent text-sm md:text-lg lg:text-xl"
              aria-label="Like"
            >
              <IconHeart />
            </Button>
          </Link>

          <Link prefetch={true} href={"/cart"}>
          {/* <Link prefetch={true} href={ctx.isAuthenticated ? "/cart" : "/login"}> */}
            <Badge
              content={ctx.cartItemCount}
              showOutline={false}
              isInvisible={ctx.cartItemCount < 1 || !ctx.isAuthenticated}
              variant="flat"
              color="secondary"
            >
              <Button
                isIconOnly
                className="bg-transparent text-sm md:text-lg lg:text-xl"
                aria-label="Like"
              >
                <IconShoppingCart />
              </Button>
            </Badge>
          </Link>

          <UserProfileDropDown />

          <Link
            href={pathname.replace(/\/ar\/|\/en\/|\/ar|\/en/, "/")}
            locale={locale === "en" ? "ar" : "en"}
          >
            <Button
              isIconOnly
              className="bg-transparent text-sm md:text-lg lg:text-xl"
              aria-label="Like"
            >
              <p className="text-white text-sm md:text-lg lg:text-xl">
                {locale === "en" ? "ع" : "En"}
              </p>
            </Button>
          </Link>
        </div>
      </NavbarContent>

      {/* Mobile menu */}

      <NavbarMenu>
        <div className="flex mt-2 ">
          <SearchBar handleSearch={() => {
            setIsMenuOpen(false);
          }} />
        </div>

        <div className="mt-10 text-center space-y-4">
          {menuItems.map((item, index) => {
            return (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  prefetch={true}
                  onClick={handleCloseMenu}
                  className={`w-full ${
                    pathname == locale + "/" + item.path ? "text-secondary" : ""
                  }`}
                  color={"secondary"}
                  href={
                    item.authRequired && !ctx?.isAuthenticated
                      ? "/login"
                      : item.path
                  }
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            );
          })}

          <NavbarMenuItem>
            <Link prefetch={true} onClick={handleCloseMenu} href="/cart">
              Cart
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem
            className={`${!ctx.isAuthenticated ? "hidden" : "block"}`}
          >
            <Link prefetch={true} onClick={handleCloseMenu} href="/profile">
              Profile
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem
            className={`${!ctx.isAuthenticated ? "hidden" : "block"}`}
          >
            <Link
              prefetch={true}
              onClick={() => {
                ctx.logout();
                handleCloseMenu();
              }}
              href="/login"
            >
              {t("logout")}
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem
            className={`${ctx.isAuthenticated ? "hidden" : "block"}`}
          >
            <Link prefetch={true} onClick={handleCloseMenu} href="/login">
              Login
            </Link>
          </NavbarMenuItem>
        </div>

        <div className="flex flex-row items-end justify-center h-screen mb-4 space-x-4">
          <Link href="#">
            <IconBrandFacebook size={35} />
          </Link>
          <Link href="#">
            <IconBrandX size={35} />
          </Link>
          <Link href="#">
            <IconBrandTiktok size={35} />
          </Link>
          <Link href="#">
            <IconBrandInstagram size={35} />
          </Link>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarClientComponent;
