"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const password = formData.get("password");

    // Simple check: Environment variable OR default fallback for demo
    const correctPassword = process.env.ADMIN_PASSWORD || "remember2026";

    if (password === correctPassword) {
        // Set cookie
        (await cookies()).set("admin_token", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        redirect("/admin");
    } else {
        // Return error? For simple actions/redirects we might just re-throw or redirect back
        return { error: "Invalid password" };
    }
}

export async function logout() {
    (await cookies()).delete("admin_token");
    redirect("/");
}
