export default function Contact() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 py-16 px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 text-lg mt-2">
            Have questions or need assistance? We are here to help.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h3>

            <p className="text-gray-600 mb-6">
              Feel free to reach out through the form or contact us using the details below.
            </p>

            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold">Email</h4>
                <p>ajitk23192@gmail.com</p>
              </div>

              <div>
                <h4 className="font-semibold">Phone</h4>
                <p>+91 78089 82006</p>
              </div>

              <div>
                <h4 className="font-semibold">Address</h4>
                <p>Laxman Toal Dehria Katihar Bihar-854105</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Send a Message
            </h3>

            <form className="space-y-5" >

              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md 
                           hover:bg-blue-700 transition-all"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}
