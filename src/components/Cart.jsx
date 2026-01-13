import React from 'react'
import CartItem from './CartItem'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
const Cart = () => {
   const [cartItems,setCartItems]=useState([])  
  const selector=useSelector((state)=>{return state.cart.cartItems})
  useEffect(()=>{
    setCartItems(selector)
  },[selector])
    if (!cartItems.length) {
      return (
        <div className="h-screen flex flex-col items-center justify-center gap-4 text-gray-600">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="text-sm">Browse products and add something you like.</p>
        </div>
      )
    }

    return (
      <div className='h-auto w-auto p-4 flex flex-col items-center justify-center gap-4'>
        {
          cartItems.map((item)=>{
            console.log(item)
            return <CartItem key={item.id} item={item}/>
          })
        }
      </div>
    )
  
}

export default Cart
