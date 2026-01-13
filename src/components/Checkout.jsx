import React, { useMemo, useState } from 'react';
import {
  Package,
  Truck,
  User,
  Mail,
  MapPin,
  CheckCircle,
  Tag
} from 'lucide-react';
import { useSelector } from 'react-redux';

const CheckoutPage = () => {
  const selector = useSelector((state) => state.cart.cartItems);

  const totals = useMemo(() => {
    const summary = selector.map((product) => {
      const qty = product.noOfItems ?? 1;
      const discountAmount = product.price * (product.discountPercentage / 100);
      const totalAmount = (product.price - discountAmount) * qty;
      return { ...product, qty, discountAmount: discountAmount * qty, totalAmount };
    });
    const subtotal = summary.reduce((acc, item) => acc + item.price * item.qty, 0);
    const discountTotal = summary.reduce((acc, item) => acc + item.discountAmount, 0);
    const grandTotal = Math.max(0, subtotal - discountTotal);
    return { summary, subtotal, discountTotal, grandTotal };
  }, [selector]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Success! Shipping to ${formData.city}`);
  };

  if (!selector.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg text-light-muted dark:text-dark-muted">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-semibold text-light-text dark:text-dark-text">
            Your cart is empty
          </h1>
          <p className="text-sm">Add items to review and checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-auto bg-light-bg dark:bg-dark-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">

        {/* Left Column */}
        <div className="w-full md:w-[60%] bg-light-surface dark:bg-dark-surface p-8 rounded-2xl border border-light-border dark:border-dark-border">
          <div className="flex items-center gap-2 mb-8">
            <CheckCircle className="text-light-primary dark:text-dark-primary" size={24} />
            <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
              Delivery Information
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div>
              <label className="text-xs font-bold uppercase mb-1 block ml-1 text-light-muted">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-light-muted" size={18} />
                <input
                  required
                  className="w-full pl-10 pr-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:ring-2 focus:ring-light-primary outline-none text-light-text dark:text-dark-text"
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-bold uppercase mb-1 block ml-1 text-light-muted">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-light-muted" size={18} />
                <input
                  required
                  type="email"
                  className="w-full pl-10 pr-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:ring-2 focus:ring-light-primary outline-none text-light-text dark:text-dark-text"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-xs font-bold uppercase mb-1 block ml-1 text-light-muted">
                Shipping Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-light-muted" size={18} />
                <textarea
                  rows="2"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:ring-2 focus:ring-light-primary outline-none text-light-text dark:text-dark-text"
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>

            {/* City / Zip */}
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                placeholder="City"
                className="px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:ring-2 focus:ring-light-primary outline-none text-light-text dark:text-dark-text"
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
              <input
                required
                placeholder="Zip Code"
                className="px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:ring-2 focus:ring-light-primary outline-none text-light-text dark:text-dark-text"
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-light-primary dark:bg-dark-primary text-white dark:text-dark-bg py-4 rounded-xl font-bold hover:opacity-90 transition flex justify-center items-center gap-2"
            >
              Confirm and Pay ${totals.grandTotal.toFixed(2)}
            </button>
          </form>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-[40%] space-y-6">
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl border border-light-border dark:border-dark-border">
            <div className="flex items-center gap-2 mb-6">
              <Package className="text-light-secondary" size={24} />
              <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
                Order Summary
              </h2>
            </div>

            {totals.summary.map((product) => (
              <div key={product.id} className="mb-4 border-b border-light-border dark:border-dark-border pb-4">
                <div className="flex gap-4">
                  <img
                    src={product.thumbnail}
                    className="w-20 h-20 rounded-xl bg-light-bg object-cover border"
                    alt={product.title}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-light-text dark:text-dark-text">
                      {product.title}
                    </h3>
                    <p className="text-xs uppercase text-light-muted">{product.brand}</p>
                    <div className="flex items-center gap-1 mt-2 text-sm text-light-primary">
                      <Truck size={14} />
                      <span>{product.shipping}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-light-muted">
                    <span>Original Price</span>
                    <span>${product.price} x {product.qty}</span>
                  </div>
                  <div className="flex justify-between text-light-accent font-medium">
                    <span className="flex items-center gap-1">
                      <Tag size={14} />
                      Discount
                    </span>
                    <span>- ${product.discountAmount.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-light-border dark:border-dark-border flex justify-between">
                    <span className="font-bold text-light-text dark:text-dark-text">
                      Total
                    </span>
                    <span className="text-xl font-bold text-light-text dark:text-dark-text">
                      ${product.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
