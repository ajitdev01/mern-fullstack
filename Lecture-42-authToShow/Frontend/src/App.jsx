import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import UserCurd from './Components/UserCurd';
import Login from './Components/Login';


function App() {

  return (
    <>
      <ToastContainer />
      {/* <UserCurd/> */}
      <Login/>
    </>
  )
}

export default App
