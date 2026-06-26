# Task Manager

A simple Full Stack Task Manager application built with **React (Vite)**, **Node.js**, **Express.js**, **MySQL**, and **Jest**.

##  Tech Stack

* **Frontend:** React (Vite), Axios, CSS
* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **Testing:** Jest

---

##  Database 

SQL Script

```sql
CREATE DATABASE taskmanager;
USE taskmanager;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DESC tasks;

SELECT * FROM tasks;
```

## Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=taskmanager
```

## Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

# Run the Project

### Start Backend

```bash
npm start
```
or
```bash
npm run dev
```

### Start Frontend

```bash
npm run dev
```

---

## 🧪 Run Tests

Inside the **backend** folder:

```bash
npm test
```