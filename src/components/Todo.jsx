
import { useEffect, useState, useRef } from "react"
import { AddTaskForm } from "./AddTaskForm"
import { Button } from "./Button"
import { SearchTaskForm } from "./SearchTaskForm"
import { TodoInfo } from "./TodoInfo"
import { TodoList } from "./TodoList"

export const Todo = () => {
  console.log('Todo')

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
  
  const firstIncompleteTaskRef = useRef(null)
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone )?.id

  const deleteAllTasks = () => {
    const isConfirm = confirm('Are you shure you want to delete all tasks?')

    if (isConfirm) {
      setTasks([])
    }

    newTaskInputRef.current.focus()
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
      newTaskInputRef.current.focus()
    }
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus()
  }, [])

  const clearSearchQuery = searchQuery.trim().toLowerCase()
  const filteredTasks    = clearSearchQuery.length > 0
    ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
    : null

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm 
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskInputRef={newTaskInputRef}
      />
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Button
        onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}
      >
        Show first incomplete task
      </Button>
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone ).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList 
        tasks={tasks}
        onTaskCompleteChange={toggleTaskComplete}
        onDeleteTaskButton={deleteTask}
        filteredTasks={filteredTasks}
        firstIncompleteTaskRef={firstIncompleteTaskRef}
        firstIncompleteTaskId={firstIncompleteTaskId}
      />
    </div>
  )
}
