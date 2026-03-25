
import { ToastContainer, toast } from 'react-toastify';
import bcrypt, { hash } from "bcryptjs"
import { useEffect, useState } from 'react';

export default function UserCurd() {
  // get all user 
  const [users, setUsers] = useState([])
  // add user 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [bihver, setBihver] = useState("");
  const [password, setPassword] = useState("");
  // edit user
  const [editname, setEditname] = useState("")
  const [editemail, setEditemail] = useState("")
  const [editrole, setEditrole] = useState("")
  const [editsalary, setEditsalary] = useState("")
  const [editbihver, setEditbihver] = useState("")
  const [editpassword, setEditpassword] = useState("")
  const [editId, setEditId] = useState("")


  // Global Uri 
  const Global_URI = `http://localhost:3000/api/users`;

  // get all user 
  const DataFetch = async () => {
    try {
      const response = await fetch(Global_URI);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    DataFetch();
  }, []);

  // user Deleted 
  const DeleteUser = async (id) => {
    if (window.confirm("Are You Sure Sir/mam")) {
      try {
        const response = await fetch(`${Global_URI}/${id}`, {
          method: "DELETE"
        })

        if (response.ok) {
          toast.success("Successfully User Deleted 💀 !")
          setUsers(users.filter((user) => user._id !== id))
        }

      } catch (error) {
        toast.error(`Error By Function`)
      }
    } else {
      toast.error("Not deleted User")
    }
  }
  // add user 
  const AddUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !role || !salary || !bihver || !password) {
      toast.error("All fields are required");
      return;
    }
    const hasedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      name: name,
      email: email,
      role: role,
      salary: salary,
      bihver: bihver,
      password: hasedPassword,
    };

    try {
      const response = await fetch(`${Global_URI}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const savedUser = await response.json();
        setUsers([...users, newUser]);
        toast.success("User added successfully");

        setName("");
        setEmail("");
        setRole("");
        setSalary("");
        setBihver("");
        setPassword("");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };
  // edit user 
  const editStart = async (user) => {
    setEditId(user._id)
    setEditname(user.name)
    setEditemail(user.email)
    setEditrole(user.role)
    setEditsalary(user.salary)
    setEditbihver(user.bihver)
    setEditpassword("")
  }

  const editUser = async (e) => {
    e.preventDefault()
    try {
      const edithasedPassword = await hash(editpassword, 10)
      const updateUser = {
        name: editname,
        email: editemail,
        role: editrole,
        salary: editsalary,
        bihver: editbihver,
        password: edithasedPassword
      }
      const response = await fetch(`${Global_URI}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateUser)
      })

      if (response.ok) {
        const data = response.json();
        console.log(data)
        toast.success("Updated User Successfully !")
        setEditname("")
        setEditemail("")
        setEditrole("")
        setEditbihver("")
        setEditsalary("")
        setEditpassword("")
        setEditId("")
        setUsers(users.map((user) => user._id === editId ? updateUser : user))
      }
    } catch (error) {
      toast.error(`Error By Function ${error}`)
    }
  }

  return (
    <>
      <>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                User Management System
              </h1>
              <p className="text-gray-600">Efficiently manage and organize your team members</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <i className="fa-solid fa-user-plus"></i>
                        {editId === "" ? "Add New User" : "Update User"}
                      </h2>
                      <p className="text-blue-100 text-sm mt-1">
                        {editId === ""
                          ? "Fill in the details to add a new team member"
                          : "Update the user information below"}
                      </p>
                    </div>

                    {/* Form Body */}
                    <div className="p-6">
                      <form onSubmit={editId === "" ? AddUser : editUser} className="space-y-5">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fa-solid fa-user mr-2 text-blue-500"></i>
                            Full Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter full name"
                            value={editId === "" ? name : editname}
                            onChange={(e) => editId === "" ? setName(e.target.value) : setEditname(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fa-solid fa-envelope mr-2 text-blue-500"></i>
                            Email Address
                          </label>
                          <input
                            type="email"
                            placeholder="Enter email address"
                            value={editId === "" ? email : editemail}
                            onChange={(e) => editId === "" ? setEmail(e.target.value) : setEditemail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          />
                        </div>

                        {/* Salary and Password Row */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <i className="fa-solid fa-indian-rupee-sign mr-2 text-green-500"></i>
                              Salary
                            </label>
                            <input
                              type="number"
                              placeholder="Enter salary"
                              value={editId === "" ? salary : editsalary}
                              onChange={(e) => editId === "" ? setSalary(e.target.value) : setEditsalary(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <i className="fa-solid fa-lock mr-2 text-red-500"></i>
                              Password
                            </label>
                            <input
                              type="password"
                              placeholder="Enter password"
                              value={editId === "" ? password : editpassword}
                              onChange={(e) => editId === "" ? setPassword(e.target.value) : setEditpassword(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                            />
                          </div>
                        </div>

                        {/* Behavior and Role */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <i className="fa-solid fa-face-smile mr-2 text-purple-500"></i>
                              Behavior
                            </label>
                            <select
                              value={editId === "" ? bihver : editbihver}
                              onChange={(e) => editId === "" ? setBihver(e.target.value) : setEditbihver(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            >
                              <option value="">Select Behavior</option>
                              <option>Excellent</option>
                              <option>Very Good</option>
                              <option>Good</option>
                              <option>Average</option>
                              <option>Bad</option>
                              <option>Below Average</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <i className="fa-solid fa-briefcase mr-2 text-indigo-500"></i>
                              Role
                            </label>
                            <select
                              value={editId === "" ? role : editrole}
                              onChange={(e) => editId === "" ? setRole(e.target.value) : setEditrole(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                            >
                              <option value="">Select Role</option>
                              <option>Frontend Engineer</option>
                              <option>Backend Engineer</option>
                              <option>Full Stack Engineer</option>
                              <option>UI UX Designer</option>
                              <option>Mobile App Developer</option>
                              <option>DevOps Engineer</option>
                              <option>Cloud Engineer</option>
                              <option>Cloud Security Engineer</option>
                              <option>Cyber Security Analyst</option>
                              <option>Security Engineer</option>
                              <option>Data Analyst</option>
                              <option>Data Scientist</option>
                              <option>Machine Learning Engineer</option>
                              <option>AI Engineer</option>
                              <option>System Administrator</option>
                              <option>Network Engineer</option>
                              <option>Site Reliability Engineer</option>
                              <option>Database Administrator</option>
                              <option>QA Engineer</option>
                              <option>Automation Tester</option>
                              <option>IT Support Engineer</option>
                              <option>Technical Lead</option>
                              <option>Project Manager</option>
                              <option>Product Manager</option>
                              <option>HR Executive</option>
                              <option>HR Manager</option>
                              <option>Admin</option>
                              <option>Operations Manager</option>
                              <option>Business Analyst</option>
                            </select>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${editId === ""
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"}`}
                        >
                          <i className={`fa-solid ${editId === "" ? "fa-user-plus" : "fa-check"} mr-2`}></i>
                          {editId === "" ? "Add User" : "Update User"}
                        </button>

                        {/* Cancel Edit Button */}
                        {editId !== "" && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditId("");
                              // Clear edit states if you have a function for that
                            }}
                            className="w-full py-3 px-4 rounded-xl font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition duration-200"
                          >
                            <i className="fa-solid fa-times mr-2"></i>
                            Cancel Edit
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Users Grid Section */}
              <div className="lg:col-span-2">
                {/* Stats Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Team Members</h2>
                      <p className="text-gray-600">{users.length} user{users.length !== 1 ? 's' : ''} found</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Salary</p>
                        <p className="text-lg font-bold text-green-600">
                          ₹{users.reduce((sum, user) => sum + parseInt(user.salary || 0), 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="h-10 w-px bg-gray-300"></div>
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <i className="fa-solid fa-filter"></i>
                        <span className="hidden md:inline">Filter</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Users Grid */}
                {users.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <i className="fa-solid fa-users text-4xl text-gray-300 mb-4"></i>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No users found</h3>
                    <p className="text-gray-500 mb-6">Start by adding your first team member</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {users.map((user) => (
                      <div
                        key={user._id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden"
                      >
                        {/* User Header */}
                        <div className="p-5 border-b border-gray-100">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                  {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-800 text-lg">{user.name}</h3>
                                  <p className="text-sm text-gray-500 truncate max-w-[180px]">{user.email}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => editStart(user)}
                                className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition duration-200 flex items-center justify-center"
                                title="Edit"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                              <button
                                onClick={() => DeleteUser(user._id)}
                                className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition duration-200 flex items-center justify-center"
                                title="Delete"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* User Details */}
                        <div className="p-5">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                <i className="fa-solid fa-briefcase text-indigo-600"></i>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Role</p>
                                <p className="font-medium text-gray-800">{user.role}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                                <i className="fa-solid fa-indian-rupee-sign text-green-600"></i>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Salary</p>
                                <p className="font-medium text-gray-800">₹{parseInt(user.salary).toLocaleString()}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                                <i className="fa-solid fa-face-smile text-purple-600"></i>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Behavior</p>
                                <div className="flex items-center gap-2">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.bihver === 'Excellent' ? 'bg-green-100 text-green-800' :
                                      user.bihver === 'Very Good' ? 'bg-blue-100 text-blue-800' :
                                        user.bihver === 'Good' ? 'bg-teal-100 text-teal-800' :
                                          user.bihver === 'Average' ? 'bg-yellow-100 text-yellow-800' :
                                            user.bihver === 'Bad' ? 'bg-orange-100 text-orange-800' :
                                              'bg-red-100 text-red-800'
                                    }`}>
                                    {user.bihver}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>

    </>
  )
}
