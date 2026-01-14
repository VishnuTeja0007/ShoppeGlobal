import React from 'react';
import { Outlet } from 'react-router-dom';

// Layout wrapper for product-related routes
const ProductLayout = () => {
  return (
    <div>
      {/* Renders child routes */}
      <Outlet />
    </div>
  );
};

export default ProductLayout;
