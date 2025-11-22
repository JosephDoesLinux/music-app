import React from "react";
import { Link } from "react-router-dom";
import background from "../assets/background.png";

export default function Home() {
  return (
    <div className=" bg-yellow-50 relative flex flex-col items-center justify-start">
      
      <img 
        src={background} 
        alt="Background Decor" 
        className="mt-15 left-0 w-full opacity-90"
      />

      <div className="relative min-h-scree w-full max-w-4xl flex flex-col items-center text-center px-4">

        <h1 
          dir="rtl" 
          className="text-6xl md:text-8xl font-black text-black leading-tight text-center"
        >
           <span className="bg-white px-2">أهلاً بكم في عالم</span>
           <br />
           <span className="text-lime-600 bg-black px-2 mx-2">
              الفانك العربي!  
           </span>
        </h1>

        <p className="mt-8 text-xl md:text-2xl font-bold text-gray-800 border-2 border-black inline-block p-2 bg-white shadow-[4px_4px_0_0_#000000]">
          Classic alternative hidden gems from around the Arab world.
        </p>

        <div className="pt-8">
          <Link 
            to="/library" 
            className="
              inline-block
              text-4xl font-black 
              bg-lime-600 text-black 
              border-4 border-black 
              px-12 py-6 
              shadow-[8px_8px_0_0_#000000] 
              hover:bg-lime-500 
              transition
            "
          >
            BROWSE MUSIC
          </Link>
        </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 w-full max-w-6xl px-4 pb-20">
        
        <div className="bg-white p-6 border-2 border-black shadow-[5px_5px_0_0_#000000]">
          <h3 className="text-2xl font-bold mb-2">Find new genres</h3>
          <p>Start browsing to see our selection!</p>
        </div>

        <Link to="/about" className="bg-yellow-400 p-6 border-2 border-black shadow-[5px_5px_0_0_#000000] hover:bg-yellow-300 transition">
          <h3 className="text-2xl font-bold mb-2">Learn More</h3>
          <p>Click here to learn more about us.</p>
        </Link>

        <Link to="/contact" className="bg-purple-400 p-6 border-2 border-black shadow-[5px_5px_0_0_#000000] hover:bg-purple-300 transition">
          <h3 className="text-2xl font-bold mb-2">Submit Music</h3>
          <p>Got a track? Send us the details via the contact form.</p>
        </Link>

      </div>
    </div>
    </div>
  );
}
