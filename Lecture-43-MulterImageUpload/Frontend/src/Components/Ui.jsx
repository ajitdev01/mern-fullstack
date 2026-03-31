import { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs';
import { 
  UserPlus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  User, 
  Mail, 
  Key, 
  Shield,
  Image as ImageIcon
} from 'lucide-react';

function Ui() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Developer');
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [nameedit, setNameedit] = useState('');
  const [emailedit, setEmailedit] = useState('');
  const [roleedit, setRoleedit] = useState('Developer');
  const [isEdit, setIsEdit] = useState(false);
  const [editid, setEditid] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const uploadImage = async () => {
    if (!selectedFile) return null;
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      return data.filePath;
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error("Image Upload Failed!");
      return null;
    }
  }

  const addUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !role || !password) {
      toast.error("All fields are required!");
      return;
    }

    setIsLoading(true);
    let imagePath = "";
    if (selectedFile) {
      imagePath = await uploadImage();
    }
    
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = {
      name: name,
      email: email,
      role: role,
      password: hashedPass,
      image: imagePath
    };

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        setUsers([...users, data]);
        setName('');
        setEmail('');
        setRole('Developer');
        setPassword('');
        setSelectedFile(null);
        toast.success("User Added Successfully!");
      } else {
        toast.error("Failed to add user");
      }
    } catch (error) {
      toast.error("Connection error");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success("User Deleted Successfully!");
          setUsers(users.filter((user) => user._id !== id));
        }
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  }

  const handleEditStart = (user) => {
    setNameedit(user.name);
    setEmailedit(user.email);
    setRoleedit(user.role);
    setEditid(user._id);
    setIsEdit(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const updateImage = async () => {
    if (!editImage) return null;
    const formData = new FormData();
    formData.append('image', editImage);

    try {
      const res = await fetch('http://localhost:3000/api/update', {
        method: 'PUT',
        body: formData
      });
      const data = await res.json();
      return data.filePath;
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Image Update Failed!");
      return null;
    }
  }
  
  const updateUser = async (e) => {
    e.preventDefault();
    if (!nameedit || !emailedit || !roleedit) {
      toast.error("All fields are required!");
      return;
    }

    setIsLoading(true);
    let updatePath = "";
    if (editImage) {
      updatePath = await updateImage();
    }

    const editEmp = {
      name: nameedit,
      email: emailedit,
      role: roleedit,
      image: updatePath
    };

    try {
      const response = await fetch(`http://localhost:3000/api/users/${editid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editEmp),
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(users.map((user) => user._id === editid ? data : user));
        setNameedit('');
        setEmailedit('');
        setRoleedit('Developer');
        setEditid('');
        setIsEdit(false);
        setEditImage(null);
        toast.success("User Updated Successfully!");
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setIsLoading(false);
    }
  }

  const cancelEdit = () => {
    setIsEdit(false);
    setNameedit('');
    setEmailedit('');
    setRoleedit('Developer');
    setEditImage(null);
  }

  const roleColors = {
    'Manager': 'bg-purple-100 text-purple-800',
    'Assistant': 'bg-blue-100 text-blue-800',
    'Peon': 'bg-gray-100 text-gray-800',
    'CEO': 'bg-red-100 text-red-800',
    'HR': 'bg-pink-100 text-pink-800',
    'Developer': 'bg-green-100 text-green-800',
    'Designer': 'bg-yellow-100 text-yellow-800',
    'DevOps': 'bg-indigo-100 text-indigo-800',
    'Others': 'bg-orange-100 text-orange-800'
  };

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              User Management System
            </h1>
            <p className="text-gray-600">
              Manage your team members efficiently and securely
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {isEdit ? 'Edit User' : 'Add New User'}
              </h2>
              {isEdit && (
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={isEdit ? updateUser : addUser}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Name Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={isEdit ? nameedit : name}
                    onChange={(e) => isEdit ? setNameedit(e.target.value) : setName(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                  <User className="absolute left-3 top-10 w-5 h-5 text-gray-400" />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={isEdit ? emailedit : email}
                    onChange={(e) => isEdit ? setEmailedit(e.target.value) : setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                  <Mail className="absolute left-3 top-10 w-5 h-5 text-gray-400" />
                </div>

                {/* Role Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Role
                  </label>
                  <select
                    value={isEdit ? roleedit : role}
                    onChange={(e) => isEdit ? setRoleedit(e.target.value) : setRole(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="Developer">Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Assistant">Assistant</option>
                    <option value="Peon">Peon</option>
                    <option value="CEO">CEO</option>
                    <option value="HR">HR</option>
                    <option value="Designer">Designer</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Others">Others</option>
                  </select>
                  <Shield className="absolute left-3 top-10 w-5 h-5 text-gray-400" />
                </div>

                {/* Password Field (only for add mode) */}
                {!isEdit && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Key className="w-4 h-4 inline mr-1" />
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    <Key className="absolute left-3 top-10 w-5 h-5 text-gray-400" />
                  </div>
                )}

                {/* Image Upload */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <ImageIcon className="w-4 h-4 inline mr-1" />
                    Profile Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => isEdit ? setEditImage(e.target.files[0]) : setSelectedFile(e.target.files[0])}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
                      accept="image/*"
                    />
                    <Upload className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    isEdit 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                  } text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : isEdit ? (
                    <>
                      <Save className="w-5 h-5" />
                      Update User
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      Add User
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Users Grid */}
          {users.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {users.map((user) => (
                <div key={user._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Image Section */}
                  <div className="relative h-48 bg-gradient-to-r from-blue-50 to-purple-50">
                    {user.image ? (
                      <img 
                        src={`http://localhost:3000/${user.image}`} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full flex items-center justify-center">
                          <User className="w-10 h-10 text-gray-600" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColors[user.role] || 'bg-gray-100 text-gray-800'}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                      {user.name}
                    </h3>
                    <p className="text-gray-600 mb-4 truncate flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditStart(user)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all font-medium"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-red-100 text-red-700 rounded-lg hover:from-red-100 hover:to-red-200 transition-all font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Users Found
              </h3>
              <p className="text-gray-500">
                Start by adding your first user above
              </p>
            </div>
          )}

          {/* Stats Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <span>Total Users: <strong className="text-gray-800">{users.length}</strong></span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">
                  {isEdit ? 'Editing Mode' : 'Adding Mode'}
                </span>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="text-gray-500">
                  User Management System v1.0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ui