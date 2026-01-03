import React from 'react'
import { Productlist } from '../components/ProductList'
import { Outlet } from 'react-router-dom'

const ProductLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProductLayout
