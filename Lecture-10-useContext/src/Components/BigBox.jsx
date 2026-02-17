import { useContext } from "react"
import ThemeContext from "../TmemeContext"

function BigBox() {
  const { theme } = useContext(ThemeContext)

  return (
    <div
      className={`big-box card p-5 text-center ${
        theme === "dark" ? "big-dark" : "big-light"
      }`}
    >
      <h4 className="fw-bold mb-2">Big Box</h4>

      <p className="mb-0">
        Global theme applied using Context API
      </p>
    </div>
  )
}

export default BigBox
