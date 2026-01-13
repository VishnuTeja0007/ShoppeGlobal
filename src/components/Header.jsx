import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [showHamburger, setShowHamburger] = useState(true);
  const [cartItems, setCartItems] = useState(0)
  const selector = useSelector((state) => { return state.cart.totalQuantity })

  useEffect(() => {
    setCartItems(selector)
  }, [selector])
  // Sync theme with HTML root
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  // Show/hide hamburger based on window width (<= 500px)
  useEffect(() => {
    function handleResize() {
      const shouldShow = window.innerWidth <= 500;
      setShowHamburger(shouldShow);
      if (!shouldShow) setOpen(false);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-light-surface dark:bg-dark-surface text-md font-semibold border-b  border-light-border dark:border-dark-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <NavLink
            to="/"
            className="text-2xl  font-bold text-light-primary dark:text-dark-primary"
          >
            ShoppyGlobe
          </NavLink>

          {/* TABLET MENU (500px - 767px) */}
          {/* Theme Toggle */}

          <div className={`${showHamburger ? 'hidden' : 'flex'} items-center gap-6`}>
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors"
              aria-label="Toggle theme">
              {dark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
             <NavLink to="/" className="text-light-text active:text-light-text-300 dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors">
              Home
            </NavLink>

            <NavLink to="/products" className="text-light-text active:text-light-text-300 dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors">
              Products
            </NavLink>

            <NavLink to="/products-details" className="text-light-text active:text-light-text-300 dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors">
              Product details
            </NavLink>
            <NavLink to="/checkout" className="text-light-text dark:text-dark-text active:text-light-text-300 hover:text-light-primary dark:hover:text-dark-primary transition-colors">
              Checkout
            </NavLink>
            {/* Cart */}
            <NavLink to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors" />
              <span className="absolute -top-2 dark:text-black -right-2 bg-light-accent dark:bg-dark-accent text-white text-xs px-1.5 rounded-full">
                {cartItems}
              </span>
            </NavLink>
          </div>

        

          {/* MOBILE HAMBURGER (only when <= 500px) */}
          {showHamburger && (
            <div className="md:hidden flex items-center gap-3">
              {/* Theme Toggle (Mobile) */}
              <button
                onClick={() => setDark(!dark)}
                className="p-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors"
              >
                {dark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>

              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                aria-label="Toggle menu"
              >
                {open ? <X className="w-6 h-6 text-light-text dark:text-dark-text" /> : <Menu className="w-6 h-6 text-light-text dark:text-dark-text" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && showHamburger && (
        <div className="md:hidden absolute top-[70px] right-0 w-[70%] bg-white/90 font-bold flex  flex-row items-center justify-center bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border">
          <div className="flex flex-col gap-4 p-4">
            <NavLink to="/" className="text-light-text  active:text-light-text-300 dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors">
              Home
            </NavLink>
               <NavLink to="/products" className="text-light-text  active:text-light-text-300 dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors">
              Products
            </NavLink>

            <NavLink to="/products-details" className="text-light-text active:text-light-text-300 dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors">
              Product details
            </NavLink>
            <NavLink to="/checkout" className="text-light-text dark:text-dark-text active:text-light-text-300 hover:text-light-primary dark:hover:text-dark-primary transition-colors">
              Checkout
            </NavLink>

            <NavLink to="/cart" className="flex items-center active:text-light-text-300 gap-2 text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors py-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              <span className="ml-auto bg-light-accent dark:bg-dark-accent text-white dark:text-black text-xs px-1.5 rounded-full">{cartItems}</span>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
