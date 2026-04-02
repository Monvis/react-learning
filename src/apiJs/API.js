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
  toggleComplete: () => {},
};

export { tasksAPI };
