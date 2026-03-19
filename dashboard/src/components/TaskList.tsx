import type { Task } from "../types/Task";
import { TaskItem } from "./TaskItem";

export const TaskList = ({ tasks }: { tasks: Task[] }) => {
  if (tasks.length === 0) return <p>No hay tareas</p>;

  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};