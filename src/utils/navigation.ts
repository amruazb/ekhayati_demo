import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';

export const pathnames = {
  "/custom/journey/[fabricId]": "/custom/journey/[fabricId]",
  "/custom/journey/[fabricId]/design": "/custom/journey/[fabricId]/design",
  "/custom/journey/[fabricId]/tailor": "/custom/journey/[fabricId]/tailor",
  '/': '/',
  '/shop/tailors': "/shop/tailors",
  '/shop/tailors/[tailorId]': '/shop/tailors/[tailorId]',
  '/shop': '/shop',
  "/shop/fabric": '/shop/fabric',
  "/shop/fabric/[fabricId]": '/shop/fabric/[fabricId]',
  "/shop/design": "/shop/design",
  "/shop/design/[id]": "/shop/design/[id]",
  "/login": '/login',
  "/forgetPassword": '/forgetPassword',
  "/signup": '/signup',
  "/contact": '/contact',
  '/shop/[id]': '/shop/[id]',
  "/about": '/about',
  "/custom-mekhwar": '/custom-mekhwar',
  "/design": "/design",
  "/design/[designId]": "/design/[designId]",
  "/cart": "/cart",
  "#": "#",
  "/favorites": "/favorites",
  "/checkout": "/checkout",
  "/checkout/address": "/checkout/address",
  "/checkout/summary": "/checkout/summary",
  "/profile": "/profile",
  "/privacy-policy": "/privacy-policy",
  "/terms-and-conditions": "/terms-and-conditions",
  "/size-guide": "/size-guide",
  "/purchase-policy": "/purchase-policy",
};

export const locales = ['en', 'de', 'ar'];

export const localePrefix = "always";

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});