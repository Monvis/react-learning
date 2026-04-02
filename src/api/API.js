const BASE_URL = "http://localhost:3001/tasks";

const headers = {
  "Content-Type": "application/json",
};

const tasksAPI = {
  getAll: () => {},
  add: async (newTask) => {
    if (!newTask) throw new Error(`newTask is required!`);

    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers,
      body: JSON.stringify(newTask),
    });

    if (!response.ok) throw new Error("Ошибка при добавлении здачи");

    const createdTask = await response.json();
    return createdTask;
  },
  delete: async (taskId) => {
    if (!taskId) throw new Error("taskId is required");

    const response = await fetch(`${BASE_URL}/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  },
  deleteAll: async (tasks) => {
    if (!Array.isArray(tasks)) throw new Error(`tasks is required!`);

    const responses = await Promise.all(
      tasks.map(({ id }) => {
        return fetch(`${BASE_URL}/${id}`, {
          method: "DELETE",
        });
      }),
    );

    const failed = responses.find((res) => !res.ok);
    if (failed) throw new Error(`HTTP ${failed.status}`);
  },
  toggleComplete: async (id, isDone) => {
    if (id == null || typeof isDone !== "boolean")
      throw new Error("id or isDone is required!");

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        isDone: isDone,
      }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  },
};

export { tasksAPI };
