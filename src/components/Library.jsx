import React, { useState, useEffect } from 'react';

import albumData from '../data/albums.json';

// --- Embedded Data (Necessary for single-file component) ---
// The album data is embedded directly to ensure the component is self-contained.


/**
 * AlbumCard Component
 * Renders an individual album cover with the high-contrast styling.
 */
const AlbumCard = ({ album }) => {
  // Fallback image source in case the external URL fails
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/300x300/1F2937/F3F4F6?text=NO+COVER";
  };

  return (
    <div 
      className="
        bg-white 
        p-2 
        border-4 border-black 
        shadow-[8px_8px_0_0_#000000] 
        overflow-hidden
        
        /* Removed: rounded-lg, transitions, and hover effects */
      "
    >
      <a href={album.url} target="_blank" rel="noopener noreferrer" className="block">
        
        {/* Album Cover */}
        <div className="relative aspect-square border-2 border-black">
          <img
            src={album.image_url}
            alt={`${album.title} by ${album.artist}`}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        </div>

        {/* Album Details */}
        <div className="pt-4 pb-2">
          <h3 className="text-xl font-extrabold text-black leading-tight line-clamp-2 uppercase">
            {album.title}
          </h3>
          <p className="mt-1 text-lg font-bold text-lime-600 line-clamp-1">
            {album.artist}
          </p>
          
          {/* Action Button/Chip - Removed rounded-full */}
          <span className="
            mt-3 inline-block 
            bg-black text-white 
            text-xs font-semibold 
            px-3 py-1 
            border border-white 
            shadow-[2px_2px_0_0_#000000]
          ">
            LISTEN NOW
          </span>
        </div>
      </a>
    </div>
  );
};

/**
 * Library Component
 * Main component that displays the entire album catalog.
 * This is the default export component.
 */
export default function Library() {
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Data loading and filtering/validation
    try {
      const validAlbums = albumData.filter(album => album.title && album.artist && album.image_url);
      setFilteredAlbums(validAlbums);
    } catch (e) {
      console.error("Error processing album data:", e);
    } finally {
      // Small delay to simulate network loading time
      const delay = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(delay);
    }
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 p-4 sm:p-8 font-sans">
      
      <header className="text-center mb-10 pt-4 pb-6">
        <h1 className="
          text-5xl sm:text-7xl font-black 
          text-black 
          leading-none 
          tracking-tighter 
          inline-block p-2 
          bg-lime-600 
          border-4 border-black 
          shadow-[8px_8px_0_0_#000000]
        ">
          ARABIC FUNK VINYL LIBRARY
        </h1>
        <p className="
          text-md sm:text-xl font-bold 
          text-gray-800 
          mt-6 
          max-w-3xl mx-auto
        ">
          A meticulously curated selection of Funk, Jazz, and Soul records from Lebanon, Libya, Algeria, and beyond.
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        {loading ? (
          // Static loading state (no animate-spin)
          <div className="flex flex-col justify-center items-center h-64 border-4 border-black bg-white p-8 shadow-[8px_8px_0_0_#000000]">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="text-lime-600" viewBox="0 0 16 16">
              <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
              <path d="M15 3a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zm-1 9H2V4h12z"/>
            </svg>
            <p className="mt-4 text-xl font-bold text-black">Loading the next drop...</p>
          </div>
        ) : filteredAlbums.length === 0 ? (
          <p className="text-center text-2xl text-gray-500 py-12 font-bold">No records found. The crate is empty!</p>
        ) : (
          <div className="
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-4 
            gap-6 
            sm:gap-8
          ">
            {filteredAlbums.map((album, index) => (
              <AlbumCard key={index} album={album} />
            ))}
          </div>
        )}
      </main>
      
      <footer className="mt-20 pb-8 text-center text-gray-700 text-sm font-medium border-t-2 border-black pt-4">
        Discoveries provided by Habibi Funk. All rights reserved.
      </footer>
    </div>
  );
}