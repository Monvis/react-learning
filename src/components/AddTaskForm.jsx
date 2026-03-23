import { Field } from './Field'
import { AddButton } from './AddButton'
import { useContext } from 'react'
import { TasksContext } from '../context/TasksContext'

export const AddTaskForm = () => {
  const {
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
  } = useContext(TasksContext)

  const onSubmit = (event) => {
    event.preventDefault()
    addTask()
  }

  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field 
        className="todo__field"
        label="New task title"
        id="new-task"
        value={newTaskTitle}
        onInput={(event) => setNewTaskTitle(event.target.value)}
        inputRef={newTaskInputRef}
        autoFocus
      />
      <AddButton />
    </form>
  )
}
