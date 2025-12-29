import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);
    setFeedbackMsg("");

    if (!name || !email || !message) {
      setIsError(true);
      setFeedbackMsg("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/contact", {
        name,
        email,
        message,
      });

      if (response.status === 201) {
        setIsSuccess(true);
        setFeedbackMsg("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setIsError(true);
      setFeedbackMsg("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center font-sans p-4 sm:p-8">
      <section className="w-full max-w-6xl h-64 flex items-center justify-center mb-12 relative">
        <h1 className="relative text-6xl md:text-8xl bg-white font-black text-black text-center shadow-[4px_4px_0_0_#000000] px-4">
          Contact Us
        </h1>
      </section>

      <section className="w-full max-w-3xl bg-white p-8 border-4 border-black shadow-[8px_8px_0_0_#000000] mb-16">
        <h2 className="text-4xl font-black mb-6 border-b-4 border-black inline-block pb-2">
          Get in Touch
        </h2>

        {isSuccess && (
          <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 font-bold">
            {feedbackMsg}
          </div>
        )}
        
        {isError && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 font-bold">
            {feedbackMsg}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 border-2 border-black shadow-[4px_4px_0_0_#000000] focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-4 border-2 border-black shadow-[4px_4px_0_0_#000000] focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Your Message"
            className="p-4 border-2 border-black shadow-[4px_4px_0_0_#000000] focus:outline-none h-32 resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="mt-4 bg-lime-600 text-black font-black border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#000000] hover:bg-lime-500 transition"
          >
            Send Message
          </button>
        </form>

        <p className="mt-6 text-gray-800 text-center">
          Thank you for reaching out!
        </p>
      </section>

      <Link
        to="/"
        className="mb-16 text-2xl font-black bg-lime-600 text-black border-4 border-black px-12 py-6 shadow-[8px_8px_0_0_#000000] hover:bg-lime-500 transition"
      >
        BACK TO HOME
      </Link>
    </div>
  );
}
