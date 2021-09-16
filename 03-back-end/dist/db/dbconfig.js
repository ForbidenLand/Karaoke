"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql = require('mysql2/promise');
exports.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'aplikacija',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
//# sourceMappingURL=dbconfig.js.map