import React from "react";
import { NavLink } from "react-router-dom";
import { 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Moon, 
  Database,
  ArrowRight, 
  ShoppingCart 
} from "lucide-react";

// Component for displaying individual feature cards with animation
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <div 
    className={`group p-8 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:border-dark-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 animate-slide-up`}
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
  >
    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary mb-6 group-hover:rotate-12 transition-transform duration-300">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-light-text dark:text-dark-text">
      {title}
    </h3>
    <p className="text-light-muted dark:text-dark-muted leading-relaxed">
      {description}
    </p>
  </div>
);

const Body = () => {
  // Array of features to display in the features section
  const features = [
    {
      icon: ShoppingBag,
      title: "Product Management",
      description: "Advanced product listing with real-time availability and detailed specifications."
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Built with Vite for near-instant load times and optimized asset delivery."
    },
    {
      icon: ShieldCheck,
      title: "Secure Checkout",
      description: "Fully encrypted payment processing powered by modern security protocols."
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Designed to look stunning on everything from 300px devices to large desktops."
    },
    {
      icon: Moon,
      title: "Adaptive Theme",
      description: "Seamless switching between light and dark modes with a single click."
    },
    {
      icon: Database,
      title: "Global State",
      description: "Centralized cart and product data using React Context API for consistency."
    }
  ];

  return (
    <div className="min-h-screen p-4 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden px-4 py-12 md:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="w-full xxs:order-0 md:order-1 md:w-1/2 relative">
                        <div className="relative z-10 w-full rounded-3xl overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img 
                                src="../src/assets/image.png" 
                                alt="Modern E-commerce Experience" 
                                className="w-auto h-auto object-cover md:aspect-[4/3] lg:aspect-[6/4] "
                                loading="lazy"
                            />
                            {/* Overlay Gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        
                        {/* Decorative background element */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-light-secondary/20 dark:bg-dark-secondary/10 rounded-full blur-3xl -z-0"></div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-light-accent/20 dark:bg-dark-accent/10 rounded-full blur-3xl -z-0"></div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full md:w-1/2 flex flex-col items-start text-left z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary text-sm font-semibold mb-6">
                            <ShoppingBag size={16} />
                            <span>New Season Collection 2026</span>
                        </div>
                        
                        <h1 className="text-4xl xxs:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-light-text dark:text-dark-text transition-colors duration-300">
                            Shop the Future of <span className="text-dark-primary">E-commerce</span>
                        </h1>
                        
                        <p className="mt-6 text-lg md:text-xl text-light-muted dark:text-dark-muted max-w-xl leading-relaxed">
                            Discover a seamless shopping experience with secure checkouts, real-time tracking, and a curated selection of global brands.
                        </p>

                        <div className="flex flex-col xs:flex-row gap-4 mt-10 w-full xs:w-auto">
                            <NavLink 
                                to="/products" 
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-light-primary dark:bg-dark-primary rounded-xl shadow-lg shadow-light-primary/20 dark:shadow-dark-primary/20 hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
                            >
                                Browse Products
                                <ArrowRight className="ml-2" size={20} />
                            </NavLink>
                            
                            <NavLink 
                                to="/cart" 
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold border-2 border-light-border dark:border-dark-border text-light-text dark:text-dark-text rounded-xl hover:bg-light-surface dark:hover:bg-dark-surface transition-all duration-300"
                            >
                                <ShoppingCart className="mr-2" size={20} />
                                View Cart
                            </NavLink>
                        </div>

                        {/* Stats / Trust Badges */}
                        <div className="mt-12 flex gap-8 items-center border-t border-light-border dark:border-dark-border pt-8 w-full">
                            <div>
                                <p className="text-2xl font-bold text-light-text dark:text-dark-text">10k+</p>
                                <p className="text-sm text-light-muted dark:text-dark-muted">Products</p>
                            </div>
                            <div className="w-px h-10 bg-light-border dark:border-dark-border"></div>
                            <div>
                                <p className="text-2xl font-bold text-light-text dark:text-dark-text">24/7</p>
                                <p className="text-sm text-light-muted dark:text-dark-muted">Support</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Column */}
                    
                </div>
            </section>
     
      <hr className="border-light-border dark:border-dark-border max-w-7xl mx-auto opacity-50" />

      {/* --- Features Section --- */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-light-text dark:text-dark-text mb-4">
              Platform Features
            </h2>
            <p className="text-light-muted dark:text-dark-muted max-w-xl mx-auto">
              Everything you need to manage a modern e-commerce storefront efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                {...feature}
                delay={index * 100} // Incremental delay for the slide effect
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;