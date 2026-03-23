import { useEffect, useState, useRef } from "react"
import useTasksLocalStorage from "./useTasksLocalStorage"
import useSearchQuery from "./useSearchQuery"

const useTasks = () => {

  const {
    savedTasks,
    saveTasks,
  } = useTasksLocalStorage()

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [tasks, setTasks] = useState(savedTasks ?? [
      { id: 'task-1', title: 'Купить видеокарту', isDone: true },
      { id: 'task-2', title: 'Продать наушники', isDone: false },
  ])

  const {
    searchQuery,
    setSearchQuery,
    filteredTasks,
  } = useSearchQuery(tasks)


  const newTaskInputRef = useRef(null)
  const focusNewTaskInput = () => {
    newTaskInputRef.current?.focus()
  }

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
    saveTasks(tasks)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks])

  useEffect(() => {
    focusNewTaskInput()
  }, [])

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    searchQuery,
    setSearchQuery,
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
  }
}

export default useTasks