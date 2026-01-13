import { StarIcon, Trash2, Plus, Minus } from "lucide-react";
import { useDispatch } from "react-redux";
import { ShoppingBag } from "lucide-react";
import { addToCart, decreaseCart, removeCart } from "../utils/cartSlicer";
const CartItem = ({ item }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  
  const discountedPrice = (item.price * (1 - item.discountPercentage / 100)).toFixed(2);
const dispatch=useDispatch()
function decrease(){
    dispatch(decreaseCart(item))
  }
  function increase(){
    dispatch(addToCart(item))
  }
  function remove(){
    dispatch(removeCart(item))
  }

 return (
    <div className="h-auto w-full flex flex-col md:flex-row items-center justify-start border-2 rounded-[2rem] p-6 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface gap-8 transition-all hover:border-light-primary/50 hover:shadow-xl group">
      
      {/* Image Container - Using white background for product visibility */}
      <div className="flex-shrink-0 bg-white p-4 rounded-2xl border border-light-border dark:border-dark-border shadow-inner">
        <img 
          src={item.images[0]} 
          alt={item.title} 
          className="h-40 w-40 md:h-52 md:w-52 object-contain transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      <div className="flex flex-col gap-3 flex-1 w-full">
        <div className="flex justify-between items-start">
          <span className="text-xs uppercase tracking-widest text-light-primary font-black">
            {item.category}
          </span>
          <button 
              onClick={remove}
              className="p-3 rounded-xl border border-light-border dark:border-dark-border text-light-muted hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
              title="Remove from cart"
            >
              <Trash2 size={24} />
          </button>
        </div>

        <h1 className="text-3xl font-black text-light-text dark:text-dark-text leading-tight -mt-2">
          {item.title}
        </h1>

        {/* Brand & Stock - Enhanced Text Size */}
        <div className="flex gap-4 text-sm text-light-muted font-bold">
          <span>Brand: <span className="text-light-text dark:text-dark-text">{item.brand}</span></span>
          <span className="flex items-center gap-1">
            Status: 
            <span className={item.stock > 0 ? "text-green-500" : "text-rose-500"}>
               {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
            </span>
          </span>
        </div>

        {/* Pricing - Larger Font Sizes */}
        <div className="flex items-center gap-4 py-2">
          <span className="text-4xl font-black text-light-text dark:text-dark-text">
            ${discountedPrice}
          </span>
          <span className="text-lg line-through text-light-muted">
            ${item.price}
          </span>
          <span className="bg-light-primary/10 text-light-primary text-xs px-3 py-1 rounded-full font-black animate-pulse">
            {item.discountPercentage}% OFF
          </span>
        </div>

        {/* Footer Actions: Counter + Buy */}
        <div className="flex flex-wrap items-center justify-between gap-6 mt-4 pt-6 border-t border-light-border dark:border-dark-border">
          
          {/* Enhanced Plus/Minus Counter */}
          <div className="flex items-center border-2 border-light-border dark:border-dark-border rounded-2xl p-1 bg-white dark:bg-dark-bg">
            <button 
              onClick={decrease}
              className="p-3 hover:bg-light-surface dark:hover:bg-dark-surface rounded-xl transition-colors text-light-text dark:text-dark-text"
            >
              <Minus size={22} strokeWidth={3} />
            </button>
            <span className="w-12 text-center text-xl font-black text-light-text dark:text-dark-text">
                {item.noOfItems || 1}
            </span>
            <button 
              onClick={increase}
              className="p-3 hover:bg-light-surface dark:hover:bg-dark-surface rounded-xl transition-colors text-light-text dark:text-dark-text"
            >
              <Plus size={22} strokeWidth={3} />
            </button>
          </div>

          <button 
            type="button" 
            className="flex-1 md:flex-none flex items-center justify-center gap-3 rounded-2xl bg-light-text dark:bg-dark-primary text-white dark:text-dark-bg font-black hover:opacity-90 px-12 py-4 transition-all shadow-lg active:scale-95 text-lg"
          >
            <ShoppingBag size={22} />
            CHECKOUT ITEM
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;