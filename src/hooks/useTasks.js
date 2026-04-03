import { useEffect, useState, useRef } from "react";
import { tasksAPI } from "../api/API";
import useSearchQuery from "./useSearchQuery";

const useTasks = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [tasks, setTasks] = useState([
    { id: "task-1", title: "Купить видеокарту", isDone: true },
    { id: "task-2", title: "Продать наушники", isDone: false },
  ]);

  const { searchQuery, setSearchQuery, filteredTasks } = useSearchQuery(tasks);

  const newTaskInputRef = useRef(null);
  const focusNewTaskInput = () => newTaskInputRef.current?.focus();

  const deleteAllTasks = async () => {
    const isConfirm = confirm("Are you shure you want to delete all tasks?");

    focusNewTaskInput();

    try {
      if (isConfirm) {
        await tasksAPI.deleteAll(tasks);
        setTasks([]);
      }
    } catch (error) {
      console.error(`Не удалось удалить список задач: ${error}`);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await tasksAPI.delete(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(`Задача не была удалена: ${error}`);
    }
  };

  const toggleTaskComplete = async (id, isDone) => {
    try {
      await tasksAPI.toggleComplete(id, isDone);

      setTasks((prev) => {
        return prev.map((task) => {
          if (task.id === id) {
            return { ...task, isDone };
          }

          return task;
        });
      });
    } catch (error) {
      console.error(`Не удалось поменять статус задачи! ${error}`);
    }
  };

  // Add new tasks field
  const addTask = async () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle.trim(),
        isDone: false,
      };

      try {
        // Get newTask with new id from db.json5
        const createdTask = await tasksAPI.add(newTask);

        setTasks([...tasks, createdTask]);
        setNewTaskTitle("");
        setSearchQuery("");
        focusNewTaskInput();
      } catch (error) {
        console.error(`Не удалось сохранить задачу: ${error}`);
      }
    }
  };

  // initial tasks render from db.json5
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await tasksAPI.getAll();
        setTasks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(`Не удалось получить список задач из сервера: ${error}`);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    focusNewTaskInput();
  }, []);

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
  };
};

export default useTasks;
