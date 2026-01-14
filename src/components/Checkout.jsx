import React, { useEffect, useMemo, useState } from 'react';
import {
  Package, Truck, User, Mail, MapPin,
  CheckCircle, Tag, ShoppingBag, ArrowRight,
  ChevronLeft, PartyPopper
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { clearCart } from '../utils/cartSlicer';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const [submitStatus, setSubmitStatus] = useState(false);
  const selector = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
const navigate=useNavigate()
  const totals = useMemo(() => {
    const summary = selector.map((product) => {
      const qty = product.noOfItems || 1;
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

  useEffect(()=>{
    if(submitStatus){
      setTimeout(()=>{
        navigate("/")
      },2000)
    }
  },[submitStatus])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    setSubmitStatus(true);


  };

  if (!selector.length && !submitStatus) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-6">
        <div className="max-w-md w-full text-center space-y-8 p-12 bg-light-surface dark:bg-dark-surface rounded-[3rem] border-2 border-dashed border-light-border dark:border-dark-border">
          <div className="relative mx-auto w-24 h-24 bg-light-primary/10 rounded-full flex items-center justify-center text-light-primary">
            <ShoppingBag size={48} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-light-text dark:text-dark-text uppercase tracking-tighter">
              Nothing in Here
            </h1>
            <p className="text-light-muted mt-2 font-medium text-lg">
              Add some premium items to your basket to proceed with checkout.
            </p>
          </div>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 bg-light-text dark:bg-dark-primary text-white dark:text-dark-bg px-8 py-4 rounded-2xl font-black transition-transform active:scale-95 shadow-xl"
          >
            <ChevronLeft size={20} />
            BACK TO SHOP
          </Link>
        </div>
      </div>
    );
  }
   if (submitStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-6">
        <div className="max-w-xl w-full bg-light-surface dark:bg-dark-surface p-12 rounded-[3rem] border border-light-border dark:border-dark-border text-center shadow-2xl">
          <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <PartyPopper size={48} />
          </div>
          <h1 className="text-4xl font-black text-light-text dark:text-dark-text mb-4 uppercase tracking-tighter">
            Order Confirmed!
          </h1>
          <p className="text-xl text-light-muted mb-8 leading-relaxed">
            Thank you, <span className="text-light-primary font-black">{formData.fullName}</span>. 
            A confirmation email has been sent to <span className="text-light-text dark:text-dark-text underline">{formData.email}</span>.
          </p>
          <div className="bg-light-bg dark:bg-dark-bg p-6 rounded-2xl mb-10 text-left border border-light-border dark:border-dark-border">
             <p className="text-xs font-black text-light-primary uppercase mb-2 tracking-widest">Shipping to:</p>
             <p className="text-light-text dark:text-dark-text font-bold">{formData.address}, {formData.city} - {formData.zipCode}</p>
          </div>
          <Link 
            to="/products" 
            className="w-full bg-light-primary dark:bg-dark-primary text-white dark:text-dark-bg py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-lg"
          >
            Browse More
          </Link>
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
      placeholder="John Doe"
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
      placeholder="your.email@example.com"
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
      placeholder="123 Main St, Apt 4B"
      className="w-full pl-10 pr-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:ring-2 focus:ring-light-primary outline-none text-light-text dark:text-dark-text"
      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
    />
  </div>
</div>

{/* City / Zip */}
<div className="grid grid-cols-2 gap-4">
  <div>
    <label className="text-xs font-bold uppercase mb-1 block ml-1 text-light-muted">
    City
  </label>
    <input
      required
      placeholder="New York"
      className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:ring-2 focus:ring-light-primary outline-none text-light-text dark:text-dark-text"
      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
    />
  </div>
  <div>
     <label className="text-xs font-bold uppercase mb-1 block ml-1 text-light-muted">
    Zip Code
  </label>
    <input
      required
      placeholder="10001"
      className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:ring-2 focus:ring-light-primary outline-none text-light-text dark:text-dark-text"
      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
    />
  </div>
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
                    loading='lazy'
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
