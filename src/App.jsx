

import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Library from './components/Library.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import Contact from './components/Contact.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import AdminPanel from './components/AdminPanel.jsx'

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    // Ensure this div has pt-16 to push content below the fixed Navbar
    <div className="pt-16"> 
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/library" Component={Library} />
        <Route path="/contact" Component={Contact} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/admin" Component={AdminPanel} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App