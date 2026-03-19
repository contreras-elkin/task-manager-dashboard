import { useTasks } from "../hooks/useTasks";
import { TaskList } from "../components/TaskList";

export const DashboardPage = () => {
  const { tasks, loading, error } = useTasks();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};