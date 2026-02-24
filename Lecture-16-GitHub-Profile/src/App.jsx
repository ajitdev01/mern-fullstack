import { useEffect, useState } from "react";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false); // false initially, only true during search
  const [error, setError] = useState(null);

  // Load a default user on first mount (optional – you can remove this)
  const fetchUser = async (username) => {
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("User not found");
        }
        if (res.status === 403) {
          throw new Error("Rate limit exceeded – please try again later");
        }
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // Load default user on first visit
  useEffect(() => {
    fetchUser("rahman4ktr"); // Change this to any default user you want
  }, []);

  // This function will be passed to Profile component
  const handleSearch = (username) => {
    fetchUser(username);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="text-white text-2xl flex items-center gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
            Loading Profile...
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-8 py-4 rounded-xl shadow-2xl z-50 animate-pulse">
          <strong>Error:</strong> {error}
        </div>
      )}

      <Profile userData={userData} onSearch={handleSearch} />
    </div>
  );
}

export default App;