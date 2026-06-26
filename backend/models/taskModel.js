const { getPool } = require('../config/db');

async function getAllTasks(status) {
  const pool = getPool();
  if (status) {
    const [rows] = await pool.execute(
      'SELECT * FROM tasks WHERE status = ? ORDER BY createdAt ASC',
      [status]
    );
    return rows;
  }

  const [rows] = await pool.execute('SELECT * FROM tasks ORDER BY createdAt ASC');
  return rows;
}

async function getTaskById(id) {
  const pool = getPool();
  const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0];
}

async function createTask(data) {
  const pool = getPool();
  const [result] = await pool.execute(
    'INSERT INTO tasks (title, description, status, priority) VALUES (?, ?, ?, ?)',
    [data.title, data.description || '', data.status, data.priority]
  );
  return getTaskById(result.insertId);
}

async function updateTask(id, data) {
  const pool = getPool();
  const [result] = await pool.execute(
    'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [data.title, data.description || '', data.status, data.priority, id]
  );
  return result.affectedRows;
}

async function deleteTask(id) {
  const pool = getPool();
  const [result] = await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);
  return result.affectedRows;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
