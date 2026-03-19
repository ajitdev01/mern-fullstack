import { useEffect, useState } from "react"

function UserTable() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch("http://localhost:2010/api/users")
        if (!response.ok) throw new Error("Failed to fetch users")
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    getUsers()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading users...
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4 bg-red-50 text-red-600 rounded-lg">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Users
          </h2>
          <p className="text-sm text-gray-500">
            List of all registered users
          </p>
        </div>

        {/* Table */}
        {users.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No users found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                          ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-700"
                              : user.role === "manager"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserTable
