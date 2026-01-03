import { ProductItem } from "./ProductItem"
import { useEffect, useState } from "react"
import { ErrorState } from "./Error";
import Loading from "./Loading";

export function Productlist(props) {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    useEffect(()=>{
        const fetchProducts= async ()=>{
          try{
              setLoading(true)
              const data= await fetch("https://dummyjson.com/products")
              const json= await data.json()
              
              setData(json.products)
          }
          catch(error){
            setLoading(false)
            setError(error)
          }
          finally{
            setLoading(false)
          }
        }
        fetchProducts()
    },[])
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