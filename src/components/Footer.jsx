import React from 'react'

export default function Footer() {
  return (
      <footer className="w-full bg-yellow-400 border-t-4 border-black shadow-[0_-5px_0_0_#000000] mt-16 p-8 relative z-20">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
      
      {/* Column 1: Personal Info */}
      <div className="space-y-2 border-r-0 md:border-r-2 md:border-black md:pr-8 pb-4 md:pb-0">
        <p className="font-black text-xl mb-2 border-b-2 border-black inline-block pb-1">Concept Website</p>
        <p>
          <span className="font-bold">Joseph Abou Antoun</span> (ID: 52330567)
        </p>
        <p className="text-sm">Lebanese International University (LIU)</p>
      </div>
      
      {/* Column 2: Project Link */}
      <div className="space-y-2">
        <p className="font-black text-xl mb-2 border-b-2 border-black inline-block pb-1">Project Repository</p>
        <a 
          href="https://github.com/JosephDoesLinux/music-app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-lime-800 underline break-words block font-mono hover:text-lime-600 transition"
        >
          https://github.com/JosephDoesLinux/music-app
        </a>
      </div>

    </div>
  </footer>
  )
}
