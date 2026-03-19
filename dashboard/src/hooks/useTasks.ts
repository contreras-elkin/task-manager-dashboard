import { useEffect, useState } from "react";
import * as taskService from "../services/TaskService";
import type { Task } from "../types/Task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Inicialización híbrida
  useEffect(() => {
    const init = async () => {
      try {
        const local = taskService.getLocalTasks();

        if (local.length > 0) {
          setTasks(local);
        } else {
          const data = await taskService.fetchTasksFromAPI();
          setTasks(data);
          taskService.saveLocalTasks(data);
        }
      } catch (err) {
        setError("No se pudieron cargar las tareas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const addTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    taskService.createTask(task);
    setTasks(taskService.getLocalTasks());
  };

  const editTask= (id: number, updates: Partial<Task>) => {
    taskService.updateTask(id, updates);
    setTasks(taskService.getLocalTasks());
  };

  const removeTask = (id: number) => {
    taskService.deleteTask(id);
    setTasks(taskService.getLocalTasks());
  };

  return { tasks, error, loading, addTask, editTask, removeTask };
};