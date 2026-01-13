import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlicer";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useEffect } from "react";

export function ProductItem(props) {
  const dispatch = useDispatch();

  function addItemToCart(item) {
    // Ensuring we pass a clean object to the dispatcher
    console.log("dispatch called")
    dispatch(addToCart({ ...item, noOfItems: 1 }));
  }
 

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5 text-light-accent dark:text-dark-accent">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={14}
            fill={index < Math.round(rating) ? "currentColor" : "none"}
            className={index < Math.round(rating) ? "" : "text-light-muted/30"}
          />
        ))}
        <span className="ml-2 text-xs text-light-muted dark:text-dark-muted">({rating})</span>
      </div>
    );
  };

  return (
    <div className="group relative flex flex-col w-full max-w-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl overflow-hidden hover:border-light-primary/50 dark:hover:border-dark-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* Product Image Wrapper */}
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          src={props.images[0]}
          alt={props.title}
          loading="lazy"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-light-primary dark:bg-dark-primary text-white dark:text-dark-bg rounded-md shadow-sm">
          {props.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-light-text dark:text-dark-text text-lg font-bold line-clamp-1 mb-1 group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
          {props.title}
        </h2>
        
        <div className="mb-3">
          {renderStars(props.rating)}
        </div>

        <p className="text-light-muted dark:text-dark-muted text-sm line-clamp-2 mb-4 h-10">
          {props.description}
        </p>

        {/* Price Tag */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-light-muted dark:text-dark-muted font-medium">Price</span>
            <span className="text-xl font-black text-light-text dark:text-dark-text">
              ₹{props.price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Link 
            to={`/products/${props.id}`}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold border border-light-border dark:border-dark-border text-light-text dark:text-dark-text rounded-xl hover:bg-light-bg dark:hover:bg-dark-bg transition-all"
          >
            <Eye size={16} />
            Details
          </Link>
          
          <button
            onClick={() => addItemToCart(props)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-light-primary dark:bg-dark-primary text-white dark:text-dark-bg rounded-xl shadow-lg shadow-light-primary/20 dark:shadow-dark-primary/20 hover:opacity-90 active:scale-95 transition-all"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}