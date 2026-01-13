
import { createRoot } from 'react-dom/client'
import "./index.css";
import {createBrowserRouter} from "react-router-dom";
import RouterLayout from "./Layout/RouterLayout"
import Home from './pages/Home'
import ProductLayout from './Layout/ProductLayout'
import {Productlist} from './components/ProductList'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import {ErrorState} from './components/Error'
import {RouterProvider} from "react-router-dom"
import { getDetails } from './Loader/getDetails'
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <RouterLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <ProductLayout />,
        children: [
          {
            index: true,
            element: <Productlist />,
          },
          {
            path: ':id',
            element: <ProductDetailPage />,
            loader: getDetails, // Keep your loader functions here
          },
        ],
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: '*',
        element: (
          <ErrorState
            status={404}
            title="Page not found"
            message="try valid routes"
          />
        ),
      },
    ],
  },
]);
  

createRoot(document.getElementById('root')).render(

<RouterProvider router={appRouter}></RouterProvider>
)
