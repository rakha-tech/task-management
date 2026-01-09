"use client";

import { useState, FormEvent } from "react";

interface Props {
  onAdd: (title: string, description: string) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        placeholder="Judul Tugas"
        className="border p-2 w-full text-white bg-gray-950"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Deskripsi (opsional)"
        className="border p-2 w-full text-white bg-gray-950 resize-none"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
        Tambah Tugas
      </button>
    </form>
  );
}
