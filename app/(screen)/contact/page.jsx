'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useThemeStore } from "../../store/themeStore";
import Modal from "../components/ModalContact";

export default function Contact() {
  const { theme } = useThemeStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    toast.loading("Envoi du message...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.dismiss();
        setFormData({ name: "", email: "", message: "" });
        toast.success("Merci pour votre message ! Je vous répondrai rapidement.");
        setModalOpen(false);
      } else {
        toast.dismiss();
        toast.error("Erreur lors de l'envoi du message.");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Erreur lors de l'envoi du message. Veuillez réessayer plus tard.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <main
      className={`relative overflow-hidden transition-colors duration-700
        ${theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-black text-white"
          : "bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 text-slate-900"
        }`}
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div
          className={`absolute top-1/2 left-1/2 w-[1200px] h-[1200px] rounded-full blur-[180px] opacity-25 animate-pulse -translate-x-1/2 -translate-y-1/2
          ${theme === "dark" ? "bg-sky-600" : "bg-sky-300"}`}
        />
      </motion.div>

      <motion.form
        onSubmit={(e) => e.preventDefault()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className={`section-wrap soft-card mt-2 flex w-full max-w-3xl flex-col gap-4 rounded-3xl p-6 md:p-8 ${
          theme === "dark" ? "bg-gray-800/70" : "bg-white/90"
        }`}
      >
        <h1 className="soft-title text-center">Contact</h1>
        <p className={`mb-2 text-center text-base md:text-lg ${
          theme === "dark" ? "text-slate-300" : "text-slate-600"
        }`}>
          Vous avez un projet ou une question ? Envoyez-moi un message et je vous répondrai dès que possible.
        </p>

        <input
          type="text"
          name="name"
          placeholder="Votre nom"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md ${
            theme === "dark"
              ? "bg-gray-700 text-gray-100 border-gray-600"
              : "bg-gray-100 text-gray-900 border-gray-300"
          }`}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md ${
            theme === "dark"
              ? "bg-gray-700 text-gray-100 border-gray-600"
              : "bg-gray-100 text-gray-900 border-gray-300"
          }`}
          required
        />
        <textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md ${
            theme === "dark"
              ? "bg-gray-700 text-gray-100 border-gray-600"
              : "bg-gray-100 text-gray-900 border-gray-300"
          }`}
          rows="6"
          required
        />
        <button
          type="button"
          disabled={loading}
          onClick={() => setModalOpen(true)}
          className="self-end bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
        >
          {loading ? "Envoi..." : "Envoyer le message"}
        </button>
      </motion.form>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleSubmit}
        theme={theme}
      />
    </main>
  );
}
