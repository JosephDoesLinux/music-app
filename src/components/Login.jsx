import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        // Save user info to localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
        
        // Redirect based on role
        if (response.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-md bg-white p-8 border-4 border-black shadow-[8px_8px_0_0_#000000]">
        <h1 className="text-4xl font-black mb-8 text-center uppercase">
          Member Login
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="block font-bold mb-2 uppercase">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 border-4 border-black shadow-[4px_4px_0_0_#000000] focus:outline-none font-bold"
              placeholder="ENTER USERNAME"
            />
          </div>

          <div>
            <label className="block font-bold mb-2 uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border-4 border-black shadow-[4px_4px_0_0_#000000] focus:outline-none font-bold"
              placeholder="ENTER PASSWORD"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-lime-600 text-black font-black border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#000000] hover:bg-lime-500 transition uppercase text-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
