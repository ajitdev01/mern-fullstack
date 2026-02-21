
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          <div>
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
              <i className="fa-solid fa-store text-yellow-400"></i>
              AJIT STORE
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Your trusted eCommerce platform for quality products at the best price.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>

            <ul className="space-y-2 text-gray-400">

              <li className="flex items-center gap-2">
                <i className="fa-solid fa-house"></i>
                <Link to="/" className="hover:text-white transition">Home</Link>
              </li>

              <li className="flex items-center gap-2">
                <i className="fa-solid fa-user"></i>
                <Link to="/about" className="hover:text-white transition">About</Link>
              </li>

              <li className="flex items-center gap-2">
                <i className="fa-solid fa-box-open"></i>
                <Link to="/products" className="hover:text-white transition">Products</Link>
              </li>

              <li className="flex items-center gap-2">
                <i className="fa-solid fa-envelope"></i>
                <Link to="/contact" className="hover:text-white transition">Contact</Link>
              </li>

              <li className="flex items-center gap-2">
                <i className="fa-solid fa-cart-shopping"></i>
                <Link to="/cart" className="hover:text-white transition">
                  Cart
                </Link>
              </li>

            </ul>

          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact Info</h3>

            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-envelope text-yellow-400"></i>
                ajitk23192@gmail.com
              </li>

              <li className="flex items-center gap-2">
                <i className="fa-solid fa-phone text-green-400"></i>
                +91 78089 82006
              </li>

              <li className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-red-400"></i>
                Katihar, Bihar – 854105
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>

            <div className="flex gap-6 text-2xl text-gray-400">
              <Link to="/" className="hover:text-white transition">
                <i className="fa-brands fa-facebook"></i>
              </Link>
              <Link to="/" className="hover:text-white transition">
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link to="/" className="hover:text-white transition">
                <i className="fa-brands fa-linkedin"></i>
              </Link>
              <Link to="/" className="hover:text-white transition">
                <i className="fa-brands fa-github"></i>
              </Link>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">
          © {new Date().getFullYear()} AJIT STORE. All rights reserved.
        </div>
      </footer>
    </>
  );
}
