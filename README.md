# Task Manager Full Stack App

This project contains a beginner-friendly Task Manager application with separate `backend` and `frontend` folders.

## Backend

### Setup
1. Open `backend` folder.
2. Run `npm install`.
3. Create MySQL database manually or with SQL:
   - `CREATE DATABASE taskmanager;`
   - `USE taskmanager;`
   - Create the `tasks` table as shown in your schema.
4. Set environment variables if needed:
   - `DB_HOST` (default `127.0.0.1`)
   - `DB_USER` (default `root`)
   - `DB_PASSWORD` (default `root`)
   - `DB_NAME` (default `taskmanager`)

### Run
- `npm start` to start server
- `npm run dev` to start with nodemon
- `npm test` to run Jest validation tests

### API Endpoints
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Frontend

### Setup
1. Open `frontend` folder.
2. Run `npm install`.

### Run
- `npm run dev`

### Notes
- Frontend uses Axios to call backend at `http://localhost:5000/api`.
- Backend server must be running before using the frontend.
