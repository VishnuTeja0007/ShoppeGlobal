import { useRouteError, isRouteErrorResponse, Link, useLocation } from "react-router-dom";
import { AlertCircle, Home, RefreshCw, Sun, Moon } from "lucide-react";
import { useState } from "react";

const Error = () => {
  const error = useRouteError();
  const location = useLocation();
  const theme="light"
  const [light,setLight]=useState(true)
  function themeChange(){
    setLight(!light)
  }
  const status = isRouteErrorResponse(error) ? error.status : 500;
  const title = isRouteErrorResponse(error) ? error.statusText
    : "System Glitch";
   

  const message = isRouteErrorResponse(error)
    ? error.data?.message || "The page you are looking for has migrated or doesn't exist."
    : "An unexpected error occurred. Our team has been notified.";

  return (
    <div className={`min-h-screen error flex items-center justify-center bg-light-bg dark:bg-dark-bg px-6 transition-colors duration-300 ${light?"":"dark"}`}>
      <div className="max-w-2xl w-full bg-light-surface dark:bg-dark-surface rounded-[3rem] border-2 border-light-border dark:border-dark-border shadow-2xl p-12 text-center relative overflow-hidden">
        
        {/* Decorative Background Icon */}
        <AlertCircle className="absolute -top-10 -right-10 text-light-primary/5 dark:text-dark-primary/5" size={240} />

        {/* Error Code - Extra Large & Bold */}
        <h1 className="text-9xl font-black text-light-primary dark:text-dark-primary tracking-tighter mb-4">
          {status}
        </h1>

        {/* Title - Large & Uppercase */}
        <h2 className="text-4xl font-black text-light-text dark:text-dark-text uppercase tracking-tight mb-4">
          {title}
        </h2>

        {/* Message - Increased Font Size */}
        <p className="text-xl text-light-muted dark:text-dark-muted font-medium mb-8 max-w-md mx-auto leading-relaxed">
          {message}
        </p>

        {/* Invalid URL Display */}
        {status === 404 && (
          <div className="mb-10 p-4 bg-light-bg dark:bg-dark-bg rounded-2xl border border-light-border dark:border-dark-border inline-block">
            <p className="text-xs font-black text-light-primary uppercase tracking-widest mb-1">Attempted Path</p>
            <p className="text-sm font-mono text-light-text dark:text-dark-text break-all">
              {location.pathname}
            </p>
          </div>
        )}

        {/* Actions - Larger Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-10 py-4 bg-light-text dark:bg-dark-primary text-white dark:text-dark-bg rounded-2xl font-black text-lg hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-light-text/20 dark:shadow-dark-primary/20"
          >
            <Home size={24} />
            BACK TO STORE
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-10 py-4 bg-transparent border-2 border-light-border dark:border-dark-border text-light-text dark:text-dark-text rounded-2xl font-black text-lg hover:bg-light-bg dark:hover:bg-dark-bg transition-all active:scale-95"
          >
            <RefreshCw size={24} />
            RETRY
          </button>
          
          <button
            onClick={() => themeChange()}
            className="flex items-center gap-2 px-10 py-4 bg-transparent border-2 border-light-border dark:border-dark-border text-light-text dark:text-dark-text rounded-2xl font-black text-lg hover:bg-light-bg dark:hover:bg-dark-bg transition-all active:scale-95"
          >
           {light ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;