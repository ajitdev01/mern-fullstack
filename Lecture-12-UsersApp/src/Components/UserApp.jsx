import { useEffect, useState } from "react";

function UserApp() {
  const [users, setUsers] = useState([]);
  const [single, setSingle] = useState(null);
  const [ref, setRef] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const url =
        ref === 0
          ? "https://jsonplaceholder.typicode.com/users"
          : `https://jsonplaceholder.typicode.com/users/${ref}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (ref === 0) {
          setUsers(data);
          setSingle(null);
        } else {
          setSingle(data);
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [ref]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          User Directory
        </h1>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[0, 1, 2, 3].map((id) => (
            <button
              key={id}
              onClick={() => setRef(id)}
              className={`px-5 py-2 rounded-lg font-medium transition
                ${
                  ref === id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border hover:bg-blue-50"
                }`}
            >
              {id === 0 ? "All Users" : `User ${id}`}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : (
          <div
            className={`grid gap-6 ${
              ref === 0 ? "sm:grid-cols-2 lg:grid-cols-3" : ""
            }`}
          >
            {ref === 0
              ? users.map((user) => <UserCard key={user.id} user={user} />)
              : single && <UserCard user={single} />}
          </div>
        )}
      </div>
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {user.name}
      </h2>

      <div className="space-y-1 text-sm text-gray-600">
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">City:</span> {user.address.city}</p>
        <p><span className="font-medium">Phone:</span> {user.phone}</p>
        <p><span className="font-medium">Website:</span> {user.website}</p>
        <p>
          <span className="font-medium">Company:</span>{" "}
          {user.company.name}
        </p>
      </div>
    </div>
  );
}

export default UserApp;
