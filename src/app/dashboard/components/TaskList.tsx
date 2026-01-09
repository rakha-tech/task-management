import { Task } from "../types/task";
import TaskSection from "./TaskSection";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskList({ tasks, setTasks }: Props) {
  return (
    <div className="space-y-8">
      <TaskSection
        title="Belum Selesai"
        tasks={tasks.filter((t) => !t.isCompleted)}
        setTasks={setTasks}
      />

      <TaskSection
        title="Selesai"
        tasks={tasks.filter((t) => t.isCompleted)}
        setTasks={setTasks}
      />
    </div>
  );
}
