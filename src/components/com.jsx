
  // 1. STYLED EMPTY CART CASE
  if (!selector.length && !submitStatus) {
    return (
     
    );
  }

  // 2. COMPLETED SUCCESS STATE
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
            to="/" 
            className="w-full bg-light-primary dark:bg-dark-primary text-white dark:text-dark-bg py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-lg"
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">

        {/* Left Column: Form */}
        <div className="w-full lg:w-[60%] bg-light-surface dark:bg-dark-surface p-10 rounded-[2.5rem] border border-light-border dark:border-dark-border shadow-sm h-fit">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-light-primary/10 text-light-primary rounded-xl">
              <Truck size={28} />
            </div>
            <h2 className="text-3xl font-black text-light-text dark:text-dark-text uppercase tracking-tight">
              Shipping Details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase ml-1 text-light-muted tracking-widest">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-light-primary" size={20} />
                        <input required className="w-full pl-12 pr-4 py-4 bg-light-bg dark:bg-dark-bg border-2 border-light-border dark:border-dark-border rounded-2xl focus:border-light-primary outline-none text-lg font-bold"
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase ml-1 text-light-muted tracking-widest">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-light-primary" size={20} />
                        <input required type="email" className="w-full pl-12 pr-4 py-4 bg-light-bg dark:bg-dark-bg border-2 border-light-border dark:border-dark-border rounded-2xl focus:border-light-primary outline-none text-lg font-bold"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-black uppercase ml-1 text-light-muted tracking-widest">Street Address</label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-5 text-light-primary" size={20} />
                    <textarea rows="2" required className="w-full pl-12 pr-4 py-4 bg-light-bg dark:bg-dark-bg border-2 border-light-border dark:border-dark-border rounded-2xl focus:border-light-primary outline-none text-lg font-bold"
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <input required placeholder="City" className="px-6 py-4 bg-light-bg dark:bg-dark-bg border-2 border-light-border dark:border-dark-border rounded-2xl focus:border-light-primary outline-none text-lg font-bold"
              onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
              <input required placeholder="Zip Code" className="px-6 py-4 bg-light-bg dark:bg-dark-bg border-2 border-light-border dark:border-dark-border rounded-2xl focus:border-light-primary outline-none text-lg font-bold"
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })} />
            </div>

            <button type="submit" className="w-full bg-light-primary dark:bg-dark-primary text-white dark:text-dark-bg py-6 rounded-2xl font-black text-xl hover:scale-[1.02] transition-all flex justify-center items-center gap-3 shadow-xl shadow-light-primary/20 mt-4">
              CONFIRM & PAY ${totals.grandTotal.toFixed(2)}
              <ArrowRight size={24} />
            </button>
          </form>
        </div>

        {/* Right Column: Summary Card */}
        <div className="w-full lg:w-[40%]">
          <div className="bg-light-text dark:bg-dark-surface p-8 rounded-[2.5rem] border border-light-border dark:border-dark-border shadow-2xl sticky top-8">
            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
              <Package className="text-light-primary" size={28} />
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                Your Order
              </h2>
            </div>

            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {totals.summary.map((product) => (
                <div key={product.id} className="flex gap-4 items-center">
                  <div className="relative">
                    <img src={product.images[0]} className="w-20 h-20 rounded-2xl bg-white object-contain p-2" alt={product.title} />
                    <span className="absolute -top-2 -right-2 bg-light-primary text-white text-xs font-black w-6 h-6 flex items-center justify-center rounded-full">
                        {product.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg line-clamp-1">{product.title}</h3>
                    <p className="text-light-primary text-sm font-black">${product.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
              <div className="flex justify-between text-white/60 font-bold uppercase text-xs tracking-widest">
                <span>Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-light-primary font-bold uppercase text-xs tracking-widest">
                <span>Total Discount</span>
                <span>-${totals.discountTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end pt-4">
                <span className="text-white font-black text-xl uppercase">Grand Total</span>
                <span className="text-4xl font-black text-light-primary">
                  ${totals.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;