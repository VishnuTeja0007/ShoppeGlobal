# ShoppyGlobe - Modern E-commerce Application

ShoppyGlobe is a feature-rich, responsive e-commerce application built with React, Redux Toolkit, and Tailwind CSS. It focuses on performance, user experience, and modern code practices including lazy loading and efficient state management.

## Core Features

-   **Dynamic Product Listing**: Browse products with real-time search functionality.
-   **Product Details**: Detailed view of individual products with images, ratings, and descriptions.
-   **Shopping Cart**: Fully functional cart with add, remove, and update quantity features.
-   **Checkout Process**: streamlined checkout flow with order summary and form validation.
-   **Responsive Design**: Mobile-first approach ensuring seamless experience across all devices.
-   **Dark/Light Mode**: Built-in theme toggler for user preference.
-   **Performance Optimized**: Implements code splitting and lazy loading for faster initial load times.

## Project Structure

The project follows a modular directory structure:

```
src/
├── components/         # Reusable UI components
│   ├── Body.jsx        # Landing page content
│   ├── Cart.jsx        # Cart functionality
│   ├── Header.jsx      # Navigation and search
│   └── ...             # Other components
├── pages/              # Page-level components
│   ├── Home.jsx        # Home page
│   ├── CartPage.jsx    # Cart route wrapper
│   └── ...             # Other pages
├── utils/              # Utility functions and Redux logic
│   ├── appStore.js     # Redux store configuration
│   ├── cartSlicer.js   # Cart state logic
│   └── useFetch.js     # Custom data fetching hook
├── Layout/             # Layout wrappers
└── ...
```

## Routes & Navigation

The application uses `react-router-dom` for client-side routing:

-   `/`: **Home** - Landing page with featured content.
-   `/products`: **Product List** - Searchable grid of all available products.
-   `/products/:id`: **Product Detail** - Individual product information.
-   `/cart`: **Cart** - Review selected items and total cost.
-   `/checkout`: **Checkout** - Finalize purchase (simulated).
-   `*`: **Error 404** - Custom error page for invalid routes.

## Lazy Loading & Code Splitting

To ensure optimal performance, this application utilizes **React.lazy** and **Suspense**. This means code is split into smaller bundles and loaded only when needed.

-   **Route-based Splitting**: Main pages like `ProductList`, `CartPage`, and `CheckoutPage` are lazy-loaded.
-   **Implementation**:
    ```javascript
    const ProductList = lazy(() => import('./components/ProductList'));
    // ...
    <Suspense fallback={<Loading />}>
      <ProductList />
    </Suspense>
    ```
-   **Benefit**: drastically reduces the initial bundle size, leading to faster page loads for the user.

## Components Overview

-   **Header**: Contains the logo, navigation links, search bar toggle (mobile), cart counter, and theme switch.
-   **ProductItem**: A reusable card component displaying product thumbnail, title, price, and rating.
-   **CartItem**: Manages individual items in the cart, allowing quantity adjustment and removal.
-   **Loading**: A custom animated loader displayed during data fetching or lazy loading transitions.
-   **Error**: A user-friendly error page that handles 404s and other route errors.

## State Management

Global state is managed using **Redux Toolkit**:

-   **Cart Slice**: Handles adding items, removing items, updating quantities, and clearing the cart.
-   **Search Slice**: Manages the global search query state to filter products across components.
-   **Custom Hooks**: `useFetch` is used for efficient API data retrieval with loading and error states.

## Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **Build for production**:
    ```bash
    npm run build
    ```
### Tech Stack
-    React 19 + Vite
-    Tailwind CSS v4
-    React Router for routing
-    Lucide/react-icons for UI icons
### Contact
-    WhatsApp: 6302272812
-    Email: vishnuteja98765@gmail.com
-    GitHub: https://github.com/VishnuTeja0007/ShoppeGlobal
