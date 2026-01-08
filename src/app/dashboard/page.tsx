"use client";

import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Task } from "./types/task";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "hahabhd",
      description: "",
      isCompleted: false,
      userId: "user-1",
    },
    {
      id: 2,
      title: "Ketuk untuk Mengedit",
      description: "",
      isCompleted: true,
      userId: "user-1",
    },
    {
      id: 3,
      title: "Buat Tugas",
      description: "",
      isCompleted: true,
      userId: "user-1",
    },
    {
      id: 4,
      title: "Selamat datang di Tugas",
      description: "",
      isCompleted: true,
      userId: "user-1",
    },
  ]);

  // Tambah task baru
  const addTask = (title: string, description: string) => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      isCompleted: false,
      userId: "user-1",
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <main className="bg-black min-h-screen text-white px-5 py-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold">Tugas</h1>
      </header>

      {/* Form Tambah Task */}
      <TaskForm onAdd={addTask} />

      {/* List Task */}
      <TaskList tasks={tasks} setTasks={setTasks} />
    </main>
  );
}
