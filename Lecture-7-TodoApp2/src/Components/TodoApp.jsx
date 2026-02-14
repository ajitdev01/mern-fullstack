import { useState } from "react"

function TodoApp() {
    const [todos, setTodos] = useState([
        { id: 1, task: "This is Frist", IsComplete: false },
        { id: 2, task: "This is second", IsComplete: true },
        { id: 3, task: "This is third", IsComplete: false }
    ])
    const [invalue, setInvalue] = useState("")
    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState("")

    function handleInput(e) {
        setInvalue(e.target.value)
    }

    function AddSubmit(e) {
        e.preventDefault()

        if (invalue === "") {
            alert("Todos can't be empty")
        }
        const newTodos = {
            id: Date.now(),
            task: invalue,
            IsComplete: false
        }

        setTodos([...todos, newTodos])
        setInvalue(" ")

    }

    const handleToggle = (id) => {
        const toggleTodo = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, IsComplete: !todo.IsComplete }
            }
            return todo
        })
        setTodos(toggleTodo)
    }

    const handleDelete = (id) => {
        const newTodo = todos.filter((todo) => todo.id !== id)
        setTodos(newTodo)
    }
    const handleEditStart = (todo) => {
        setEditId(todo.id)
        setEditText(todo.task)
    }
    const handleinputEdit = (e) => {
        setEditText(e.target.value)
    }

    const handleEdit = (e) => {
        e.preventDefault()
        const updateTodo = todos.map((todo) => {
            if (editId === todo.id) {
                return { ...todo, task: editText }
            }
            return todo
        })
        setTodos(updateTodo)
        setEditId(null)
        setEditText("")
    }


    return (
        <>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">

                        {/* ADD TODO CARD */}
                        <div className="todo-card mb-4">
                            <form onSubmit={AddSubmit}>
                                <h4 className="text-center fw-bold mb-3">
                                    Add Todo
                                </h4>

                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control todo-input"
                                        value={invalue}
                                        onChange={handleInput}
                                        placeholder="Enter your task"
                                    />
                                    <button className="btn btn-primary todo-btn">
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* TODO LIST CARD */}
                        <div className="todo-card">
                            <h5 className="fw-semibold mb-3">Todo List</h5>


                            <ul className="list-group todo-list">
                                {todos.map((todo) => (
                                    <li
                                        key={todo.id}
                                        className={`list-group-item todo-item d-flex justify-content-between align-items-center ${todo.IsComplete ? "completed" : ""
                                            }`}
                                    >
                                        {editId === todo.id ? (
                                            <form
                                                className="d-flex w-100 gap-2"
                                                onSubmit={handleEdit}
                                            >
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editText}
                                                    onChange={handleinputEdit}
                                                />
                                                <button
                                                    type="submit"
                                                    className="btn btn-success btn-sm"
                                                >
                                                    <i className="fa-solid fa-check"></i>
                                                </button>
                                            </form>
                                        ) : (
                                            <>
                                                <div className="todo-text">
                                                    <i
                                                        className={`fa-regular ${todo.IsComplete
                                                                ? "fa-circle-check text-success"
                                                                : "fa-circle text-secondary"
                                                            } me-2`}
                                                    ></i>
                                                    {todo.task}
                                                </div>

                                                <div className="todo-actions d-flex gap-2">
                                                    <span
                                                        className={`badge status-badge ${todo.IsComplete
                                                                ? "bg-success"
                                                                : "bg-warning text-dark"
                                                            }`}
                                                        onClick={() => handleToggle(todo.id)}
                                                    >
                                                        {todo.IsComplete ? "Completed" : "Pending"}
                                                    </span>

                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => handleEditStart(todo)}
                                                    >
                                                        <i className="fa-solid fa-pen"></i>
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(todo.id)}
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>



                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default TodoApp