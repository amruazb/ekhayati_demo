import createMiddleware from 'next-intl/middleware';
import { localePrefix, locales, pathnames } from "./utils/navigation";

export default createMiddleware({
  defaultLocale: 'en',
  localePrefix,
  locales,
  pathnames
});
 
export const config = {
  matcher: ['/', '/(de|ar|en)/:path*']
};