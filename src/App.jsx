
import "./index.css"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import RouterLayout from './Layout/RouterLayout'
import Home from './pages/Home'
import Product from './pages/Product'
import ProductDetailPage from "./pages/ProductDetailPage"
import CheckoutPage from "./pages/CheckoutPage"
import CartPage from './pages/CartPage'
import { ErrorState } from "./components/Error"
import ProductLayout from "./Layout/ProductLayout"
import { Productlist } from "./components/ProductList"
import { getDetails } from "./Loader/getDetails"

function App() {
  
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RouterLayout/>}>
      <Route index element={<Home/>} />
      <Route path='products' element={<ProductLayout/>}>
          <Route index element={<Productlist></Productlist>}/>
          <Route path=':id' element={<ProductDetailPage />} loader={getDetails} />
      </Route>
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route
        path="*"
        element={
          <ErrorState
            status={404}
            title="Page not found"
            message="try valid routes"
          />
        }
      />
    </Route>
  ))
  
  
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
