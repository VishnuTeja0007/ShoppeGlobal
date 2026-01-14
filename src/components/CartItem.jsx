import { Trash2, Plus, Minus, ShoppingBag, AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart, decreaseCart, removeCart } from "../utils/cartSlicer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const CartItem = ({ item }) => {
  const [showWarning, setShowWarning] = useState(false);
  const dispatch = useDispatch();
  
  const discountedPrice = (item.price * (1 - item.discountPercentage / 100)).toFixed(2);

  // 1. Logic to handle the "Minimum Limit" warning
  const handleDecrease = () => {
    if (item.noOfItems <= 1) {
      setShowWarning(true);
    } else {
      dispatch(decreaseCart(item));
    }
  };

  // 2. Auto-hide the warning after 2 seconds
  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => setShowWarning(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  const increase = () => dispatch(addToCart(item));
  const remove = () => dispatch(removeCart(item));

  return (
    <div className="h-auto w-full flex flex-col md:flex-row items-center justify-start border-2 rounded-[2rem] p-6 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface gap-8 transition-all hover:border-light-primary/50 hover:shadow-xl group relative">
      
      {/* 📸 Image Container */}
      <div className="flex-shrink-0 bg-white p-4 rounded-2xl border border-light-border dark:border-dark-border shadow-inner">
        <img 
          src={item.images[0]} 
          alt={item.title} 
          loading="lazy"
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
            >
              <Trash2 size={24} />
          </button>
        </div>

        <h1 className="text-3xl font-black text-light-text dark:text-dark-text leading-tight -mt-2">
          {item.title}
        </h1>

        {/* 🏷️ Pricing */}
        <div className="flex items-center gap-4 py-2">
          <span className="text-4xl font-black text-light-text dark:text-dark-text">
            ${discountedPrice}
          </span>
          <span className="text-lg line-through text-light-muted">
            ${item.price}
          </span>
        </div>

        {/* 🛠️ Actions Section */}
        <div className="flex flex-wrap items-center justify-between gap-6 mt-4 pt-6 border-t border-light-border dark:border-dark-border relative">
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center border-2 rounded-2xl p-1 bg-white dark:bg-dark-bg transition-all ${showWarning ? 'border-rose-500 animate-bounce' : 'border-light-border dark:border-dark-border'}`}>
                <button 
                onClick={handleDecrease}
                className={`p-3 rounded-xl transition-colors ${item.noOfItems <= 1 ? 'text-light-muted' : 'text-light-text dark:text-dark-text hover:bg-light-surface'}`}
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

            {/* ⚠️ Dynamic Warning Tooltip */}
            {showWarning && (
                <div className="absolute -top-4 left-0 flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-2 rounded-full border border-rose-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                    <AlertCircle size={16} />
                    <span className="text-xs font-black uppercase">Minimum reached, Try Delete</span>
                </div>
            )}
          </div>
            <Link to="/checkout">
          <button 
            type="button" 
            className="flex-1 md:flex-none flex items-center justify-center gap-3 rounded-2xl bg-light-text dark:bg-dark-primary text-white dark:text-dark-bg font-black hover:opacity-90 px-12 py-4 transition-all shadow-lg active:scale-95 text-lg"
          >
            <ShoppingBag size={22} />
            CHECKOUT
          </button>
           
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItem;