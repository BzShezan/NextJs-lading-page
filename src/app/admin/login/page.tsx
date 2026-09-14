"use client";
import { supabaseBrowser } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabaseBrowser().auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError("Invalid email or password");
    else router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 px-6">
      <form
        onSubmit={login}
        className="bg-white p-10 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-6 w-full border rounded-lg px-4 py-3"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3 w-full border rounded-lg px-4 py-3"
        />
        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
        <button className="mt-6 w-full bg-stone-900 text-white rounded-full py-3 hover:bg-amber-700 transition">
          Sign In
        </button>
      </form>
    </div>
  );
}
