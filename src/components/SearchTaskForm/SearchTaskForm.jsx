import { useContext } from "react";
import { Field } from "../Field/Field";
import { TasksContext } from "../../context/TasksContext";

import s from "./searchTaskForm.module.scss";

export const SearchTaskForm = () => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext);

  return (
    <form className={s.form} onSubmit={(event) => event.preventDefault()}>
      <Field
        className={s.field}
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery}
        onInput={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  );
};
