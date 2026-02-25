import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>

            {/* Footer */}
            <footer className="mt-16 bg-gradient-to-b from-gray-900 via-gray-900/95 to-black border-t border-gray-800/50">
                <div className="container mx-auto px-4 py-12">

                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

                        {/* Brand Column */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/30 flex items-center justify-center">
                                    <span className="font-bold text-white text-xl">BR</span>
                                </div>
                                <div>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 text-transparent bg-clip-text tracking-tight">
                                        Brainzima
                                    </span>
                                    <p className="text-xs text-gray-400 mt-1">Movie Database Explorer</p>
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm leading-relaxed">
                                Your ultimate destination for movie exploration, trailers,
                                ratings, and personalized recommendations.
                            </p>

                            {/* Social Icons */}
                            <div className="flex gap-4 pt-2">
                                <Link to="/twitter" className="text-gray-400 hover:text-orange-400 transition-colors">
                                    <i className="fa-brands fa-x-twitter text-xl"></i>
                                </Link>

                                <Link to="/github" className="text-gray-400 hover:text-orange-400 transition-colors">
                                    <i className="fa-brands fa-github text-xl"></i>
                                </Link>

                                <Link to="/linkedin" className="text-gray-400 hover:text-orange-400 transition-colors">
                                    <i className="fa-brands fa-linkedin text-xl"></i>
                                </Link>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
                            <ul className="space-y-3">
                                <li><Link to="/movies" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Movies</Link></li>
                                <li><Link to="/tv-shows" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">TV Shows</Link></li>
                                <li><Link to="/top-rated" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Top Rated</Link></li>
                                <li><Link to="/upcoming" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Upcoming</Link></li>
                                <li><Link to="/trending" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Trending</Link></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
                            <ul className="space-y-3">
                                <li><Link to="/api-docs" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">API Docs</Link></li>
                                <li><Link to="/support" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Support</Link></li>
                                <li><Link to="/blog" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Blog</Link></li>
                                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Privacy Policy</Link></li>
                                <li><Link to="/terms-of-service" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Terms of Service</Link></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Get the latest movie news and updates.
                            </p>

                            <form className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                />

                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 text-sm"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8"></div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div className="text-center md:text-left">
                            <p className="text-gray-400 text-sm">
                                Powered by{" "}
                                <span className="text-orange-400 font-semibold hover:text-orange-300 transition-colors cursor-pointer">
                                    <a href="https://brainzima.com/">Brainzima Innovation Institute</a>
                                </span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                © {new Date().getFullYear()} Brainzima Movie Explorer. All rights reserved.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="font-semibold bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 text-transparent bg-clip-text text-sm">
                                Made with love by Ajit ❤️ Nilam
                            </span>
                        </div>

                    </div>
                </div>
            </footer>

        </>
    )
}