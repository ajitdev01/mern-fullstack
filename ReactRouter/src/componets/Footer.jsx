import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4"> <a href="https://www.ajitdev.com/" target="_blank">ajitdev</a></h2>
            <p className="text-gray-400 leading-relaxed">
              Delivering scalable, secure, and modern technology solutions for the digital era.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: ajitk23192@gmail.com</li>
              <li>Phone: +91 78089 82006</li>
              <li>Laxman Toal Dehria Katihar Bihar-854105</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4 text-gray-400 text-2xl">
              <a href="#" className="hover:text-white transition">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-white transition">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-white transition">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="#" className="hover:text-white transition">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">
          © {new Date().getFullYear()} <a href="https://www.ajitdev.com/" target="_blank">ajitdev</a>. All rights reserved.
        </div>
      </footer>
    </>
  );
}
