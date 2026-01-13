import { ProductItem } from "./ProductItem"
import { useEffect, useState } from "react"
import  Error from "./Error";
import Loading from "./Loading";

    export function Productlist(props) {
      const [data,setData]=useState([])
      const [loading,setLoading]=useState(true)
      const [error,setError]=useState(null)

      useEffect(() => {
        const ac = new AbortController();

        const fetchData = async () => {
          try {
            setLoading(true);
            setError(null);

            // Fetch the correct products API and extract the products array
            const response = await fetch('https://dummyjson.com/products?limit=30', { signal: ac.signal });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData = await response.json();
            const products = Array.isArray(jsonData.products) ? jsonData.products : [];
            setData(products);
          } catch (err) {
            if (err.name !== "AbortError") {
              setError(err.message);
              setData([]);
            }
          } finally {
            setLoading(false);
          }
        };

        fetchData();

        // Cleanup to avoid setState when unmounted
        return () => ac.abort();
      }, []); //

      if (loading){
        return (
          <div className="h-screen flex items-center justify-center">
            <Loading/>
          </div>
        )
      } 

      if (error) {
        return (
          <Error/>
        );
      }

      return <div className="grid p-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {data?.map(element => {
          return <ProductItem key={element.id} {...element}></ProductItem>
        })}
      </div>
    }
