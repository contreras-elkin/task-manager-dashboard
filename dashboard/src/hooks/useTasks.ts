import { useEffect, useState } from "react";
import * as taskService from "../services/TaskService";
import type { Task } from "../types/Task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Inicialización híbrida
  useEffect(() => {
    const local = taskService.getLocalTasks();

    if (local.length > 0) {
      setTasks(local);
    } else {
      taskService.fetchTasksFromAPI().then(data => {
        setTasks(data);
        taskService.saveLocalTasks(data);
      });
    }
  }, []);

  const addTask = (task: Task) => {
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

  return { tasks, addTask, editTask, removeTask };
};