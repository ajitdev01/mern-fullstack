function Services() {
  const services = [
    {
      title: "Cloud Architecture",
      desc: "Design and deploy scalable cloud infrastructure using AWS, Azure, and GCP with best-practice security models."
    },
    {
      title: "Cybersecurity Audits",
      desc: "Comprehensive security assessments, penetration testing, and vulnerability remediation for modern applications."
    },
    {
      title: "DevOps Automation",
      desc: "CI/CD pipelines, IaC, monitoring, and end-to-end automation to improve speed and reliability."
    },
    {
      title: "Web Development",
      desc: "Responsive and modern web applications built with React, Node.js, and optimized backend APIs."
    },
  ];

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 py-16 px-6">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600">
            We provide high-quality, secure, and scalable solutions designed for modern businesses.
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 
                         hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;
