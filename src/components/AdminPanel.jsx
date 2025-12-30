import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("albums"); // albums, messages, users

  // Data States
  const [albums, setAlbums] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  // Form States (for Albums)
  const [albumId, setAlbumId] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Form States (for Users)
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", msg: "" });

  // Check Auth
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [albumsRes, msgsRes, usersRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/albums`),
        axios.get(`${import.meta.env.VITE_API_URL}/contacts`),
        axios.get(`${import.meta.env.VITE_API_URL}/users`),
      ]);
      setAlbums(albumsRes.data);
      setMessages(msgsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setFeedback({ type: "success", msg });
    setTimeout(() => setFeedback({ type: "", msg: "" }), 3000);
  };

  const showError = (msg) => {
    setFeedback({ type: "error", msg });
    setTimeout(() => setFeedback({ type: "", msg: "" }), 3000);
  };

  // --- ALBUM ACTIONS ---
  const handleSaveAlbum = async (e) => {
    e.preventDefault();
    if (!title || !artist || !url || !imageUrl) {
      showError("All album fields are required");
      return;
    }

    try {
      if (albumId) {
        // Update
        await axios.put(`${import.meta.env.VITE_API_URL}/albums/${albumId}`, {
          title, artist, url, image_url: imageUrl
        });
        showSuccess("Album updated successfully");
      } else {
        // Create
        await axios.post(`${import.meta.env.VITE_API_URL}/albums`, {
          title, artist, url, image_url: imageUrl
        });
        showSuccess("Album created successfully");
      }
      clearAlbumForm();
      fetchData();
    } catch (err) {
      showError("Error saving album");
    }
  };

  const handleDeleteAlbum = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/albums/${id}`);
      showSuccess("Album deleted");
      fetchData();
    } catch (err) {
      showError("Error deleting album");
    }
  };

  const editAlbum = (album) => {
    setAlbumId(album.id);
    setTitle(album.title);
    setArtist(album.artist);
    setUrl(album.url);
    setImageUrl(album.image_url);
    setActiveTab("albums");
    window.scrollTo(0, 0);
  };

  const clearAlbumForm = () => {
    setAlbumId("");
    setTitle("");
    setArtist("");
    setUrl("");
    setImageUrl("");
  };

  // --- MESSAGE ACTIONS ---
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/contacts/${id}`);
      showSuccess("Message deleted");
      fetchData();
    } catch (err) {
      showError("Error deleting message");
    }
  };

  // --- USER ACTIONS ---
  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (!username || !role) {
      showError("Username and role are required");
      return;
    }
    // Only Update for now (Create is usually via Register)
    if (userId) {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
          username, role
        });
        showSuccess("User updated successfully");
        clearUserForm();
        fetchData();
      } catch (err) {
        showError("Error updating user");
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user? This will remove their favorites too.")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`);
      showSuccess("User deleted");
      fetchData();
    } catch (err) {
      showError("Error deleting user");
    }
  };

  const editUser = (user) => {
    setUserId(user.id);
    setUsername(user.username);
    setRole(user.role);
    setActiveTab("users");
    window.scrollTo(0, 0);
  };

  const clearUserForm = () => {
    setUserId("");
    setUsername("");
    setRole("user");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8 font-sans mt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black mb-8 uppercase">Admin Dashboard</h1>

        {/* Feedback */}
        {feedback.msg && (
          <div className={`mb-6 p-4 border-l-4 font-bold ${feedback.type === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'}`}>
            {feedback.msg}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-4 border-black pb-4 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("albums")}
            className={`px-6 py-2 font-black text-xl uppercase border-2 border-black shadow-[4px_4px_0_0_#000000] transition ${activeTab === "albums" ? "bg-lime-500" : "bg-white hover:bg-gray-100"}`}
          >
            Albums
          </button>
          <button 
            onClick={() => setActiveTab("messages")}
            className={`px-6 py-2 font-black text-xl uppercase border-2 border-black shadow-[4px_4px_0_0_#000000] transition ${activeTab === "messages" ? "bg-lime-500" : "bg-white hover:bg-gray-100"}`}
          >
            Messages
          </button>
          <button 
            onClick={() => setActiveTab("users")}
            className={`px-6 py-2 font-black text-xl uppercase border-2 border-black shadow-[4px_4px_0_0_#000000] transition ${activeTab === "users" ? "bg-lime-500" : "bg-white hover:bg-gray-100"}`}
          >
            Users
          </button>
        </div>

        {/* --- ALBUMS TAB --- */}
        {activeTab === "albums" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1 bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000000] h-fit">
              <h2 className="text-2xl font-black mb-4 uppercase">{albumId ? "Edit Album" : "Add New Album"}</h2>
              <form onSubmit={handleSaveAlbum} className="flex flex-col gap-4">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Album Title" className="p-3 border-2 border-black font-bold" />
                <input value={artist} onChange={e => setArtist(e.target.value)} placeholder="Artist" className="p-3 border-2 border-black font-bold" />
                <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Bandcamp URL" className="p-3 border-2 border-black font-bold" />
                <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL" className="p-3 border-2 border-black font-bold" />
                
                <div className="flex gap-2 mt-2">
                  <button type="submit" className="flex-1 bg-black text-white font-black py-3 hover:bg-gray-800 uppercase">
                    {albumId ? "Update" : "Add"}
                  </button>
                  {albumId && (
                    <button type="button" onClick={clearAlbumForm} className="px-4 bg-gray-200 text-black font-black border-2 border-black hover:bg-gray-300 uppercase">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-2 bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000000]">
              <h2 className="text-2xl font-black mb-4 uppercase">Library ({albums.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-4 border-black">
                      <th className="p-2 font-black uppercase">Cover</th>
                      <th className="p-2 font-black uppercase">Title</th>
                      <th className="p-2 font-black uppercase">Artist</th>
                      <th className="p-2 font-black uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {albums.map(album => (
                      <tr key={album.id} className="border-b border-gray-300 hover:bg-yellow-50">
                        <td className="p-2">
                          <img src={album.image_url} alt="cover" className="w-12 h-12 object-cover border border-black" />
                        </td>
                        <td className="p-2 font-bold">{album.title}</td>
                        <td className="p-2">{album.artist}</td>
                        <td className="p-2 flex gap-2">
                          <button onClick={() => editAlbum(album)} className="text-blue-600 font-black hover:underline uppercase">Edit</button>
                          <button onClick={() => handleDeleteAlbum(album.id)} className="text-red-600 font-black hover:underline uppercase">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- MESSAGES TAB --- */}
        {activeTab === "messages" && (
          <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000000]">
            <h2 className="text-2xl font-black mb-4 uppercase">Inbox ({messages.length})</h2>
            {messages.length === 0 ? (
              <p className="text-gray-500 font-bold">No messages yet.</p>
            ) : (
              <div className="grid gap-4">
                {messages.map(msg => (
                  <div key={msg.id} className="border-2 border-black p-4 hover:bg-yellow-50 transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-black text-lg">{msg.name}</h3>
                        <p className="text-sm text-gray-600 font-bold">{msg.email}</p>
                      </div>
                      <button onClick={() => handleDeleteMessage(msg.id)} className="text-red-600 font-black text-sm border border-red-600 px-2 py-1 hover:bg-red-600 hover:text-white uppercase">
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-800 mt-2">{msg.message}</p>
                    <p className="text-xs text-gray-400 mt-4 font-bold uppercase">{new Date(msg.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- USERS TAB --- */}
        {activeTab === "users" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Form */}
             <div className="lg:col-span-1 bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000000] h-fit">
              <h2 className="text-2xl font-black mb-4 uppercase">Edit User</h2>
              {!userId ? (
                <p className="mb-4 font-bold text-gray-500">Select a user from the list to edit.</p>
              ) : (
                <form onSubmit={handleSaveUser} className="flex flex-col gap-4">
                  <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="p-3 border-2 border-black font-bold" />
                  <select value={role} onChange={e => setRole(e.target.value)} className="p-3 border-2 border-black font-bold bg-white">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  
                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="flex-1 bg-black text-white font-black py-3 hover:bg-gray-800 uppercase">
                      Update User
                    </button>
                    <button type="button" onClick={clearUserForm} className="px-4 bg-gray-200 text-black font-black border-2 border-black hover:bg-gray-300 uppercase">
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* List */}
            <div className="lg:col-span-2 bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000000]">
              <h2 className="text-2xl font-black mb-4 uppercase">Users ({users.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-4 border-black">
                      <th className="p-2 font-black uppercase">ID</th>
                      <th className="p-2 font-black uppercase">Username</th>
                      <th className="p-2 font-black uppercase">Role</th>
                      <th className="p-2 font-black uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b border-gray-300 hover:bg-yellow-50">
                        <td className="p-2 font-bold">{user.id}</td>
                        <td className="p-2 font-bold">{user.username}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 text-xs font-black uppercase text-white ${user.role === 'admin' ? 'bg-purple-600' : 'bg-gray-500'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-2 flex gap-2">
                          <button onClick={() => editUser(user)} className="text-blue-600 font-black hover:underline uppercase">Edit</button>
                          <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 font-black hover:underline uppercase">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
