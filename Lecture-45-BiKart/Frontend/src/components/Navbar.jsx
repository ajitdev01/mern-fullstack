import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false); // user dropdown
  const cartItems = useSelector(state => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUserMenu(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          BiKart
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 relative">

          {/* Cart */}
          <Link to="/cart">
            <div className="relative cursor-pointer">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-indigo-600" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            </div>
          </Link>

          {/* User Icon */}
          <div className="relative">
            <User
              onClick={() => setUserMenu(!userMenu)}
              className="w-6 h-6 text-gray-700 hover:text-indigo-600 cursor-pointer"
            />

            {/* Dropdown */}
            {userMenu && (
              <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg border">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <Menu
            onClick={() => setOpen(!open)}
            className="w-6 h-6 text-gray-700 md:hidden cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      )}
    </nav>
  );
}