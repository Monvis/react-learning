import { Field } from "../Field/Field";
import { useContext, useState } from "react";
import { TasksContext } from "../../context/TasksContext";
import { Button } from "../Button/Button";

import s from "./addTaskForm.module.scss";

export const AddTaskForm = () => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
    useContext(TasksContext);

  const onSubmit = (event) => {
    event.preventDefault();
    addTask();
  };

  const [error, setError] = useState("");

  const onInput = (event) => {
    const { value } = event.target;
    const clearValue = value.trim();
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0;

    setNewTaskTitle(value);
    setError(hasOnlySpaces ? "The task cannot be empty" : "");
  };

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <Field
        className={s.field}
        label="New task title"
        id="new-task"
        value={newTaskTitle}
        error={error}
        onInput={onInput}
        inputRef={newTaskInputRef}
        autoFocus
      />
      <Button type="submit" isDisabled={newTaskTitle.trim().length === 0}>
        Add
      </Button>
    </form>
  );
};
