'use client';

import ProductCard from "@/components/ProductCard/ProductCard";
import Search from "@/components/Search/Search";
import { getProducts } from "@/libs/apis";
import { Product } from "@/models/product";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";


const Products = () => {
  const [productTypeFilter, setProductTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQueryParam = searchParams.get("searchQuery");
    const productTypeParam = searchParams.get("type");

    if (productTypeParam) {
      setProductTypeFilter(productTypeParam);
    }

    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    }
  }, [searchParams]);

  async function fetchData() {
    return getProducts();
  }

  const { data, error, isLoading } = useSWR(["get/products", searchQuery, productTypeFilter], fetchData);

  if (error) throw new Error("Cannot fetch data");
  if (typeof data === "undefined" && !isLoading) throw new Error("Cannot fetch data");

  const filterProducts = (products: Product[]) => {
    return products.filter((product) => {
      // product filter
      if (
        productTypeFilter &&
        productTypeFilter.toLowerCase() !== "all" &&
        product.type.toLowerCase() !== productTypeFilter.toLowerCase()
      ) {
        return false;
      }

      // search
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  };

  const filteredProducts = filterProducts(data || []);

 

  return (
    <div className="container mx-auto pt-10">
        <Search productTypeFilter={productTypeFilter}
            searchQuery={searchQuery}
            setProductTypeFilter={setProductTypeFilter}  
            setSearchQuery={setSearchQuery}
        />

        <div className="flex mt-20 justify-between flex-wrap">
            {filteredProducts.map(product => ( 
            <ProductCard key={product._id} product={product}  />
            ))}
        </div>
    </div>
     
  );
 
};

export default Products;
