import React from 'react'
import CartItem from './CartItem'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
const Cart = () => {
   const [cartItems,setCartItems]=useState([])  
  const selector=useSelector((state)=>{return state.cart.cartItems})
  console.log(selector)
  useEffect(()=>{
    setCartItems(selector)
  },[selector])
    return (
    <div className='h-screen w-auto'>
      {
        cartItems.map((item)=>{
          return <CartItem key={item.id} item={item}/>
        })
      }
    </div>
  )
}

export default Cart
