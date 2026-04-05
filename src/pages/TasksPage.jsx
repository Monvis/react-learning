import { Todo } from "../components/Todo/Todo";
import { TasksProvider } from "../context/TasksContext";

export const TasksPage = () => {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
};
