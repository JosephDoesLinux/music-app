import React, { useState, useEffect } from "react";
import albumData from "../data/albums.json";

const AlbumCard = ({ album }) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/300x300/1F2937/F3F4F6?text=NO+COVER";
  };

  return (
    <div className="bg-white p-2 border-4 border-black shadow-[8px_8px_0_0_#000000] overflow-hidden">
      <a href={album.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-square border-2 border-black">
          <img
            src={album.image_url}
            alt={`${album.title} by ${album.artist}`}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        </div>

        <div className="pt-4 pb-2">
          <h3 className="text-xl font-extrabold text-black leading-tight line-clamp-2 uppercase">
            {album.title}
          </h3>
          <p className="mt-1 text-lg font-bold text-lime-600 line-clamp-1">
            {album.artist}
          </p>

          <span className="mt-3 inline-block bg-black text-white text-xs font-semibold px-3 py-1 border border-white shadow-[2px_2px_0_0_#000000]">
            LISTEN NOW
          </span>
        </div>
      </a>
    </div>
  );
};

export default function Library() {
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  useEffect(() => {
    const validAlbums = albumData.filter(
      (album) => album.title && album.artist && album.image_url
    );
    setFilteredAlbums(validAlbums);
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 p-4 sm:p-8 font-sans">
      <header className="text-center mb-10 pt-4 pb-6">
        <h1 className="text-5xl sm:text-7xl font-black text-black leading-none tracking-tighter inline-block p-2 bg-lime-600 border-4 border-black shadow-[8px_8px_0_0_#000000]">
          ARABIC FUNK VINYL LIBRARY
        </h1>
        <p className="text-md sm:text-xl font-bold text-gray-800 mt-6 max-w-3xl mx-auto">
          A meticulously curated selection of Funk, Jazz, and Soul records from
          Lebanon, Libya, Algeria, and beyond.
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredAlbums.map((album, index) => (
            <AlbumCard key={index} album={album} />
          ))}
        </div>
      </main>

      <footer className="mt-20 pb-8 text-center text-gray-700 text-sm font-medium border-t-2 border-black pt-4">
        Data scraped from Habibi Funk. All rights reserved.
      </footer>
    </div>
  );
}