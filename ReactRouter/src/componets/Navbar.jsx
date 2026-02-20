import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-blue-500 via-blue-800 to-blue-500 text-white shadow-lg">

      {/* Single-Line Header with Logo + Brand + Menu */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt048rQIA73NNH1wHhjM8QwGZHjlrAlsOh8w&s"   
            alt="Brainzima Logo"
            className="w-10 h-10 rounded-md shadow-md"
          />
          <h1 className="text-2xl font-bold tracking-wide">Brainzima</h1>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex gap-10 text-sm font-medium">
            <li>
              <Link to="/" className="hover:text-gray-200 transition-colors">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-gray-200 transition-colors">
                About
              </Link>
            </li>

            <li>
              <Link to="/gallery" className="hover:text-gray-200 transition-colors">
                Gallery
              </Link>
            </li>

            <li>
              <Link to="/services" className="hover:text-gray-200 transition-colors">
                Services
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-gray-200 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}

export default Header;
