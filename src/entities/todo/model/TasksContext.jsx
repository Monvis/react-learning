import { createContext, useMemo } from "react";

// custom hooks
import useTasks from "./useTasks";
import useIncompleteTask from "./useIncompleteTask";

// eslint-disable-next-line react-refresh/only-export-components
export const TasksContext = createContext({});

export const TasksProvider = (props) => {
  const { children } = props;

  const {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    searchQuery,
    setSearchQuery,
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
    disappearingId,
    appearingId,
  } = useTasks();

  const { firstIncompleteTaskRef, firstIncompleteTaskId } =
    useIncompleteTask(tasks);

  const value = useMemo(
    () => ({
      tasks,
      filteredTasks,
      deleteTask,
      deleteAllTasks,
      toggleTaskComplete,
      searchQuery,
      setSearchQuery,
      addTask,
      newTaskTitle,
      setNewTaskTitle,
      newTaskInputRef,
      disappearingId,
      appearingId,
      firstIncompleteTaskRef,
      firstIncompleteTaskId,
    }),
    [
      tasks,
      filteredTasks,
      deleteTask,
      deleteAllTasks,
      toggleTaskComplete,
      searchQuery,
      setSearchQuery,
      addTask,
      newTaskTitle,
      setNewTaskTitle,
      newTaskInputRef,
      disappearingId,
      appearingId,
      firstIncompleteTaskRef,
      firstIncompleteTaskId,
    ],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
