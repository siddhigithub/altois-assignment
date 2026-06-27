const mysql = require('mysql2/promise');

let pool;

async function connectDatabase() {
  pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'taskmanager',
    waitForConnections: true,
    connectionLimit: 10,
    timezone: 'Z',
    ssl: {
      rejectUnauthorized: true
    }
  });

  const connection = await pool.getConnection();
  connection.release();
  console.log('Connected to Database');
}

function getPool() {
  if (!pool) {
    throw new Error('Database connection has not been established.');
  }
  return pool;
}

module.exports = {
  connectDatabase,
  getPool
};