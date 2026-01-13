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
import { useParams, useNavigate, Link } from "react-router-dom";
import Error from "./Error"; 
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlicer";

import { 
  Star, 
  Ruler, Weight, Hash 
} from "lucide-react";
import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}  


export default function ProductDetail() {
   
  const dispatch = useDispatch();

  function addItemToCart(item) {
    dispatch(addToCart({ ...item, noOfItems: 1 }));
  }

  const { id } = useParams();

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

  // Add safe fallbacks for optional fields
  const mainImage = data.images?.[0] ?? data.thumbnail ?? "";
  const reviews = Array.isArray(data.reviews) ? data.reviews : [];

  const discountedPrice = (data.price * (1 - data.discountPercentage / 100)).toFixed(2);
  const renderStars = (rating) => (
    <div className="flex items-center gap-1 text-light-accent dark:text-dark-accent">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={24} // Increased Icon Size
          fill={i < Math.round(rating) ? "currentColor" : "none"}
          className={i < Math.round(rating) ? "" : "text-light-muted/30"}
        />
      ))}
    </div>
  );

 return (
  <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors">
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">

        {/* LEFT */}
        <div className="space-y-6">
          <div className="aspect-square rounded-3xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border overflow-hidden">
            <img
              src={data.images[0]}
              alt={data.title}
              className="w-full h-full object-contain p-6"
            />
          </div>

          {/* Spec Chips */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Weight", value: `${data.weight}g`, icon: Weight },
              { label: "Width", value: `${data.dimensions.width}"`, icon: Ruler },
              { label: "SKU", value: data.sku, icon: Hash },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 text-center bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border"
              >
                <item.icon size={22} className="mx-auto mb-2 text-light-primary" />
                <p className="text-xs uppercase font-semibold text-light-muted">
                  {item.label}
                </p>
                <p className="text-lg font-semibold text-light-text dark:text-dark-text truncate">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col">
          <nav className="text-sm font-semibold text-light-muted mb-3">
            {data.category}{" "}
            <span className="mx-1">/</span>
            <span className="text-light-text dark:text-dark-text">
              {data.brand}
            </span>
          </nav>

          <h1 className="text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
            {data.title}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            {renderStars(data.rating)}
            <span className="font-semibold text-light-text dark:text-dark-text">
              {data.rating}
            </span>
            <span className="text-sm text-light-muted">
              ({reviews.length} reviews)
            </span>
          </div>

          <p className="text-lg leading-relaxed text-light-muted dark:text-dark-muted mb-8">
            {data.description}
          </p>

          {/* Pricing Card */}
          <div className="rounded-3xl p-6 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border mb-8">
            <p className="text-sm font-semibold text-light-muted mb-1">
              Special Price
            </p>
            <div className="flex items-end gap-4">
              <span className="text-4xl font-bold text-light-text dark:text-dark-text">
                ${discountedPrice}
              </span>
              <span className="line-through text-light-muted text-lg">
                ${data.price}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-light-primary/20 text-light-primary">
                {data.discountPercentage}% OFF
              </span>
            </div>
          </div>

          {/* Buy Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Package
                size={18}
                className={data.stock > 10 ? "text-green-500" : "text-amber-500"}
              />
              <span className="font-semibold text-light-text dark:text-dark-text">
                {data.stock} in stock
              </span>
            </div>

            <div className="flex gap-4">
              {/* Secondary */}
              <button
                onClick={() => addItemToCart(data)}
                className="flex-1 h-14 rounded-2xl border border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-semibold flex items-center justify-center gap-2 hover:bg-light-surface dark:hover:bg-dark-surface transition"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              {/* Primary */}
              <Link to="/checkout" className="flex-1">
                <button className="w-full h-14 rounded-2xl bg-light-primary dark:bg-dark-primary text-white dark:text-dark-bg font-semibold hover:opacity-90 transition">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="border-t border-light-border dark:border-dark-border pt-14">
        <h2 className="text-2xl font-bold mb-8 text-light-text dark:text-dark-text">
          Customer Reviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < rev.rating ? "currentColor" : "none"}
                    className="text-light-accent"
                  />
                ))}
              </div>

              <p className="text-lg font-semibold mb-5 text-light-text dark:text-dark-text">
                “{rev.comment}”
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-light-border dark:border-dark-border">
                <div className="w-9 h-9 rounded-full bg-light-primary/20 flex items-center justify-center font-bold text-light-primary">
                  {rev.reviewerName?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-light-text dark:text-dark-text">
                    {rev.reviewerName}
                  </p>
                  <p className="text-xs text-light-muted">
                    {new Date(rev.date).toLocaleDateString()}
                  </p>
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
