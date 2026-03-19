
import type { Task } from "../types/Task";
const KEY = "tasks";

// GET desde localStorage
export const getLocalTasks = (): Task[] => {
  const data = localStorage.getItem(KEY);
  if (!data) return [];

  const parsed = JSON.parse(data);

  return parsed.map((task: any) => ({
    ...task,
    createdAt: new Date(task.createdAt),
  }));
};

// SAVE en localStorage
export const saveLocalTasks = (tasks: Task[]) => {
  localStorage.setItem(KEY, JSON.stringify(tasks));
};

// CRUD local
export const createTask = (task: Task) => {
  const tasks = getLocalTasks();
  const newTasks = [...tasks, task];
  saveLocalTasks(newTasks);
  return task;
};

export const updateTask = (id: number, updated: Partial<Task>) => {
  const tasks = getLocalTasks();
  const newTasks = tasks.map(t => (t.id === id 
    ? {
      ...t,
      ...updated,
    } : t));
  saveLocalTasks(newTasks);
};

export const deleteTask = (id: number) => {
  const tasks = getLocalTasks();
  const newTasks = tasks.filter(u => u.id !== id);
  saveLocalTasks(newTasks);
};

// GET externo (solo lectura)
export const fetchTasksFromAPI = async (): Promise<Task[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    status: item.completed ? "completed" : "pending",
    createdAt: new Date(),
  }));
};