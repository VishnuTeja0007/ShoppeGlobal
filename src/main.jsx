import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import Error from './components/Error';
import "./index.css";
import Loading from './components/Loading';
import ProductLayout from './Layout/ProductLayout';
// Lazy load components for code splitting
const ProductList = lazy(() => import('./components/ProductList'));
const Home = lazy(() => import('./pages/Home'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));

// Define application routes with lazy loading and error handling
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: 'products',
        element: <ProductLayout />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <ProductList />
              </Suspense>
            )
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<Loading />}>
                <ProductDetailPage />
              </Suspense>
            )
          },
          {
            path: '*',
            element: <Error />,
          }
        ],
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<Loading />}>
            <CartPage />
          </Suspense>
        )
      },
      {
        path: 'checkout',
        element: (
          <Suspense fallback={<Loading />}>
            <CheckoutPage />
          </Suspense>
        )
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter} />
);
