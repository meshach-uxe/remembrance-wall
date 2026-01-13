"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, X, ArrowLeft, ShieldCheck, Trash2, Edit2, Save, Image as ImageIcon } from "lucide-react";
import { INITIAL_MEMORIES } from "@/lib/data";
import { MotionConfig, motion, AnimatePresence } from "framer-motion";

// --- Mock Pending Data ---
const MOCK_PENDING = [
    {
        id: "p1",
        user: "Isata K.",
        image: "https://images.unsplash.com/photo-1542358892-a169b16b47c0?auto=format&fit=crop&q=80&w=200",
        desc: "Remembering the peace march in Bo.",
        date: "2026-01-15 10:30 AM"
    },
    {
        id: "p2",
        user: "David S.",
        image: "https://images.unsplash.com/photo-1628522338573-030206969566?auto=format&fit=crop&q=80&w=200",
        desc: "My school mates gathered for the silence.",
        date: "2026-01-15 11:45 AM"
    }
];

import { logout } from "@/app/actions";

export default function AdminPage() {
    const [autoApprove, setAutoApprove] = useState(false);

    // Tab State: 'pending' | 'active'
    const [activeTab, setActiveTab] = useState<'pending' | 'active'>('pending');

    // Data State
    const [pendingItems, setPendingItems] = useState(MOCK_PENDING);
    const [activeMemories, setActiveMemories] = useState(INITIAL_MEMORIES);

    // Edit State
    const [editingItem, setEditingItem] = useState<any | null>(null);
    // Mock Login removed - Middleware handles protection


    // --- Actions ---

    const handleApprove = (id: string) => {
        setPendingItems(prev => prev.filter(item => item.id !== id));
        alert("Memory approved and published (mock).");
    };

    const handleReject = (id: string) => {
        setPendingItems(prev => prev.filter(item => item.id !== id));
    };

    const handleDeleteActive = (id: string) => {
        if (window.confirm("Are you sure you want to delete this memory? This action cannot be undone.")) {
            setActiveMemories(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleEditActive = (item: any) => {
        setEditingItem({ ...item });
    };

    const handleSaveEdit = () => {
        if (!editingItem) return;

        setActiveMemories(prev => prev.map(item =>
            item.id === editingItem.id ? editingItem : item
        ));
        setEditingItem(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Admin Header */}
            <header className="bg-white border-b border-slate-200 px-8 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-10 gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <Link href="/" className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="font-bold text-lg">Moderation Dashboard</h1>
                    <button onClick={() => logout()} className="text-xs text-red-500 hover:text-red-700 underline">Logout</button>
                </div>

                {/* Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'pending' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Pending Review
                    </button>
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'active' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Manage Content
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Auto-Approve</span>
                    <button
                        onClick={() => setAutoApprove(!autoApprove)}
                        className={`relative w-10 h-5 rounded-full transition-colors ${autoApprove ? 'bg-green-500' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${autoApprove ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto p-8">

                {activeTab === 'pending' ? (
                    // --- PENDING VIEW ---
                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <h2 className="text-xl font-bold text-slate-800">Review Queue <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs ml-2">{pendingItems.length}</span></h2>
                        </div>

                        {pendingItems.length === 0 ? (
                            <div className="p-12 text-center bg-white rounded-xl border border-dashed border-slate-300 text-slate-400">
                                <ShieldCheck size={48} className="mx-auto mb-4 opacity-20" />
                                <p>All caught up! No pending memories to review.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {pendingItems.map(item => (
                                    <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center gap-6">
                                        <img src={item.image} alt="" className="w-full md:w-20 md:h-20 rounded-lg object-cover bg-slate-100" />

                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg">{item.user}</h3>
                                            <p className="text-slate-600">{item.desc}</p>
                                            <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                                        </div>

                                        <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                                            <button
                                                onClick={() => handleReject(item.id)}
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                            >
                                                <X size={16} /> Reject
                                            </button>
                                            <button
                                                onClick={() => handleApprove(item.id)}
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                                            >
                                                <Check size={16} /> Approve
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    // --- ACTIVE CONTENT VIEW ---
                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <h2 className="text-xl font-bold text-slate-800">Active Memories <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs ml-2">{activeMemories.length}</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {activeMemories.map(item => (
                                <div key={item.id} className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="relative h-48 bg-slate-100">
                                        <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2 flex gap-1 bg-black/50 p-1 rounded-lg backdrop-blur-sm">
                                            <button
                                                onClick={() => handleEditActive(item)}
                                                className="p-1.5 text-white hover:bg-white/20 rounded-md transition-colors" title="Edit"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteActive(item.id)}
                                                className="p-1.5 text-red-300 hover:text-red-200 hover:bg-white/20 rounded-md transition-colors" title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-slate-900 truncate" title={item.title}>{item.title}</h3>
                                        <p className="text-sm text-slate-500 line-clamp-2 mt-1">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setEditingItem(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg">Edit Memory</h3>
                                <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Image Preview</label>
                                    <div className="h-40 w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                        <img src={editingItem.src} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title</label>
                                    <input
                                        type="text"
                                        value={editingItem.title}
                                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
                                    <textarea
                                        rows={3}
                                        value={editingItem.description}
                                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                                <button
                                    onClick={() => setEditingItem(null)}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveEdit}
                                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-500 rounded-lg shadow-sm shadow-green-200 transition-all flex items-center gap-2"
                                >
                                    <Save size={16} /> Save Changes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
