export default function About() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 py-16 px-6">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
          <p className="text-gray-600 text-lg mt-2">
            Learn more about our mission, values, and the work we do.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29kaW5nfGVufDB8fDB8fHww"
              alt="About section"
              className="rounded-3xl shadow-xl w-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div>
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              We are a team of passionate professionals committed to delivering
              high-quality technology solutions. Our focus spans across cloud
              infrastructure, cybersecurity, automation, and full-stack development.
            </p>

            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our goal is to empower individuals and organizations with secure,
              scalable, and innovative digital solutions. Through continuous
              learning and a deep understanding of modern technologies, we aim to
              build experiences that create real impact.
            </p>

            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              Why Choose Us
            </h3>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-2">
              <li>Skilled expertise in Cloud & Cybersecurity</li>
              <li>Modern development with industry best practices</li>
              <li>Focused on performance, scale, and security</li>
              <li>Professional, reliable, and detail-oriented</li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}
