import  ProductItem  from "./ProductItem";
import Error from "./Error";
import Loading from "./Loading";
import useFetch from "../utils/useFetch";
import { setSearchQuery } from "../utils/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Search,XCircle } from "lucide-react";
export default function Productlist() {
  const dispatch = useDispatch();

  // 🔍 Get search query from Redux
  const query = useSelector((state) => state.search.query);

  // 📦 Fetch products
  const [data, loading, error] = useFetch("https://dummyjson.com/products");

  if (loading) {
    return (
      <div className="h-screen flex bg-light-bg dark:bg-dark-bg items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  // ✅ Filter products using Redux state
  const filteredProducts = data?.products?.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full flex gap-4 flex-col items-center bg-light-bg dark:bg-dark-bg transition-colors duration-300">
    
    {/* 🔍 Enhanced Search Bar */}
<div className="w-full max-w-3xl mx-auto mt-5 mb-10 px-4">
  <div className="relative group">
    {/* Search Icon */}
    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-light-muted group-focus-within:text-light-primary transition-colors">
      <Search size={24} strokeWidth={3} />
    </div>

    <input
      type="text"
      className="w-full h-16 md:h-20 pl-16 pr-16 rounded-[2rem] bg-light-surface dark:bg-dark-surface border-2 border-light-border dark:border-dark-border text-xl md:text-2xl font-black text-light-text dark:text-dark-text placeholder:text-light-muted/50 placeholder:font-bold outline-none shadow-sm transition-all focus:border-light-primary focus:shadow-2xl focus:shadow-light-primary/10"
      placeholder="Search for premium products..."
      value={query}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
    />

    {/* Clear Button (appears when typing) */}
    {query && (
      <button 
        onClick={() => dispatch(setSearchQuery(''))}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-light-muted hover:text-rose-500 transition-colors"
      >
        <XCircle size={24} />
      </button>
    )}
  </div>
  
  {/* Search Hint */}
  <div className="mt-3 ml-6 flex gap-4 overflow-x-auto no-scrollbar">
     <p className="text-xs font-black uppercase tracking-widest text-light-muted/60">Popular:</p>
     {['Electronics', 'Beauty', 'Groceries'].map(tag => (
       <button 
         key={tag}
         onClick={() => dispatch(setSearchQuery(tag))}
         className="text-xs font-bold text-light-primary hover:underline whitespace-nowrap"
       >
         {tag}
       </button>
     ))}
  </div>
</div>

      {/* Header */}
      <div className="w-full max-w-7xl px-6 pt-10 pb-4 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-black">
            Products <span className="text-light-primary">Available</span>
          </h1>
          <div className="h-1 w-12 bg-light-primary rounded-full"></div>
        </div>

        {/* ✅ Filtered count */}
        <span className="text-sm font-semibold px-3 py-1 rounded-full text-nowrap border">
          {filteredProducts?.length || 0} Items Found
        </span>
      </div>

      {/* Products Grid */}
      <div className="w-full max-w-7xl grid p-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-lg italic">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
