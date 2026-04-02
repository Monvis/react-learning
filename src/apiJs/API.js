const BASE_URL = "http://localhost:3001/tasks";

const headers = {
  "Content-Type": "application/json",
};

const tasksAPI = {
  getAll: () => {},
  add: () => {},
  delete: async (taskId) => {
    if (!taskId) throw new Error("taskId is required");

    const response = await fetch(`${BASE_URL}/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  },
  deleteAll: () => {},
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
