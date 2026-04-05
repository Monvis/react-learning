import { useContext } from "react";
import { Field } from "../Field/Field";
import { TasksContext } from "../../context/TasksContext";

import styles from "./searchTaskForm.module.scss";

export const SearchTaskForm = () => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext);

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <Field
        className={styles.field}
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery}
        onInput={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  );
};

