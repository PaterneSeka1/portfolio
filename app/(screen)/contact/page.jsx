"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Modal from "../components/ModalContact";

export default function Contact() {
  const [theme, setTheme] = useState("dark");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);
    toast.loading("Sending message...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.dismiss();
        setFormData({ name: "", email: "", message: "" });
        toast.success("Thank you for your message! I will reply soon.");
        setModalOpen(false);
      } else {
        toast.dismiss();
        toast.error("Error sending message. Please try again later.");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Error sending message. Please try again later.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 transition-colors duration-700
        ${
          theme === "dark"
            ? "bg-gradient-to-b from-gray-900 to-black text-white"
            : "bg-gradient-to-b from-gray-100 to-white text-gray-900"
        }`}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div
          className={`absolute top-1/2 left-1/2 w-[1200px] h-[1200px] rounded-full blur-[180px] opacity-25 animate-pulse -translate-x-1/2 -translate-y-1/2
          ${theme === "dark" ? "bg-indigo-600" : "bg-blue-300"}`}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extrabold mb-4 text-center"
      >
        Contact
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className={`text-lg md:text-xl mb-8 text-center max-w-2xl ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Do you have a project or a question? Send me a message and I will get back to you as soon as possible.
      </motion.p>

      <motion.form
        onSubmit={(e) => e.preventDefault()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-xl flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          rows="6"
          required
        />
        <button
          type="button"
          disabled={loading}
          onClick={() => setModalOpen(true)}
          className="self-end bg-blue-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </motion.form>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleSubmit}
        theme={theme}
      />
    </main>
  );
}
