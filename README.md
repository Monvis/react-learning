# Todo React

## Overview

Todo application built with React and Vite.
Supports creating tasks, searching, toggling completion, deleting one task, and deleting all tasks.
Data is stored on a local JSON server (`json-server`) via HTTP API.

## Tech Stack

- React 19
- React DOM 19
- Vite 7
- ESLint 9
- json-server

## Available Scripts

Run from project root:

```bash
npm install
npm run dev
```

Run API server:

```bash
npm run server
```

Other scripts:

```bash
npm run build
npm run preview
npm run lint
```

## Project Structure

```text
src/
  App.jsx
  main.jsx
  api/
    API.js
  context/
    TasksContext.jsx
  hooks/
    useTasks.js
    useSearchQuery.js
    useIncompleteTask.js
  components/
    AddTaskForm.jsx
    SearchTaskForm.jsx
    Todo.jsx
    TodoInfo.jsx
    TodoItem.jsx
    TodoList.jsx
    Field.jsx
    Button.jsx
  styles/
    index.js
    normalize.css
    fonts.css
    variables.css
    utils.css
    globals.css
    components/
      button.css
      field.css
      todo.css
      todo-item.css
  assets/
    icons/
      icon-check_white.svg
      icon-search_black.svg
```

## Architecture

- `TasksProvider` (`src/context/TasksContext.jsx`) provides task state and actions to UI components.
- `useTasks` (`src/hooks/useTasks.js`) contains UI-facing task logic and state updates.
- `tasksAPI` (`src/api/API.js`) contains server requests:
  - `getAll`
  - `add`
  - `delete`
  - `deleteAll`
  - `toggleComplete`
- `useSearchQuery` computes filtered tasks by title.
- `useIncompleteTask` tracks the first incomplete task for scroll/focus helpers.

## Data Model

Each task object:

```ts
{
  id: string
  title: string
  isDone: boolean
}
```

## Notes

- Frontend runs on Vite default port (`5173`).
- API runs on `http://localhost:3001/tasks` using `db.json5`.
- To work with tasks correctly, run frontend and API server in parallel.

