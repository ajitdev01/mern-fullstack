import TodoEdit from "./TodoEdit"

function TodoItem({
  todos,
  editingId,
  handleEdit,
  editingText,
  handleInputEdit,
  handleToggle,
  handleEditStart,
  handleDelete
}) {
  return (
    <ul className="list-group todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`list-group-item todo-item d-flex justify-content-between align-items-center ${
            todo.isCompleted ? "completed" : ""
          }`}
        >
          {editingId === todo.id ? (
            <TodoEdit
              handleEdit={handleEdit}
              handleInputEdit={handleInputEdit}
              editingText={editingText}
            />
          ) : (
            <>
              <span
                className="todo-text"
                onClick={() => handleToggle(todo.id)}
              >
                <i
                  className={`fa-regular me-2 ${
                    todo.isCompleted
                      ? "fa-circle-check text-success"
                      : "fa-circle text-secondary"
                  }`}
                ></i>
                {todo.task}
              </span>

              <div className="todo-actions d-flex gap-2">
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
  )
}

export default TodoItem
