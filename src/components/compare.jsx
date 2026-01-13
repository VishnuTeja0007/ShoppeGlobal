import { 
  StarIcon, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Package, 
  ShoppingCart, 
  Zap,
  CheckCircle2,
  Minus,
  Plus
} from "lucide-react";
import useFetch from "../utils/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import Error from "./Error"; 
import Loading from "./Loading";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, loading, error] = useFetch(`https://dummyjson.com/products/${id}`);

  if (loading){
 return (
 <div className="h-screen w-full flex items-center justify-center">
    <Loading/>
    </div>
  )
}      
  if (error) {
return (
<div className="h-screen w-full flex items-center justify-center">
    <Error/>
    </div>
)
  }
      if (!data) return null;


  const discountedPrice = (data.price * (1 - data.discountPercentage / 100)).toFixed(2);


  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Main Grid: Image + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden group">
              <img 
                src={data.images[0]} 
                alt={data.title}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Spec Chips */}
            <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Weight</p>
                    <p className="font-semibold text-sm">{data.weight}g</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Width</p>
                    <p className="font-semibold text-sm">{data.dimensions.width}"</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400">SKU</p>
                    <p className="font-semibold text-[10px] truncate">{data.sku}</p>
                </div>
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="flex flex-col">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <span className="capitalize">{data.category}</span>
              <span>/</span>
              <span className="font-medium text-slate-600">{data.brand}</span>
            </nav>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2 leading-tight">
              {data.title}
            </h1>

            {/* Rating Bar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex bg-amber-50 px-2 py-1 rounded-lg">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    size={16}
                    className={classNames(
                      i < Math.round(data.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-900">{data.rating}</span>
              <span className="text-sm text-slate-400 border-l pl-4 border-slate-200">
                {data.reviews.length} Customer Reviews
              </span>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {data.description}
            </p>

            {/* Pricing Card */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl mb-8 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-slate-400 text-sm mb-1 font-medium">Special Price</p>
                    <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-black">${discountedPrice}</span>
                        <span className="text-slate-400 line-through font-medium">${data.price}</span>
                        <span className="bg-rose-500 text-[10px] px-2 py-1 rounded-full font-black animate-pulse">
                            {data.discountPercentage}% OFF
                        </span>
                    </div>
                </div>
                <Zap className="absolute right-[-10px] bottom-[-10px] text-white/5" size={120} />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 border border-slate-100 rounded-2xl bg-white shadow-sm">
                    <Truck className="text-indigo-500" size={20} />
                    <div>
                        <p className="text-sm font-bold">{data.shippingInformation}</p>
                        <p className="text-xs text-slate-400">Fast home delivery</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4 border border-slate-100 rounded-2xl bg-white shadow-sm">
                    <ShieldCheck className="text-green-500" size={20} />
                    <div>
                        <p className="text-sm font-bold">{data.warrantyInformation}</p>
                        <p className="text-xs text-slate-400">Manufacturer coverage</p>
                    </div>
                </div>
            </div>

            {/* Buy Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm mb-2">
                    <Package size={16} className={data.stock > 10 ? "text-green-500" : "text-amber-500"} />
                    <span className="font-bold">{data.stock} items left in stock</span>
                </div>
                <div className="flex gap-4">
                    <button className="flex-1 bg-white border-2 border-slate-900 text-slate-900 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95">
                        <ShoppingCart size={20} />
                        ADD TO CART
                    </button>
                    <button className="flex-[1.5] bg-rose-500 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all active:scale-95">
                        BUY NOW
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Reviews */}
        <div className="border-t border-slate-100 pt-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black tracking-tight">Verified Reviews</h2>
                <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full">
                    <CheckCircle2 size={18} />
                    <span className="text-sm">100% Genuine Products</span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.reviews.map((rev, idx) => (
                    <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                        <div>
                            <div className="flex gap-1 mb-3">
                                {[...Array(rev.rating)].map((_, i) => (
                                    <StarIcon key={i} size={14} className="fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-slate-700 font-medium italic mb-4">"{rev.comment}"</p>
                        </div>
                        <div className="flex items-center gap-3 pt-4 border-t border-slate-200/50">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                {rev.reviewerName.charAt(0)}
                            </div>
                            <div>
                                <p className="text-xs font-bold">{rev.reviewerName}</p>
                                <p className="text-[10px] text-slate-400">{new Date(rev.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
