import { useEffect, useState } from "react";

function Staffs() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const res = await fetch("http://localhost:2010/api/staffs");
        if (!res.ok) throw new Error("Failed to fetch staff data");
        const data = await res.json();
        setStaffs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffs();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-users text-blue-600"></i>
          Staff Management
        </h1>

        {loading && (
          <p className="text-gray-500 text-center">Loading staff data...</p>
        )}

        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {!loading && staffs.length === 0 && (
          <p className="text-gray-500 text-center">No staff records found</p>
        )}

        {!loading && staffs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Department</th>
                  <th className="px-4 py-3 text-left">Salary</th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((staff) => (
                  <tr
                    key={staff._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      {staff.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {staff.email}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                        {staff.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {staff.department}
                    </td>
                    <td className="px-4 py-3 font-semibold text-green-600">
                      ₹{staff.salary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Staffs;
