function TodoEdit({ handleEdit, handleInputEdit, editingText }) {
  return (
    <form
      onSubmit={handleEdit}
      className="d-flex gap-2 w-100"
    >
      <input
        className="form-control"
        value={editingText}
        onChange={handleInputEdit}
        placeholder="Edit your todo"
        autoFocus
      />
      <button type="submit" className="btn btn-success">
        <i className="fa-solid fa-check"></i>
      </button>
    </form>
  )
}

export default TodoEdit
