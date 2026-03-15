import { useEffect, useState } from "react"

export default function UsersApp() {
  const [users, setUsers] = useState([])
  const [single, setSingle] = useState(null)
  const [ref, setRef] = useState(0)

  useEffect(() => {
    const fetchUsers = async () => {
      const url = "http://localhost:2006/api/UsersData"

      try {
        const response = await fetch(url)
        const data = await response.json()

        if (ref === 0) {
          setUsers(data)
          setSingle(null)
        } else {
          const user = data.find(u => u.id === ref)
          setSingle(user)
        }

      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [ref])

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-center mb-6">
        Users Dashboard
      </h1>

      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        <button
          onClick={() => setRef(0)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          All Users
        </button>

        <button
          onClick={() => setRef(1)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          User 1
        </button>

        <button
          onClick={() => setRef(2)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          User 2
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {ref === 0 ? (
          users.map(user => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {user.name}
              </h2>

              <p className="text-gray-600">
                <span className="font-semibold">Username:</span> {user.username}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold">Email:</span> {user.email}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold">City:</span> {user.address.city}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold">Phone:</span> {user.phone}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold">Website:</span> {user.website}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold">Company:</span> {user.company.name}
              </p>
            </div>
          ))
        ) : single ? (
          <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-3">
              {single.name}
            </h2>

            <p className="text-gray-600">
              <span className="font-semibold">Username:</span> {single.username}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {single.email}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold">City:</span> {single.address.city}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold">Phone:</span> {single.phone}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold">Website:</span> {single.website}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold">Company:</span> {single.company.name}
            </p>
          </div>
        ) : (
          <p className="text-center col-span-full text-gray-600">
            Loading...
          </p>
        )}

      </div>
    </div>
  )
}