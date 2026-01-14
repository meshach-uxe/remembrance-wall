"use client";

import React, { useState } from "react";
import ShootingStars from "@/components/ui/shooting-stars";
import SphereImageGrid, { ImageData } from "@/components/ui/sphere-grid";
import { Plus, Lock, Upload } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";


import { INITIAL_MEMORIES } from "@/lib/data";

export default function LandingPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [memories, setMemories] = useState(INITIAL_MEMORIES);

  // Form State
  const [newMemory, setNewMemory] = useState({
    name: "",
    description: "",
    imageUrl: "",
    link: ""
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMemory(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this sends data to the Admin Queue.
    // For Vibe Code demo, we alert the user.
    alert("Thank you. Your memory has been submitted for approval.");
    setIsAddModalOpen(false);
    setNewMemory({ name: "", description: "", imageUrl: "", link: "" });
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden text-white font-sans selection:bg-green-500 selection:text-white">

      {/* 1. Background Layer */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950 via-[#0a1f10] to-slate-900 opacity-80"></div>
      <ShootingStars starColor="#22c55e" trailColor="#ffffff" minSpeed={15} maxSpeed={35} />

      {/* 2. Header / Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
            National Remembrance Day
          </h1>
          <p className="text-sm text-green-400 font-medium tracking-widest uppercase">
            January 18, 2026
          </p>
        </div>
        <div className="flex gap-4">
          {/* Admin link hidden for production */}
        </div>
      </nav>

      {/* 3. Main Content - Sphere */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
        <div className="w-full md:w-auto md:h-[85vh] aspect-square flex items-center justify-center">
          <SphereImageGrid
            images={memories}
            baseImageScale={0.15}
            autoRotate={true}
            autoRotateSpeed={0.08}
            dragSensitivity={0.8}
            className="w-full h-full"
          />
        </div>

        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 flex flex-col items-end gap-3 md:gap-4 pointer-events-none">
          <p className="text-white/60 text-xs md:text-sm italic text-right">
            "We will not forget." #SaloneDaeMemba
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="pointer-events-auto group relative px-6 py-2 md:px-8 md:py-3 bg-white text-slate-900 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300 md:w-5 md:h-5" />
            Add A Memory
          </button>
        </div>
      </main>

      {/* 4. Add Memory Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-1">Contribute to the Wall</h2>
              <p className="text-white/50 text-sm mb-6">Share a photo, a tribute, or a story of resilience.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">Title / Name</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. My Grandfather"
                    value={newMemory.name}
                    onChange={(e) => setNewMemory({ ...newMemory, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">Upload Photo</label>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 cursor-pointer">
                      <span className="flex items-center justify-center w-full bg-slate-800 hover:bg-slate-700 border border-white/10 border-dashed rounded-lg p-3 text-white/70 transition-colors">
                        {newMemory.imageUrl ? (
                          <span className="text-green-400 font-medium truncate">{newMemory.imageUrl.slice(0, 30)}...</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Upload size={16} />
                            <span>Choose from device</span>
                          </div>
                        )}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">Description (Short)</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="A short reflection..."
                    value={newMemory.description}
                    onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">Link (Optional)</label>
                  <input
                    type="url"
                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Read more at..."
                    value={newMemory.link}
                    onChange={(e) => setNewMemory({ ...newMemory, link: e.target.value })}
                  />
                </div>

                <button type="submit" className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors mt-4">
                  Submit for Approval
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
