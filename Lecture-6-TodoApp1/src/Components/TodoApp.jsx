import { useState } from "react"

function TodoApp() {

    const [todos, setTodos] = useState([

    ])
    const [invalue, setInvalue] = useState("")

    function handleInput(e) {
        setInvalue(e.target.value)
    }
    function AddSubmit(e) {
        e.preventDefault()
        if (invalue === "") {
            alert("Todo can't  be Empty")
            return
        }
        const newTodo = {
            id: Date.now(),
            task: invalue
        }

        setTodos([...todos, newTodo])
        setInvalue("")

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

                            {todos.length === 0 ? (
                                <p className="text-muted text-center">
                                    No todos added yet
                                </p>
                            ) : (
                                <ul className="list-group">
                                    {todos.map((todo, index) => (
                                        <li
                                            key={todo.id}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <span>
                                                <strong>{index + 1}.</strong> {todo.task}
                                            </span>

                                            <span className="badge bg-success">
                                                Active
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                    </div>
                </div>
            </div>



        </>
    )
}

export default TodoApp