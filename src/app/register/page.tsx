"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  username: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("Username dan password wajib diisi");
      return;
    }

    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const exists = users.find((u) => u.username === username);
    if (exists) {
      setError("Username sudah terdaftar");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Register berhasil. Silakan login.");
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm rounded bg-black p-6 shadow"
      >
        <h1 className="mb-4 text-center text-2xl font-bold">
          Register
        </h1>

        {error && <p className="mb-3 text-red-500">{error}</p>}
        {success && <p className="mb-3 text-green-600">{success}</p>}

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

        <button className="w-full bg-green-600 p-2 text-white">
          Register
        </button>

        <p className="mt-4 text-center text-sm">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
