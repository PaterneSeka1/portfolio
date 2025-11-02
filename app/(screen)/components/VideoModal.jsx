"use client";

import { motion } from "framer-motion";

export default function VideoModal({ videoSrc, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-black rounded-lg overflow-hidden max-w-3xl w-full relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-white text-xl font-bold z-50"
          onClick={onClose}
        >
          ×
        </button>

        <video
          src={videoSrc}
          controls
          autoPlay
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
