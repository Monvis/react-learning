import { useEffect, useState, useRef, useReducer } from "react";
import { tasksAPI } from "@/shared/api/tasks/index";
import useSearchQuery from "@/shared/hooks/useSearchQuery";

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL": {
      return Array.isArray(action.tasks) ? action.tasks : state;
    }
    case "ADD": {
      return [...state, action.task];
    }
    case "TOGGLE_COMPLETE": {
      const { id, isDone } = action;

      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task;
      });
    }
    case "DELETE": {
      return state.filter((task) => task.id !== action.id);
    }
    case "DELETE_ALL": {
      return [];
    }
    default: {
      return state;
    }
  }
};

const useTasks = () => {
  const [disappearingId, setDisappearingId] = useState(null);
  const [appearingId, setAppearingId] = useState(null);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [tasks, dispath] = useReducer(tasksReducer, []);

  const { searchQuery, setSearchQuery, filteredTasks } = useSearchQuery(tasks);
  const newTaskInputRef = useRef(null);
  const focusNewTaskInput = () => newTaskInputRef.current?.focus();

  const deleteAllTasks = async () => {
    const isConfirm = confirm("Are you shure you want to delete all tasks?");

    focusNewTaskInput();

    try {
      if (isConfirm) {
        await tasksAPI.deleteAll(tasks);
        dispath({ type: "DELETE_ALL" });
      }
    } catch (error) {
      console.error(`Не удалось удалить список задач: ${error}`);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await tasksAPI.delete(taskId);
      setDisappearingId(taskId);
      setTimeout(() => {
        dispath({ type: "DELETE", id: taskId });
        setDisappearingId(null);
      }, 400);
    } catch (error) {
      console.error(`Задача не была удалена: ${error}`);
    }
  };

  const toggleTaskComplete = async (taskId, isDone) => {
    try {
      await tasksAPI.toggleComplete(taskId, isDone);
      dispath({ type: "TOGGLE_COMPLETE", id: taskId, isDone });
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

        dispath({ type: "ADD", task: createdTask });
        setAppearingId(createdTask.id);
        setNewTaskTitle("");
        setSearchQuery("");
        focusNewTaskInput();

        setTimeout(() => {
          setAppearingId(null);
        }, 400);
      } catch (error) {
        console.error(`Не удалось сохранить задачу: ${error}`);
      }
    }
  };

  // initial tasks render from db.json5
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const serverTasks = await tasksAPI.getAll();
        dispath({ type: "SET_ALL", tasks: serverTasks });
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
    disappearingId,
    appearingId,
  };
};

export default useTasks;
