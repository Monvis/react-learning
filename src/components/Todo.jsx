import { SearchTaskForm } from "./SearchTaskForm";
import { TasksContext } from "../context/TasksContext";
import { AddTaskForm } from "./AddTaskForm";
import { TodoInfo } from "./TodoInfo";
import { TodoList } from "./TodoList";
import { Button } from "./Button";
import { useContext } from "react";

export const Todo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext);

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm />
      <SearchTaskForm />
      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Show first incomplete task
      </Button>
      <TodoInfo />
      <TodoList />
    </div>
  );
};
