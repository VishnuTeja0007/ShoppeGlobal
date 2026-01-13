import React from 'react'
import CartItem from './CartItem'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useSelector } from 'react-redux'
const Cart = () => {
   const [cartItems,setCartItems]=useState([])  
  const selector=useSelector((state)=>{return state.cart.cartItems})
  useEffect(()=>{
    setCartItems(selector)
  },[selector])
    if (!cartItems.length) {
      return (
        <div className="h-screen flex flex-col bg-light-bg dark:bg-dark-bg items-center justify-center gap-4 text-gray-600">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="text-sm">Browse products and add something you like.</p>
        </div>
      )
    }

   return (
    <div className="min-h-screen w-full bg-light-bg dark:bg-dark-bg py-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-8">
        
        {/* Cart Header */}
        <div className="w-full flex items-center justify-between mb-4">
          <h1 className="text-4xl font-black text-light-text dark:text-dark-text tracking-tighter uppercase">
            Your <span className="text-light-primary dark:text-dark-primary">Basket</span>
          </h1>
          <span className="text-lg font-bold text-light-muted bg-light-surface dark:bg-dark-surface px-4 py-2 rounded-2xl border border-light-border dark:border-dark-border">
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {cartItems.length > 0 ? (
          <div className="w-full flex flex-col gap-8 items-center">
            {cartItems.map((item) => {
              // Ensure we are passing all necessary props to our enhanced CartItem
              return (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  // Assuming logic for these is handled in parent or via dispatch
                  discountedPrice={(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                />
              );
            })}
            
            {/* Optional: Return to Shop Link */}
            <Link to="/products" className="flex items-center gap-2 text-light-primary font-black uppercase tracking-widest hover:underline mt-4">
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* Enhanced Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center gap-6 bg-light-surface dark:bg-dark-surface w-full rounded-[3rem] border-2 border-dashed border-light-border dark:border-dark-border">
            <div className="p-8 bg-light-bg dark:bg-dark-bg rounded-full text-light-muted opacity-50">
               <ShoppingCart size={80} strokeWidth={1} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-light-text dark:text-dark-text mb-2">Your cart is empty</h2>
              <p className="text-xl text-light-muted font-medium mb-8">Looks like you haven't added anything yet!</p>
              <Link 
                to="/products" 
                className="bg-light-primary dark:bg-dark-primary text-white dark:text-dark-bg px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-light-primary/20 transition-transform active:scale-95"
              >
                START SHOPPING
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default Cart
