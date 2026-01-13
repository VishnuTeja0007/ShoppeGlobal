import { StarIcon, Trash2, Plus, Minus } from "lucide-react";
import { useDispatch } from "react-redux";
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
    <div className= "h-auto w-[90%] flex flex-row md:flex-row items-center justify-start border-2 rounded-[2rem] p-6 border-teal-400 bg-white gap-8 transition-all hover:shadow-md">
      {/* Image Container */}
      <div className="flex-shrink-0">
        <img 
          src={item.images[0]} 
          alt={item.title} 
          className="h-48 w-48 md:h-64 md:w-64 object-contain rounded-2xl" 
        />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <span className="text-xs uppercase tracking-widest text-rose-500 font-bold">
          {item.category}
        </span>

        <h1 className="text-2xl font-bold text-gray-800 leading-tight">
          {item.title}
        </h1>

        <p className="text-gray-600 text-sm line-clamp-2">
          {item.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={classNames(
                  "h-4 w-4",
                  i < Math.round(item.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-gray-500">
            {item.rating} / 5
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black text-gray-900">
            ${discountedPrice}
          </span>
          <span className="text-sm line-through text-gray-400">
            ${item.price}
          </span>
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-lg font-bold">
            {item.discountPercentage}% OFF
          </span>
        </div>

        {/* Brand & Stock */}
        <div className="flex gap-4 text-xs text-gray-500 border-b pb-4">
          <span><strong>Brand:</strong> {item.brand}</span>
          <span><strong>Stock:</strong> {item.stock > 0 ? `${item.stock} left` : 'Out of stock'}</span>
        </div>

        {/* Footer Actions: Quantity + Buy + Delete */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
          
          {/* Plus/Minus Counter */}
          <div className="flex items-center border-2 border-gray-100 rounded-xl p-1 bg-gray-50">
            <button 
              onClick={decrease}
              className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600"
            >
              <Minus size={18} />
            </button>
            <span className="w-10 text-center font-bold text-gray-800">{item.noOfItems || 1}</span>
            <button 
              onClick={increase}
              className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="button" 
              className="rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-600 px-8 py-3 transition-colors shadow-sm"
            >
              Buy Now
            </button>
            
            <button 
              onClick={remove}
              className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:text-rose-500 hover:border-rose-200 transition-all hover:bg-rose-50"
              title="Remove from cart"
            >
              <Trash2 size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;