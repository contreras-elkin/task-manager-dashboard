import { useTasks } from "./hooks/useTasks";


function App() {
  const {tasks} = useTasks();
   return <h1>{tasks.length} tasks</h1>;
}

export default App;