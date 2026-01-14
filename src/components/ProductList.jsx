import { ProductItem } from "./ProductItem"
import { useEffect, useState } from "react"
import  Error from "./Error";
import Loading from "./Loading";
import useFetch from "../utils/useFetch";

    export function Productlist(props) {
      // Fetch products via custom hook (hook handles its own useEffect)
      const [data, loading, error] = useFetch('https://dummyjson.com/products');

      if (loading){
        return (
          <div className="h-screen flex bg-light-bg dark:bg-dark-bg items-center justify-center">
            <Loading/>
          </div>
        )
      } 

      if (error) {
        return (
          <Error/>
        );
      }

      return  <div className="min-h-screen w-full flex flex-col items-center bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            {/* Header Section */}
            <div className="w-full max-w-7xl px-6 pt-10 pb-4 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl md:text-3xl font-black text-light-text dark:text-dark-text tracking-tight uppercase">
                        Products <span className="text-light-primary dark:text-dark-primary">Available</span>
                    </h1>
                    <div className="h-1 w-12 bg-light-primary dark:bg-dark-primary rounded-full"></div>
                </div>
                
                {/* Optional Result Count */}
                <span className="text-sm font-semibold text-light-muted dark:text-dark-muted bg-light-surface dark:bg-dark-surface px-3 py-1 rounded-full border border-light-border dark:border-dark-border">
                    {data?.products?.length || 0} Items Found
                </span>
            </div>

            {/* Grid Container */}
            <div className="w-full max-w-7xl grid p-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 items-stretch">
                {data?.products?.length > 0 ? (
                    data.products.map((element) => (
                        <ProductItem key={element.id} {...element} />
                    ))
                ) : (
                    /* Fallback when no products are found */
                    <div className="col-span-full py-20 text-center">
                        <p className="text-light-muted dark:text-dark-muted text-lg italic">
                            No products matching your criteria were found.
                        </p>
                    </div>
                )}
            </div>
        </div>
   
}