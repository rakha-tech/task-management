"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    const data = JSON.parse(token);
    setUsername(data.username);
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="p-6">
      <nav className="mb-6 flex justify-between bg-blue-600 p-4 text-white">
        <span>Simple Task</span>
        <button onClick={logout}>Logout</button>
      </nav>

      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>
      <p className="mt-2">
        Selamat datang, <b>{username}</b>
      </p>
    </div>
  );
}
