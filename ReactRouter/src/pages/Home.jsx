export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Build Secure, Scalable, and Modern Digital Solutions
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Empowering businesses and individuals through cloud technology,
              cybersecurity expertise, and innovative development practices.
            </p>

            <div className="flex gap-4">
              <a
                href="/services"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
              >
                Our Services
              </a>

              <a
                href="/contact"
                className="bg-gray-800 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-900 transition"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="flex justify-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29kaW5nfGVufDB8fDB8fHww"
              alt="Technology"
              className="rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>

        </div>

        {/* Features Section */}
        <div className="bg-white py-20 px-6 border-t border-gray-200">
          <div className="max-w-6xl mx-auto text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900">What We Offer</h2>
            <p className="text-gray-600 mt-3 text-lg">
              High-quality services designed for performance, security, and scale.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition border border-gray-200">
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Cloud Solutions</h3>
              <p className="text-gray-600">
                Secure, scalable, and cost-optimized deployments using AWS, Azure, and GCP.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition border border-gray-200">
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Cybersecurity</h3>
              <p className="text-gray-600">
                Audits, penetration testing, and security hardening to safeguard digital assets.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition border border-gray-200">
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Web Development</h3>
              <p className="text-gray-600">
                Beautiful, fast, and responsive applications built with modern frameworks.
              </p>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
