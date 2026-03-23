import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"

export default function AllEmployees() {
    const [employee, setEmployee] = useState([])
    // add emp 
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:1999/api/emp")
            const data = await response.json()
            setEmployee(data)
        } catch (error) {
            console.log(error, "Server Error")
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    // add emp
    const addEmployye = async (e) => {
        e.preventDefault()
        if (name === '' || email === '' || role === '') {
            toast.error("Filed can't be Emmty.")
        } else {

            const newEmp = {
                name: name,
                email: email,
                role: role
            };

            try {
                const response = await fetch("http://localhost:1999/api/emp", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(newEmp)
                })

                if (response.ok) {
                    const data = await response.json()
                    console.log("Employee add Succssfully", data)
                    setName('')
                    setEmail('')
                    setRole('')
                    setEmployee([...employee, newEmp])
                    toast.success("Employee Addded SucessFully")
                } else {
                    toast.error("Server Error")
                    console.log("Server return an error ", response.statusText)
                }

            } catch (error) {
                console.log("Error connecting to the server", error)
                toast.error("Error connecting ")

            }
        }

    }

    // delete employes
    const handleDelete = async (id) => {
        if(window.confirm("Are You sure to delete this employee")){
            try {
                const response = await fetch (`http://localhost:1999/api/emp/${id}`,{
                    method:"DELETE"
                })

                if(response.ok){
                    toast.success("Employee Deleted SuccessFully")
                    setEmployee(employee.filter((emp) => emp._id !== id))
                }
            } catch (error) {
                toast.error("Error in delecations")
            }
        }
    }


    return (
        <>
            <div className="container-fluid px-4 py-5">
                <ToastContainer />

                {/* Page Header */}
                <div className="mb-5">
                    <h2 className="fw-bold">Employee Management</h2>
                    <p className="text-muted mb-0">
                        Centralized directory and employee onboarding
                    </p>
                </div>

                <div className="row g-4">
                    {/* Employee List */}
                    <div className="col-lg-8">
                        <div className="row g-4">
                            {employee.map((emp) => (
                                <div className="col-sm-6 col-xl-4" key={emp._id}>
                                    <div className="card employee-card h-100">
                                        <div className="card-body text-center p-4">
                                            <span className="avatar-circle mb-3">
                                                {emp.name.charAt(0).toUpperCase()}
                                            </span>

                                            <h6 className="fw-semibold mb-1">{emp.name}</h6>
                                            <p className="text-muted small mb-2">
                                                {emp.email}
                                            </p>

                                            <span className="badge role-badge">
                                                {emp.role}
                                            </span>
                                        </div>

                                        <div className="card-footer bg-transparent border-0 d-flex justify-content-between px-4 pb-4">
                                            <button className="btn btn-sm btn-outline-primary">
                                                <i className="fa-solid fa-pen me-1"></i>
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(emp._id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add Employee Form */}
                    <div className="col-lg-4">
                        <div className="card elite-form sticky-top">
                            <div className="card-header bg-dark text-white">
                                <h6 className="mb-0">
                                    <i className="fa-solid fa-user-plus me-2"></i>
                                    Add New Employee
                                </h6>
                            </div>

                            <div className="card-body p-4">
                                <form onSubmit={addEmployye}>
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="fa-solid fa-user"></i>
                                            </span>
                                            <input
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="fa-solid fa-envelope"></i>
                                            </span>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">Role</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="fa-solid fa-briefcase"></i>
                                            </span>
                                            <select
                                                className="form-select"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            >
                                                <option value="">Select role</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Manager">Manager</option>
                                                <option value="Developer">Developer</option>
                                                <option value="DevOps Engineer">DevOps Engineer</option>
                                                <option value="Cloud Security Engineer">Cloud Security Engineer</option>
                                                <option value="Data Scientist">Data Scientist</option>
                                                <option value="HR">HR</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="d-grid">
                                        <button className="btn btn-dark">
                                            <i className="fa-solid fa-circle-plus me-2"></i>
                                            Add Employee
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
