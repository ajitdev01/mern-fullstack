import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 bg-gradient-to-br from-slate-50 to-white">
            <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-16">

                {/* Main Footer Content */}
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6 mb-12">

                    {/* Brand Column */}
                    <div className="col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-700 to-indigo-600 text-white font-bold shadow-lg">
                                <span className="text-lg">₹</span>
                            </div>
                            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                                Expense Tracker
                            </h2>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                            Take control of your finances with intelligent expense tracking,
                            insightful analytics, and smart budgeting tools.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-2 pt-2">
                            <Link
                                to="/"
                                aria-label="Twitter"
                                className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                            >
                                <i className="fa-brands fa-twitter text-sm"></i>
                            </Link>
                            <Link
                                to="/"
                                aria-label="Facebook"
                                className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                            >
                                <i className="fa-brands fa-facebook-f text-sm"></i>
                            </Link>
                            <Link
                                to="/"
                                aria-label="Instagram"
                                className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                            >
                                <i className="fa-brands fa-instagram text-sm"></i>
                            </Link>
                            <Link
                                to="/"
                                aria-label="GitHub"
                                className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                            >
                                <i className="fa-brands fa-github text-sm"></i>
                            </Link>
                            <Link
                                to="/"
                                aria-label="LinkedIn"
                                className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                            >
                                <i className="fa-brands fa-linkedin-in text-sm"></i>
                            </Link>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    Security
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    Roadmap
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    API Reference
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    Support
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    Partners
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                    GDPR
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mb-12 rounded-2xl bg-slate-900 p-8 lg:p-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold text-white mb-2">
                                Stay Updated
                            </h3>
                            <p className="text-sm text-slate-300">
                                Get financial tips and product updates delivered to your inbox.
                            </p>
                        </div>

                        <form className="flex w-full md:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                aria-label="Email address"
                                required
                                className="flex-1 md:w-64 px-4 py-2.5 rounded-full border border-slate-700 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2.5 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200">
                    <p className="text-sm text-slate-600 text-center md:text-left">
                        © {currentYear} <span className="font-semibold">Ajit</span>. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 text-xs text-slate-500">
                        <span>Made with ❤️ in India</span>
                        <span>•</span>
                        <span>Version 2.0.1</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;