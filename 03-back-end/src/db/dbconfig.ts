const mysql = require('mysql2/promise');

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'aplikacija',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});