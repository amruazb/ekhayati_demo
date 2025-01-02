"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getProductListing } from "@/provider";

interface Product {
  id?: number;
  attributes?: {
    title: string;
    description: string;
    main_image?: {
      data?: {
        id?: number;
        attributes?: {
          name?: string;
          alternativeText?: string;
          caption?: string;
          formats?: Record<string, any>;
          url?: string;
        };
      };
    };
    price?: number;
    locale?: string;
  };
}

interface ProductProviderProps {
  children: ReactNode;
}

const ProductContext = createContext<Product[] | null>(null);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: responseData } = await getProductListing("", {
          populate: "main_image",
          locale: "en",
        });

        // Map the response data to match the Product type
        const productsData: Product[] = responseData?.data?.map((item: any) => ({
          id: item.id,
          attributes: {
            title: item.attributes.title,
            description: item.attributes.description,
            main_image: item.attributes.main_image ? {
              data: {
                id: item.attributes.main_image.data?.id,
                attributes: {
                  name: item.attributes.main_image.data?.attributes.name,
                  alternativeText: item.attributes.main_image.data?.attributes.alternativeText,
                  caption: item.attributes.main_image.data?.attributes.caption,
                  formats: item.attributes.main_image.data?.attributes.formats as Record<string, any>,
                  url: item.attributes.main_image.data?.attributes.url,
                },
              },
            } : undefined,
            price: item.attributes.price,
            locale: item.attributes.locale,
          },
        })) || [];

        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={products}>{children}</ProductContext.Provider>
  );
};

export const useProducts = (): Product[] => {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
