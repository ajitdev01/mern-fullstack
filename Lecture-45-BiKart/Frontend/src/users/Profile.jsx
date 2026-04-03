import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    // redirect if not logged in
    if (!storedUser || !token) {
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.log("User parse error");
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null; // prevent render flicker

  const imageUrl = `http://localhost:5000/uploads/${user.imagePath}`;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8">

        <div className="flex items-center gap-6">
          <img
            src={imageUrl}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
            onError={(e) => {
              e.target.src = "https://i.pravatar.cc/150"; // fallback image
            }}
          />

          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-semibold">{user.name}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">{user.email}</p>
          </div>
        </div>

      </div>
    </div>
  );
}