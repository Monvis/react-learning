import { Field } from './Field'
import { AddButton } from './AddButton'

export const AddTaskForm = (props) => {
  const {
    addTask,
    newTaskTitle,
    setNewTaskTitle,
  } = props

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
      />
      <AddButton />
    </form>
  )
}
