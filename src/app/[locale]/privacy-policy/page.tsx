import { getLocale } from "next-intl/server";
import { getPrivacyPolicy } from "@/provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Khayati | Privacy Policy",
  description: "E-Khayati Privacy Policy Page",
};

const getData = async () => {
  const locale = await getLocale();
  const { data } = await getPrivacyPolicy(locale);
  return data;
};

export default async function PrivacyPolicy(props: any) {
  const data = await getData();
  return (
    <main className="min-w-main px-5 py-10 min-h-dvh">
      <article
        dangerouslySetInnerHTML={{
          __html: data?.data?.attributes?.value || "Privacy Policy",
        }}
      />
    </main>
  );
}
