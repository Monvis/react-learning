import { useEffect, useState, useRef } from "react"
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const { children } = props

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')

    if (savedTasks) {
      return JSON.parse(savedTasks)
    }

    return [
      { id: 'task-1', title: 'Купить видеокарту', isDone: true },
      { id: 'task-2', title: 'Продать наушники', isDone: false },
    ]
  })

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const newTaskInputRef = useRef(null)
  const focusNewTaskInput = () => {
    newTaskInputRef.current?.focus()
  }
  
  const firstIncompleteTaskRef = useRef(null)
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone )?.id

  const deleteAllTasks = () => {
    const isConfirm = confirm('Are you shure you want to delete all tasks?')

    if (isConfirm) {
      setTasks([])
    }

    focusNewTaskInput()
  }

  const deleteTask = (taskId) => {
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    )
  }

  const toggleTaskComplete = (id, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isDone }
        }

        return task
      })
    )
  }

  // Add new tasks field
  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      }

      setTasks([...tasks, newTask])
      setNewTaskTitle('')
      setSearchQuery('')
      focusNewTaskInput()
    }
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    focusNewTaskInput()
  }, [])

  const clearSearchQuery = searchQuery.trim().toLowerCase()
  const filteredTasks    = clearSearchQuery.length > 0
    ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
    : null

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,

        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}