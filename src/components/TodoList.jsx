import { TodoItem } from "./TodoItem"

export const TodoList = (props) => {
  const {
    tasks = [],
    onDeleteTaskButton,
    onTaskCompleteChange,
    filteredTasks,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  } = props

  const hasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0
  
  if (!hasTasks) {
    return <div className="todo__empty-message">There are not tasks yet</div>
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Tasks not found</div>
  }

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className="todo__item"
          id={task.id}
          itemRef={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
          title={task.title}
          isDone={task.isDone}
          key={task.id}
          onTaskCompleteChange={onTaskCompleteChange}
          onDeleteTaskButton={onDeleteTaskButton}
        />
      ))}
    </ul>
  )
}
