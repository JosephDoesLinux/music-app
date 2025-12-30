import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AlbumCard = ({ album, isFavorite, onToggleFavorite }) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/300x300/1F2937/F3F4F6?text=NO+COVER";
  };

  return (
    <div className="bg-white p-2 border-4 border-black shadow-[8px_8px_0_0_#000000] overflow-hidden relative">
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
      
      <button 
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite(album.id);
        }}
        className={`absolute bottom-4 right-4 p-2 border-2 border-black shadow-[2px_2px_0_0_#000000] ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-400'}`}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
};

export default function Library() {
  const [albums, setAlbums] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const getAlbums = async () => {
    try {
      setIsLoading(true);
      // Use the backend URL from environment variables
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/albums`);
      if (response.status === 200) {
        setAlbums(response.data);
      }
    } catch (err) {
      console.error("Error fetching albums:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getFavorites = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/favorites/${user.id}`);
      setFavorites(res.data); // Expecting array of album IDs e.g. [1, 5, 12]
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  const toggleFavorite = async (albumId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/favorites`, {
        userId: user.id,
        albumId
      });
      
      if (res.data.action === "added") {
        setFavorites([...favorites, albumId]);
      } else {
        setFavorites(favorites.filter(id => id !== albumId));
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  useEffect(() => {
    getAlbums();
    getFavorites();
  }, []);

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteAlbumsList = filteredAlbums.filter(album => favorites.includes(album.id));
  const nonFavoriteAlbumsList = filteredAlbums.filter(album => !favorites.includes(album.id));

  return (
    <div className="mt-15 min-h-screen bg-yellow-50 p-4 sm:p-8 font-sans">
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
        {isLoading && (
          <div className="text-center text-2xl font-black">Loading Library...</div>
        )}
        
        {isError && (
          <div className="text-center text-2xl font-black text-red-600">
            Error loading albums. Please try again later.
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="mb-8">
              <input
                type="text"
                placeholder="SEARCH ALBUMS OR ARTISTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 border-4 border-black shadow-[8px_8px_0_0_#000000] focus:outline-none text-xl font-bold placeholder-gray-500 uppercase bg-white"
              />
            </div>

            {favoriteAlbumsList.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-black mb-6 uppercase border-b-4 border-black inline-block pb-1">
                  Your Favorites
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8 mb-8">
                  {favoriteAlbumsList.map((album) => (
                    <AlbumCard 
                      key={`fav-${album.id}`} 
                      album={album} 
                      isFavorite={true}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
                <hr className="border-t-4 border-black" />
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8">
              {nonFavoriteAlbumsList.map((album, index) => (
                <AlbumCard 
                  key={index} 
                  album={album} 
                  isFavorite={false}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="mt-20 pb-8 text-center text-gray-700 text-sm font-medium border-t-2 border-black pt-4">
        Data scraped from Habibi Funk. All rights reserved.
      </footer>
    </div>
  );
}
