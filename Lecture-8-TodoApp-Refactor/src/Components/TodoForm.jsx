function TodoForm({ invalue, handleAdd, handleInput }) {
    return (
        <div className="todo-card mb-4">
            <form onSubmit={handleAdd}>
                <h5 className="text-center fw-bold mb-3">
                    Add Todo
                </h5>

                <div className="input-group">
                    <input
                        className="form-control todo-input"
                        value={invalue}
                        onChange={handleInput}
                        placeholder="Your todo text here"
                    />
                    <button className="btn btn-primary">
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm
