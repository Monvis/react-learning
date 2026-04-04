import { SearchTaskForm } from "../SearchTaskForm/SearchTaskForm";
import { TasksContext } from "../../context/TasksContext";
import { AddTaskForm } from "../AddTaskForm/AddTaskForm";
import { TodoInfo } from "../TodoInfo/TodoInfo";
import { TodoList } from "../TodoList/TodoList";
import { Button } from "../Button/Button";
import { useContext } from "react";

import s from "./todo.module.scss";

export const Todo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext);

  return (
    <div className={s.todo}>
      <h1 className={s.title}>To Do List</h1>
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
