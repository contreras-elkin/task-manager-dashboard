
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
        updatedAt: task.updatedAt ? new Date(task.updatedAt) : undefined,
    }));
};

// SAVE en localStorage
export const saveLocalTasks = (tasks: Task[]) => {
    localStorage.setItem(KEY, JSON.stringify(tasks));
};

// CRUD local
export const createTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const tasks = getLocalTasks();
    const newTask: Task = {
        ...task,
        id: Date.now(),
        createdAt: new Date(),
    };

    const newTasks = [...tasks, newTask];
    saveLocalTasks(newTasks);

    return newTask;
};

export const updateTask = (id: number, updated: Partial<Task>) => {
    const tasks = getLocalTasks();
    const newTasks = tasks.map(t => (t.id === id 
        ? {
            ...t,
            ...updated,
            updatedAt: new Date(),
    } : t));
    saveLocalTasks(newTasks);
};

export const deleteTask = (id: number) => {
    const tasks = getLocalTasks();
    const newTasks = tasks.filter(t => t.id !== id);
    saveLocalTasks(newTasks);
};

// GET externo (solo lectura)
export const fetchTasksFromAPI = async (): Promise<Task[]> => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();

        return data.map((item: any) => ({
            id: item.id,
            title: item.title,
            status: item.completed ? "completed" : "pending",
            createdAt: new Date(),
        }));

    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error; 
    }
};