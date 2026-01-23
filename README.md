# Ticket Management Application

A full-stack monolithic application for managing tickets.

<img width="959" height="540" alt="image" src="https://github.com/user-attachments/assets/d1cd8fc6-ee35-454d-b0ef-453bc11d024c" />

## Project Structure

```
ticket-app-antigravity/
├── backend/                # NestJS Backend
│   ├── src/
│   │   ├── tickets/        # Ticket Module (Entity, Service, Controller)
│   │   ├── app.module.ts   # Root Module (TypeORM Config)
│   │   └── main.ts         # Entry point (CORS enabled)
│   ├── database.sqlite     # SQLite Database (auto-generated)
│   └── package.json
├── frontend/               # React + Vite Frontend
│   ├── src/
│   │   ├── components/     # TicketList, TicketForm
│   │   ├── services/       # API integration
│   │   ├── types.ts        # TypeScript interfaces
│   │   └── App.tsx         # Routing
│   ├── index.css           # Tailwind CSS imports
│   └── package.json
└── README.md
```

## Key Configuration Files

- **Backend**:
  - `backend/src/app.module.ts`: Configures TypeORM (`sqlite`, `database.sqlite`).
  - `backend/src/main.ts`: Enables CORS for `http://localhost:5173`.
- **Frontend**:
  - `frontend/vite.config.ts`: Configures Tailwind CSS plugin.
  - `frontend/src/index.css`: Imports Tailwind (`@import "tailwindcss";`).
  - `frontend/src/services/api.ts`: Configures Axios baseURL (`http://localhost:3000`).

## Instructions to Run Locally

### 1. Start the Backend

Open a terminal in the `backend` directory:

```bash
cd backend
npm install
npm run start:dev
```

The server will start at `http://localhost:3000`.

### 2. Start the Frontend

Open a new terminal in the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### 3. Usage

- Navigate to `http://localhost:5173`.
- Click **New Ticket** to create a ticket.
- Fill in the title, description, and status.
- Save to return to the list.
- Use **Edit** or **Delete** buttons on the ticket cards.
