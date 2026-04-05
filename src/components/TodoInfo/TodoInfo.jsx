import { useContext, useMemo } from "react";
import { TasksContext } from "../../context/TasksContext";

import styles from "./todoInfo.module.scss";

export const TodoInfo = () => {
  const { tasks, deleteAllTasks } = useContext(TasksContext);

  const total = tasks.length;
  const hasTasks = total > 0;
  const doneTasks = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone).length;
  }, [tasks]);

  return (
    <div className={styles.info}>
      <div className={styles.totalTasks}>
        Done {doneTasks} from {total}
      </div>
      {hasTasks && (
        <button
          className={styles.deleteAllButton}
          type="button"
          onClick={deleteAllTasks}
        >
          Delete all
        </button>
      )}
    </div>
  );
};

