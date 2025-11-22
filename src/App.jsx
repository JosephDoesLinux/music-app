

import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Library from './components/Library.jsx'
import { Route, Routes } from 'react-router-dom'
import About from './components/About.jsx'


function App() {

  return (
    // Ensure this div has pt-16 to push content below the fixed Navbar
    <div className="pt-16"> 
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/library" Component={Library} />

      </Routes>
      <h1>Hi</h1>
    </div>
  )
}

export default App