"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("/dashboard");
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      setError("Username atau password salah");
      return;
    }

    // Simpan token dummy + username
    localStorage.setItem(
      "token",
      JSON.stringify({ username })
    );

    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded bg-black p-6 shadow"
      >
        <h1 className="mb-4 text-center text-2xl font-bold">
          Login
        </h1>

        {error && <p className="mb-3 text-red-500">{error}</p>}

        <input
          placeholder="Username"
          className="mb-3 w-full border p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 p-2 text-white">
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-600 underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
