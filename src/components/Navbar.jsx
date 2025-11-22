import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoUrl from "../assets/logo.webp"; // Ensure you have a logo image in the specified path


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Browse button: Solid Green background, Black border, Offset shadow
  const browseBtnClasses = "text-black bg-lime-600 border border-black px-4 py-6 text-xl hover:bg-lime-400 transition whitespace-nowrap shadow-[3px_3px_0_0_#000000]";

  // The URL of your logo image

  return (
    // Navbar Background: Yellow, Fixed with the offset shadow and gap
    <nav className="text-black bg-yellow-400 p-4 shadow-[5px_5px_0_0_#000000] fixed top-4 left-4 right-4 z-50"> 
      
      {/* This main div holds the primary content and is relative for the dropdown */}
      <div className="flex justify-between items-center w-full relative">
        
        <div className="flex items-center md:grow-0">
            
            {/* Hamburger Menu: SQUARE corners, Green background */}
            <button 
              className="text-black bg-lime-600 p-2 shadow-[3px_3px_0_0_#000000] border-2 border-black md:hidden mr-2" 
              onClick={() => setOpen(!open)}
              aria-label="Toggle Navigation"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            
            {/* Logo (Desktop Version): IMAGE REPLACEMENT APPLIED */}
            <Link 
                to="/" 
                // Removed redundant text-2xl font-bold classes as the sizing is now based on the image
                className="text-black hidden md:flex items-center space-x-2" 
                onClick={close}
            >
                {/* Maintain Size: 
                  h-8 sets a fixed height (adjust this for your preferred size). 
                  w-auto ensures the aspect ratio is maintained.
                */}
                <img src={logoUrl} alt="Music App Logo" className="h-20 w-auto" />
                <div className="text-6xl mb-2">|</div> 
                            <div className="text-3xl mt-1">Habibi Funk <br /> Records</div>
            </Link>

        </div>
        
        {/* CENTER ELEMENT (The Logo on Mobile): IMAGE REPLACEMENT APPLIED */}
        <Link 
            to="/" 
            // Removed redundant text-2xl font-bold classes as the sizing is now based on the image
            className="text-black md:hidden absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2" 
            onClick={close}
        >
            {/* Maintain Size: h-8 sets a fixed height, w-auto maintains aspect ratio. */}
            <img src={logoUrl} alt="Music App Logo" className="h-24 w-auto" />

        </Link>


        <div className="flex items-center space-x-8">
            
            {/* Desktop Text Links */}
            <div className="hidden md:flex md:space-x-8 text-3xl underline-offset-4 underline decoration-black">
                <Link to="/about" className="text-black hover:text-lime-600" onClick={close}>About</Link>
                <Link to="/contact" className="text-black hover:text-lime-600" onClick={close}>Contact</Link>
            </div>
            
            {/* Browse Button */}
            <Link to="/library" className={browseBtnClasses} onClick={close}>
              Browse
            </Link>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div 
        className={`
          ${open ? 'block' : 'hidden'} 
          md:hidden 
          absolute top-[110%] left-0 right-0 
          bg-lime-900 p-4 
          shadow-[5px_5px_0_0_#000000] border-2 border-black
          flex flex-col items-center space-y-2 z-10
        `}
      >
        {/* Dropdown Links */}
        <Link to="/about" className="text-yellow-200 hover:text-lime-400 w-full text-center py-2" onClick={close}>About</Link>
        <Link to="/contact" className="text-yellow-200 hover:text-lime-400 w-full text-center py-2" onClick={close}>Contact us</Link>
      </div>
    </nav>
  );
}