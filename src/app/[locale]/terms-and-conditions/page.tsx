import { getTermsAndConditions } from "@/provider";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
    title: "E-Khayati | Terms and Conditions",
    description: "E-Khayati Terms and Conditions Page",
}

const getData = async () => {
  const locale = await getLocale();
  const { data } = await getTermsAndConditions(locale);
  return data;
};

export default async function TermsAndConditions(props: any) {
  const data = await getData();
  return (
    <main className="min-w-main px-5 py-10 min-h-dvh">
      <article
        dangerouslySetInnerHTML={{
          __html: data?.data?.attributes?.value || "Terms and conditions",
        }}
      />
    </main>
  );
}
