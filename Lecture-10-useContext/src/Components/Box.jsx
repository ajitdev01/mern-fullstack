import { useContext } from "react"
import ThemeContext from "../TmemeContext"

function Box() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div
      className={`box card text-center p-4 mb-3 ${
        theme === "dark" ? "box-dark" : "box-light"
      }`}
    >
      <h5 className="fw-bold mb-3">Small Box</h5>

      <p className="text-muted mb-3">
        This is a themed box using Context API
      </p>

      <button
        className="btn btn-outline-primary btn-sm"
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
    </div>
  )
}

export default Box
