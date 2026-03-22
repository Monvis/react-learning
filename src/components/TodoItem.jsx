export const TodoItem = (props) => {
  console.log('TodoInfo')

  const {
    className = '',
    id,
    title,
    isDone,
    onTaskCompleteChange,
    onDeleteTaskButton,
    itemRef,
  } = props

  return (
    <li className={`todo-item ${className}`} ref={itemRef}>
      <input
        className="todo-item__checkbox"
        id={id}
        type="checkbox"
        checked={isDone}
        onChange={({target}) => {
          onTaskCompleteChange(id, target.checked)
        }}
      />
      <label
        className="todo-item__label"
        htmlFor="task-1"
      >
        {title}
      </label>
      <button
        className="todo-item__delete-button"
        aria-label="Delete"
        title="Delete"
        onClick={() => onDeleteTaskButton(id)}
      >
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
      </button>
    </li>
  )
}
