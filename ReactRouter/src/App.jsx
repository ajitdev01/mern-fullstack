import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './componets/Footer'
import Header from './componets/Header'
import Navbar from './componets/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Services from './pages/Services'

function App() {

  return (
    <>
      <BrowserRouter>

        <Header />
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </>
  )
}

export default App
