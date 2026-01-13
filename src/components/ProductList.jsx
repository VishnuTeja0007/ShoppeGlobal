import { ProductItem } from "./ProductItem"
import { useEffect, useState } from "react"
import { ErrorState } from "./Error";
import Loading from "./Loading";
import useFetch from "../utils/useFetch";
export function Productlist(props) {
    const[data,loading,error]=useFetch("https://dummyjson.com/products")
    console.log(data)
   
    if (loading){
      return (
        <div className="h-screen flex items-center justify-center">
          
          <Loading/>

        </div>
      )
      
    
    } 
      

if (error) {
  return (
    <ErrorState
      status={500}
      title="Couldn’t load products"
      message="Check your internet connection or try again."
      details={String(error?.message ?? error)}
      onRetry={() => window.location.reload()}
    />
  );
}
return <div className="grid p-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {data.map(element => {
            return <ProductItem key={element.id} {...element}></ProductItem>
          })}
           </div>
}   