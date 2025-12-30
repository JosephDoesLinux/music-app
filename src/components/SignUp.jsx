import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        username,
        password,
      });

      if (response.status === 201) {
        // Automatically login or redirect to login page
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Username already exists");
      } else {
        setError("Error creating account. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-md bg-white p-8 border-4 border-black shadow-[8px_8px_0_0_#000000]">
        <h1 className="text-4xl font-black mb-8 text-center uppercase">
          Join the Club
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="flex flex-col gap-6">
          <div>
            <label className="block font-bold mb-2 uppercase">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 border-4 border-black shadow-[4px_4px_0_0_#000000] focus:outline-none font-bold"
              placeholder="CHOOSE USERNAME"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-2 uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border-4 border-black shadow-[4px_4px_0_0_#000000] focus:outline-none font-bold"
              placeholder="CHOOSE PASSWORD"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-2 uppercase">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 border-4 border-black shadow-[4px_4px_0_0_#000000] focus:outline-none font-bold"
              placeholder="CONFIRM PASSWORD"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-lime-600 text-black font-black border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#000000] hover:bg-lime-500 transition uppercase text-xl"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center font-bold">
          Already a member? <Link to="/login" className="text-lime-600 underline">Login here</Link>
        </div>
      </div>
    </div>
  );
}
