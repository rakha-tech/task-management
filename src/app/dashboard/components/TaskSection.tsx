"use client";

import { Task } from "../types/task";
import TaskCard from "./TaskCard";

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskSection({
  title,
  tasks,
  setTasks,
}: TaskSectionProps) {
  if (tasks.length === 0) return null;

  return (
    <section className="space-y-3">
      {/* Judul Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-zinc-400 text-sm font-medium">{title}</h2>
      </div>

      {/* List Task */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}
      </div>
    </section>
  );
}
