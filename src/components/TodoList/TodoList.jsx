import { useContext } from "react";
import { TasksContext } from "../../context/TasksContext";
import { TodoItem } from "../TodoItem/TodoItem";

import styles from "../TodoList/todoList.module.scss";

export const TodoList = () => {
  const { tasks, filteredTasks } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks) {
    return <div className={styles.emptyMessage}>There are not tasks yet</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className={styles.emptyMessage}>Tasks not found</div>;
  }

  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className={styles.item}
          id={task.id}
          title={task.title}
          isDone={task.isDone}
          key={task.id}
        />
      ))}
    </ul>
  );
};

