import { useEffect, useState } from "react";

function InfniteScroll() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=20`
      );
      const data = await res.json();

      setImages((prev) => [...prev, ...data]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= docHeight - 200 && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="min-h-screen bg-gray-100">
      
      <h1 className="text-3xl font-bold text-center py-6">
        Infinite Image Gallery
      </h1>

      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={image.download_url}
                alt={image.author}
                className="w-full h-60 object-cover"
              />

              <div className="p-3 text-sm text-gray-600">
                <p className="font-semibold">{image.author}</p>
              </div>
            </div>
          ))}

        </div>

        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        )}

      </div>
    </div>
  );
}

export default InfniteScroll;