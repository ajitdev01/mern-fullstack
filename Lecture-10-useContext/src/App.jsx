import './App.css'
import { useState } from 'react'
import ThemeContext from './TmemeContext'
import Box from './Components/Box'
import BigBox from './Components/BigBox'

function App() {
  const [theme,setTheme] = useState("light")
  function toggleTheme(){
    setTheme((ct) => (ct=="light" ? "dark" : "light"))
  }
  return (
    <>
     <ThemeContext.Provider  value={{theme,toggleTheme}} >
      <Box/>
      <BigBox/>

     </ThemeContext.Provider>
    </>
  )
}

export default App
