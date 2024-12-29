import SolitaireCardSingle, { SolitaireCardSingleProps } from "@/components/cards/SolitaireCardSingle";
import ShopPageHeader from "@/components/shop/shop-page-header";
import ShopPagination from "@/components/shop/pagination";

export interface ShopItemListProps {
  items?: SolitaireCardSingleProps[];
  pagination?: any;
  title?: string;
  coloredTitle?: string;
  description?: string;
  query?: any;
  design?: boolean;
}

const ShopItemList = ({ items, pagination, title, coloredTitle, description, query, design }: ShopItemListProps) => {
  return (
    <section className="min-h-screen sm:w-[70%] xl:w-[80%] xs:w-full py-12 px-6 xs:px-3">
      <ShopPageHeader
        title={title || "Browse"}
        coloredTitle={coloredTitle || "Mekhwar"}
        description={description || "Browse our wide collection of Mekhwar design, made only for your style and luxury"}
      />

      <div
        // style={{
        //   display: "grid",
        //   gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        //   gap: "1rem",
        //   justifyItems: "center",
        // }}
        className="grid xs:grid-cols-auto-fill-100 sm:grid-cols-auto-fit-100 gap-4 items-center justify-items-center"
      >
        {items?.map((item) => (
          <article
            key={item.id}
            // style={{
            //   width: "100%",
            //   maxWidth: "180px",
            // }}
            className="w-full xs:max-w-[250px] sm:max-w-[250px]"
          >
            <SolitaireCardSingle
              autWidth={true}
              title={item?.title}
              id={item?.id}
              image={item?.image}
              price={item?.price}
              tailorName={item?.tailorName}
              rating={item?.rating}
              query={query}
              design={design}
              customizable={item?.customizable}
            />
          </article>
        ))}
      </div>

      <div className="mt-12 flex justify-center md:pr-[200px]">
        {pagination?.pageCount > 0 ? <ShopPagination data={pagination} /> : null}
      </div>
    </section>
  );
}

export default ShopItemList;
