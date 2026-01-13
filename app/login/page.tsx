"use client";

import React, { useState } from "react";
import { login } from "@/app/actions";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3 bg-green-600 rounded-lg font-medium hover:bg-green-500 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
            {pending ? "Authenticating..." : (
                <>
                    Login <ArrowRight size={16} />
                </>
            )}
        </button>
    );
}

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        const result = await login(formData);
        if (result?.error) {
            setError(result.error);
        }
    };

    return (
        <div className="w-full h-screen bg-slate-950 flex items-center justify-center text-white px-4">
            <div className="w-full max-w-sm p-8 bg-slate-900 border border-white/10 rounded-xl text-center space-y-6 shadow-2xl">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                        <ShieldCheck className="text-green-500 w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold">Admin Protection</h1>
                    <p className="text-white/40 text-sm mt-2">National Remembrance Wall</p>
                </div>

                <form action={handleSubmit} className="space-y-4 text-left">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder:text-white/20"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <SubmitButton />
                </form>

                <div className="pt-2 border-t border-white/5">
                    <Link href="/" className="text-xs text-white/30 hover:text-white transition-colors">
                        ← Return to public wall
                    </Link>
                </div>
            </div>
        </div>
    );
}
