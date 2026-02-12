import { useState } from "react"

function Counter() {
    const [count,setCount] = useState(0)
    
    function handleAdd(){
        setCount(count +1 )
    }
  return (
    <>
   <div>
     <h1>
        Count : {count}
    </h1>
    <button onClick={handleAdd}>Click me</button>
   </div>   

    
    </>
  )
}

export default Counter