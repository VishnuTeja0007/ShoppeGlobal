import React from 'react'
// import { Header } from '../components/Header'
import { Productlist } from '../components/ProductList'
import { Outlet } from 'react-router-dom'

const Product = () => {
  return (
    <div>
      <Productlist />
    </div>
  )
}

export default Product
