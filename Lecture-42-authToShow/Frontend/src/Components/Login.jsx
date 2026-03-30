
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    // const [isLoggedin, setIsLoggedin] = useState(false)
    const [users, setUsers] = useState([])
    const [data, setData] = useState("")
    const [token, setToken] = useState(localStorage.getItem("token") || null)

    // Global Uri 
    const Global_URI = `http://localhost:3000/api/users`;

    const Loginpage = async (e) => {
        e.preventDefault()

        if (email === "" || password === "") {
            return toast.error("Fill Both filds")
        } else {
            const loginUser = {
                email: email,
                password: password
            }
            try {

                const reponse = await fetch(`${Global_URI}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginUser)
                })

                if (reponse.ok) {
                    const message = await reponse.json()
                    toast.success("Login user Sussfully")
                    setEmail("")
                    setPassword("")
                    // make true after login 
                    // setIsLoggedin(true)
                    // set data in data 
                    setData(message)
                    // set token 
                    localStorage.setItem("token", message.token)
                    setToken(message.token)
                } else {
                    toast.error("Email Or Password invalid")
                }

            } catch (error) {
                toast.error("Error By Function")
            }
        }
    }
    // all users data 
    // get all user 
    const DataFetch = async () => {
        try {
            const response = await fetch(Global_URI, {
               headers: { "Authorization": token }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            toast.error("Failed to load users");
        }
    };
    useEffect(() => {
        if (token) {
            DataFetch();
        }
    }, [token]);



    // user Logout
    const logout = async () => {
        setToken(null)
        localStorage.removeItem("token")
        setUsers([])
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
                {
                    token ?

                        <>
                            <div>
                                <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-2xl px-6 py-4 shadow-sm">

                                    <div className="text-red-700">
                                        <p className="text-sm font-medium">Welcome back,</p>
                                        <h2 className="text-lg font-semibold">{data.name}</h2>
                                    </div>

                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                                        title="Logout"
                                    >
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                        Logout
                                    </button>

                                </div>

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
                                                            // onClick={() => editStart(user)}
                                                            className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition duration-200 flex items-center justify-center"
                                                            title="Edit"
                                                        >
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                        <button
                                                            // onClick={() => DeleteUser(user._id)}
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
                            </div>
                        </>
                        :
                        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                                Login to Your Account
                            </h2>

                            <form onSubmit={Loginpage} className="space-y-5">

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-md"
                                >
                                    Login
                                </button>
                            </form>

                            <p className="text-center text-sm text-gray-500 mt-6">
                                Don’t have an account?
                                <span className="text-indigo-600 font-medium cursor-pointer hover:underline ml-1">
                                    Sign up
                                </span>
                            </p>

                        </div>
                }
            </div>

        </>
    )
}
