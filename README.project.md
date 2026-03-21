# Todo React - Project Documentation

## Overview

This project is a small Todo application built with React and Vite.
It supports creating tasks, searching tasks, marking tasks as completed, deleting individual tasks, and deleting all tasks.
Task data is persisted in `localStorage`.

## Tech Stack

- React 19
- React DOM 19
- Vite 7
- ESLint 9

## Available Scripts

Run commands from the project root:

```bash
npm install
npm run dev
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
  assets/
    icons/
      icon-check_white.svg
      icon-search_black.svg
  components/
    AddButton.jsx
    AddTaskForm.jsx
    Field.jsx
    SearchTaskForm.jsx
    Todo.jsx
    TodoInfo.jsx
    TodoItem.jsx
    TodoList.jsx
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
```

## How It Works

Core logic is in `src/components/Todo.jsx`:

- Initializes `tasks` from `localStorage` key `tasks`.
- Falls back to a default in-memory list when there is no saved data.
- Stores updates to `localStorage` via `useEffect` when `tasks` changes.
- Keeps two UI states:
  - `newTaskTitle` for controlled input in add form.
  - `searchQuery` for filtering tasks.
- Computes `filteredTasks` based on case-insensitive title match.

Task operations:

- Add task: `addTask()`
- Toggle completion: `toggleTaskComplete(id, isDone)`
- Delete one task: `deleteTask(taskId)`
- Delete all tasks: `deleteAllTasks()`

## UI Composition

- `App.jsx` renders `Todo`.
- `AddTaskForm` renders input + add button and handles submit.
- `SearchTaskForm` renders search field.
- `TodoInfo` shows done/total counter and "Delete all" button.
- `TodoList` renders task list or empty states.
- `TodoItem` renders checkbox, title label, and delete button.
- Global and component styles are imported once in `src/styles/index.js` from `src/main.jsx`.

## Data Model

Each task object:

```ts
{
  id: string
  title: string
  isDone: boolean
}
```

## Current Limitations / Known Issues

This list reflects the current codebase state:

- `Todo.jsx` imports `TodoInfo` using `./todoInfo`, but the file is `TodoInfo.jsx`.
  - This may fail on case-sensitive file systems.
- `TodoItem.jsx` has `label htmlFor="task-1"` instead of using dynamic `id`.
  - Clicking labels may not target the correct checkbox for all items.
- Initial fallback task titles in `Todo.jsx` contain broken Cyrillic encoding.
- `Todo.jsx` includes a top-level `console.log("AI working")`.

## Notes for Further Development

- Replace broken fallback task text with valid UTF-8 strings.
- Fix case-sensitive import path for `TodoInfo`.
- Bind `TodoItem` label to dynamic `id`.
- Add tests for task operations and filtering behavior.
- Replace default `README.md` template with project-specific content when ready.
