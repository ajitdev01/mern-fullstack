import { useEffect, useState } from "react";

function Image() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    if (!image) return;

    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6">

        <h1 className="text-2xl font-bold text-center mb-6">
          Image Preview Upload
        </h1>

        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
          <span className="text-gray-500">Click to Upload Image</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleInput}
          />
        </label>

        {previewUrl && (
          <div className="mt-6">
            <div className="overflow-hidden rounded-xl shadow-md">
              <img
                src={previewUrl}
                alt="preview"
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-sm text-gray-500 mt-2 text-center">
              Selected: {image?.name}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Image;