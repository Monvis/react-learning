import { useEffect, useState, useRef } from "react";
import { tasksAPI } from "../apiJs/API";
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

  const deleteAllTasks = () => {
    const isConfirm = confirm("Are you shure you want to delete all tasks?");

    focusNewTaskInput();

    if (isConfirm) {
      Promise.all(
        tasks.map(({ id }) => {
          return fetch(`http://localhost:3001/tasks/${id}`, {
            method: "DELETE",
          });
        }),
      ).then(() => setTasks([]));
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
      console.log(`Не удалось поменять статус задачи! ${error}`);
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
        const response = await fetch("http://localhost:3001/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        // Get newTask with id from db.json5
        const createdTask = await response.json();

        if (!response.ok) throw new Error("Ошибка при добавлении");

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
    try {
      const getAllTasks = async () => {
        const response = await fetch(`http://localhost:3001/tasks`);
        const data = await response.json();

        if (!response.ok) throw new Error("Не удалось получить задачи из БД");

        setTasks(Array.isArray(data) ? data : []);
      };

      getAllTasks();
    } catch (error) {
      console.error(`КОД УПАЛ, МИЛОРД! ${error}`);
    }
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
