import React from "react";
import { NavLink } from "react-router-dom";
import { Facebook, Twitter, Disc, Github, Dribbble, ShoppingBag } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-surface xxs:p-4 md:p-3 dark:bg-dark-surface border-t border-light-border dark:border-dark-border transition-colors duration-300">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1 xxs:col-span-2 md:col-span-1">
            <NavLink to="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-light-primary dark:text-dark-primary">ShoppyGlobe</span>
            </NavLink>
            <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed max-w-xs">
              Your one-stop destination for modern software and hardware solutions. Simplifying global commerce since 2023.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-6 text-sm font-bold text-light-text dark:text-dark-text uppercase tracking-wider">Store</h2>
            <ul className="text-light-muted dark:text-dark-muted font-medium space-y-4">
              <li>
                <NavLink to="/products" className="hover:text-dark-primary transition-colors">Products</NavLink>
              </li>
              <li>
                <NavLink to="/cart" className="hover:text-dark-primary transition-colors">Your Cart</NavLink>
              </li>
              <li>
                <NavLink to="/checkout" className="hover:text-dark-primary transition-colors">Checkout</NavLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="mb-6 text-sm font-bold text-light-text dark:text-dark-text uppercase tracking-wider">Help Center</h2>
            <ul className="text-light-muted dark:text-dark-muted font-medium space-y-4">
              <li>
                <a href="#" className="hover:text-dark-primary transition-colors">Discord Server</a>
              </li>
              <li>
                <a href="#" className="hover:text-dark-primary transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-dark-primary transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Misc */}
          <div>
            <h2 className="mb-6 text-sm font-bold text-light-text dark:text-dark-text uppercase tracking-wider">Connect</h2>
            <p className="text-xs text-light-muted dark:text-dark-muted mb-4">
              Stay updated with our latest releases and tech news.
            </p>
            <div className="flex gap-4">
               {/* Replace raw SVGs with Lucide for consistency */}
               <Facebook className="w-5 h-5 cursor-pointer hover:text-dark-primary text-light-muted transition-colors" />
               <Twitter className="w-5 h-5 cursor-pointer hover:text-dark-primary text-light-muted transition-colors" />
               <Disc className="w-5 h-5 cursor-pointer hover:text-dark-primary text-light-muted transition-colors" />
               <Github className="w-5 h-5 cursor-pointer hover:text-dark-primary text-light-muted transition-colors" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-light-border dark:border-dark-border flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-light-muted dark:text-dark-muted">
            © {currentYear} <NavLink to="/" className="hover:underline">Shoppe Shop™</NavLink>. All Rights Reserved.
          </span>
          
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Status: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



