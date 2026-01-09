"use client";

import { useState } from "react";
import { Task } from "../types/task";

interface Props {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskCard({ task, tasks, setTasks }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const toggleComplete = () => {
    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const handleEdit = () => {
    if (editTitle.trim()) {
      setTasks(
        tasks.map((t) =>
          t.id === task.id
            ? { ...t, title: editTitle, description: editDescription }
            : t
        )
      );
      setIsEditing(false);
    }
  };

  const confirmDelete = () => {
    setTasks(tasks.filter((t) => t.id !== task.id));
    setIsDeleteConfirming(false);
  };

  if (isEditing) {
    return (
      <div className="border border-blue-400 bg-gray-950 p-4 rounded">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="border p-2 w-full mb-2 text-white bg-gray-950"
          placeholder="Judul Tugas"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="border p-2 w-full mb-2 text-white bg-gray-950 resize-none"
          rows={2}
          placeholder="Deskripsi"
        />
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            Simpan
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditTitle(task.title);
              setEditDescription(task.description);
            }}
            className="text-xs bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-600 bg-gray-950 p-4 rounded hover:border-gray-500 transition">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="font-bold text-lg">{task.title}</h2>
          {task.description && (
            <p className="text-sm text-gray-400 mt-1">{task.description}</p>
          )}

          <p className="text-xs text-gray-500 mt-2">
            Status:{" "}
            <span
              className={
                task.isCompleted ? "text-green-400" : "text-yellow-400"
              }
            >
              {task.isCompleted ? "Selesai" : "Belum Selesai"}
            </span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={toggleComplete}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
        >
          {task.isCompleted ? "Tandai Belum" : "Tandai Selesai"}
        </button>

        <button
          onClick={() => setIsEditing(true)}
          className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => setIsDeleteConfirming(true)}
          className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
        >
          Hapus
        </button>
      </div>

      {/* Delete Confirmation Popup */}
      {isDeleteConfirming && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-red-500 rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-bold text-red-400 mb-2">
              Konfirmasi Penghapusan
            </h3>
            <p className="text-gray-300 mb-6">
              Apakah Anda yakin ingin menghapus tugas "
              <span className="font-semibold">{task.title}</span>"? Tindakan ini
              tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsDeleteConfirming(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
