const mysql = require('mysql2/promise');

let pool;

async function connectDatabase() {
  pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'taskmanager',
    waitForConnections: true, // user wait until the connection is available.
    connectionLimit: 10,
    timezone: 'Z'
  });

  const connection = await pool.getConnection();
  connection.release(); //this will returns the connection back to the pool after been occupied i.e now available.
  console.log('Connected to MySQL');
}

// conection pool is a collection of reusable db connections

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
