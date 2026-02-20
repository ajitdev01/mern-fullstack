export default function Gallery() {
  const images = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", // Tech
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // Cloud
  "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80", // Security
  "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=800&q=80", // Coding
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80", // Network
  "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80", // Hacking
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80", // Server
  "https://plus.unsplash.com/premium_photo-1678565999588-08fdd0b1410b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29kaW5nJTIwZGF0YXxlbnwwfHwwfHx8MA%3D%3D", // Data
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"  // Software
];


  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 py-16 px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Gallery</h2>
          <p className="text-gray-600 text-lg mt-2">
            Explore our curated collection of technology-focused visuals.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-72 object-cover transform hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
