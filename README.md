# Task Management Dashboard

This project is a full-stack task management application built as a take-home assignment. It features a React frontend and a Node.js/Express backend, demonstrating clean architecture, robust functionality, and modern development practices.

## Overview

The application allows users to manage personal tasks with the following features:
- **Task List View**: Organized display of tasks.
- **Task Creation**: Form with validation to add new tasks.
- **Task Management**: Edit, delete, and mark tasks as complete.
- **Filtering**: Filter tasks by status (All, Pending, Completed).
- **Data Persistence**: Tasks are stored in a static JSON file on the server.

## Technologies & Dependencies Used

### Frontend (`/client`)
Built with **React** and **TypeScript** using **Vite**.

*   **UI & Styling**:
    *   `tailwindcss`: Utility-first CSS framework.
    *   `shadcn/ui`: Re-usable components built using Radix UI and Tailwind CSS.
    *   `lucide-react`: Icon library.
    *   `framer-motion`: For animations and transitions.
    *   `clsx` & `tailwind-merge`: For conditional class merging.
*   **State Management & Data Fetching**:
    *   `@tanstack/react-query`: For efficient server state management, caching, and synchronization.
*   **Forms**:
    *   `react-hook-form`: For performant and flexible form validation.
*   **Routing**:
    *   `react-router-dom`: For client-side routing.
*   **Utilities**:
    *   `date-fns`: For date formatting and manipulation.

### Backend (`/server`)
Built with **Node.js** and **Express**.

*   **Core**:
    *   `express`: Web framework for handling API requests.
    *   `cors`: Middleware to enable Cross-Origin Resource Sharing.
*   **Validation**:
    *   `zod`: TypeScript-first schema declaration and validation library.
*   **Development & Testing**:
    *   `nodemon`: For automatic server restarts during development.
    *   `jest` & `supertest`: For testing.
    *   `ts-node`: For running TypeScript directly.

## Implementation Details

### Architecture
The project is structured as a monorepo using **pnpm workspaces**.
- `client/`: Contains the frontend application.
- `server/`: Contains the backend API.

### How the Task Was Completed

1.  **Setup**: Initialized a pnpm workspace with separate client and server packages.
2.  **Backend Development**:
    -   Set up an Express server with TypeScript.
    -   Implemented a file-based repository pattern to read/write from a `data.json` file, satisfying the requirement for static JSON persistence.
    -   Created RESTful endpoints (`GET`, `POST`, `PUT`, `DELETE`) for task management.
    -   Added input validation using `zod` to ensure data integrity.
    -   Implemented error handling and CORS support.
3.  **Frontend Development**:
    -   Scaffolded a React app with Vite and Tailwind CSS.
    -   Configured `react-router-dom` for navigation.
    -   Implemented API integration using `react-query` to handle loading states, error handling, and data caching automatically.
    -   Built reusable UI components using `shadcn/ui` (based on Radix UI primitives) and Tailwind for a polished look.
    -   Created the Task Dashboard with filtering capabilities and a form for creating/editing tasks.
    -   Ensured responsiveness and keyboard accessibility.

## Running the Project

1.  **Install Dependencies**:
    ```bash
    pnpm install
    ```

2.  **Start Development Servers**:
    Run both client and server concurrently from the root:
    ```bash
    pnpm dev
    ```
    - Frontend will be available at `http://localhost:5173` (or similar).
    - Backend will run on `http://localhost:8000`.

## API Endpoints

The backend API is available at `http://localhost:8000`.

-   `GET /`: Health check endpoint.
-   `GET /tasks`: Retrieve all tasks. Supports query parameters for filtering (e.g., `?status=pending`).
-   `GET /tasks/:id`: Retrieve a specific task by ID.
-   `POST /tasks`: Create a new task.
-   `PUT /tasks/:id`: Update an existing task.
-   `DELETE /tasks/:id`: Delete a task.

---
*Completed as part of the Full-Stack Engineer Take-Home Assignment.*
