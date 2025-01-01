"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getProductListing } from "@/provider";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: responseData } = await getProductListing("", {
          populate: "main_image",
          locale: "en",
        });
        setProducts(responseData?.data || []);
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

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
