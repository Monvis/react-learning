import { useContext } from "react";
import { TasksContext } from "../../context/TasksContext";
import { TodoItem } from "../TodoItem/TodoItem";

import s from "../TodoList/todoList.module.scss";

export const TodoList = () => {
  const { tasks, filteredTasks } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks) {
    return <div className={s.emptyMessage}>There are not tasks yet</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className={s.emptyMessage}>Tasks not found</div>;
  }

  return (
    <ul className={s.list}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className={s.item}
          id={task.id}
          title={task.title}
          isDone={task.isDone}
          key={task.id}
        />
      ))}
    </ul>
  );
};
