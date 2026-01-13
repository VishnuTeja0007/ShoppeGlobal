import React, { useMemo, useState } from 'react';

import { 
  Package, 
  Truck, 
  User, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Tag, 
  Info 
} from 'lucide-react';
import { useSelector } from 'react-redux';
const CheckoutPage = () => {
  const selector=useSelector((state)=>state.cart.cartItems)
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
    alert(`Success! Shipping to ${formData.city} via Overnight Delivery.`);
  };

  if (!selector.length) {
    return (
      <div className="min-h-screen s:flex-col md:flex items-center justify-center bg-slate-50 text-gray-700">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>
          <p className="text-sm">Add items to review and checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl xxs:flex-col mx-auto flex  md:flex-row items-center justify-between gap-8">
        
         {/* Left Column: Delivery Form (60%) */}
        <div className= "xxs:w-full md:w-[60%] bg-white p-8 rounded-2xl shadow-md border border-slate-100">
          <div className="flex items-center gap-2 mb-8">
            <CheckCircle className="text-green-500" size={24} />
            <h2 className="text-xl font-bold text-slate-800">Delivery Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  required
                  placeholder="Benjamin Wilson"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  placeholder="benjamin@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block ml-1">Shipping Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                <textarea
                  required
                  rows="2"
                  placeholder="Street name and house number"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none"
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block ml-1">City</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none"
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div className="relative">
                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block ml-1">Zip Code</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none"
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transform transition-all active:scale-[0.98] shadow-lg flex justify-center items-center gap-2"
            >
              Confirm and Pay ${totals.grandTotal.toFixed(2)}
            </button>
          </form>
        </div>
        {/* right Column: Order Summary (40%) */}
        <div  className="xxs:w-full md:w-[40%] space-y-6">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <Package className="text-red-500" size={24} />
              <h2 className="text-xl font-bold text-slate-800">Order Summary</h2>
            </div>

        {
          totals.summary.map((product)=>(
        <div  key={product.id} className='mb-4 border-b-2 p-2 border-b-gray-400'> 
            <div className="flex gap-4 pb-6 border-b  border-slate-100">
              <img 
                src={product.thumbnail} 
                className="w-20 h-20 rounded-xl bg-slate-50 object-cover border shadow-sm"
                alt="Product"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{product.title}</h3>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{product.brand}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-medium">
                  <Truck size={14} />
                  <span>{product.shipping}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Original Price</span>
                <span>${product.price} x {product.qty}</span>
              </div>
              <div className="flex justify-between text-red-500 text-sm font-medium">
                <div className="flex items-center gap-1">
                  <Tag size={14} />
                  <span>Discount ({product.discountPercentage}%)</span>
                </div>
                <span>-${product.discountAmount.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
                <span className="text-slate-900 font-bold">Total Amount</span>
                <span className="text-2xl font-black text-slate-900">${product.totalAmount.toFixed(2)}</span>
              </div>
            </div>
            </div>
          ))
        }
          </div>

          
          
        </div>

       
      </div>
    </div>
  );
};

export default CheckoutPage;