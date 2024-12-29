import { getPurchasePolicy } from "@/provider";
import { getLocale } from "next-intl/server";

const getData = async () => {
    const locale = await getLocale();
    const { data } = await getPurchasePolicy(locale);
    return data;
}

export default async function PurchasePolicy(props: any) {
    const data = await getData();

    return (
        <main className="min-w-main px-5 py-10 min-h-dvh">
            <article
                dangerouslySetInnerHTML={{
                    __html: data?.data?.attributes?.value || "Purchase Policy",
                }}
            />
        </main>
    );
}