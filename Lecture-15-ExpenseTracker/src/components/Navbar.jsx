import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ onNavClick }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;


  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "overview", label: "Overview", link: "/" },
    { id: "transactions", label: "Transactions", link: "/transaction" },

  ];

  const handleNavClick = (id) => {
    onNavClick?.(id);
    setIsMobileOpen(false);
  };

  const navClass = (path) =>
    `px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${currentPath === path
      ? "bg-slate-900 text-white shadow-sm"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
    }`;

  return (
    <>
      <nav
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled
          ? "border-slate-200 bg-white/95 backdrop-blur-md shadow-sm"
          : "border-slate-200 bg-white/80 backdrop-blur"
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6 lg:py-4">

          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-700 to-indigo-600 text-white font-bold shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-lg">₹</span>
              <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold text-slate-900 tracking-tight">
                Expense Tracker
              </span>
              <span className="hidden text-xs text-slate-500 font-medium md:block">
                Track • Control • Grow
              </span>
            </div>
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-1 rounded-full bg-slate-50 p-1 border border-slate-200">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  onClick={() => handleNavClick(item.id)}
                  className={navClass(item.link)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                aria-label="Notifications"
                className="hover:cursor-pointer relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"  >
                <span className="text-base" onClick={() => setIsModalOpen(true)}>🔔</span>
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
              <Link
                to="/add"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-slate-800 hover:shadow-lg transition-all"
              >
                <span className="text-lg leading-none">+</span>
                <span>Add Expense</span>
              </Link>
              <button
                type="button"
                className="hover:cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-indigo-600 text-xs font-bold uppercase text-white shadow-md hover:shadow-lg transition-all ring-2 ring-white" >
                AN
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/add"
              className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-md"
            >
              <span>+</span>
              <span>Add</span>
            </Link>
            <button
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="hover:cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              aria-label="Toggle menu" >
              <div className="space-y-1.5">
                <span
                  className={`block h-0.5 w-5 rounded-full bg-slate-700 transition-transform ${isMobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-slate-700 transition-opacity ${isMobileOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 rounded-full bg-slate-700 transition-transform ${isMobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>

          </div>
        </div>

        {/* Mobile Menu with Animation */}
        <div
          className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 lg:hidden ${isMobileOpen ? "max-h-96" : "max-h-0"
            }`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left text-sm px-4 py-3 rounded-xl font-medium transition-colors ${currentPath === item.link
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              aria-label="Notifications"
              className="ml-5 hover:cursor-pointer relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"  >
              <span className="text-base" onClick={() => setIsModalOpen(true)}>🔔</span>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 border border-slate-200">
              <span className="text-xs font-medium text-slate-500">Logged in as</span>
              <span className="text-xs font-semibold text-slate-900">
                Ajit Rajput
              </span>
            </div>
          </div>
        </div>
      </nav>




      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-none"></div>
          <div className="pointer-events-auto relative bg-[#111]/90 backdrop-blur-xl 
                         border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.6)] 
                       rounded-2xl p-6 w-80 animate-slideUp">

            <div className="absolute inset-0 rounded-2xl border border-indigo-500/20 pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 flex items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 shadow-xl">
                <i className="fa-solid fa-bell text-xl"></i>
              </div>
              <h2 className="text-lg font-semibold text-white tracking-tight">
                Notification
              </h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-5">
              Thank you for subscribing! You will now receive important updates.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="hover:cursor-pointer px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold
                  hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-600/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}



    </>

  );
};

export default Navbar;