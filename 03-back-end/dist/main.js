"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const dev_1 = require("./config/dev");
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'aplikacija',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const application = express();
application.use(cors());
application.use(express.json());
application.post("/register", async function (req, res) {
    var _a, _b;
    let username = (_a = req.body) === null || _a === void 0 ? void 0 : _a.username;
    let password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
    let userResult = await pool.execute('select * from user where username = ?', [username]);
    if (userResult[0].length > 0) {
        res.status(400).json({
            error: "Allready taken."
        });
        return;
    }
    if (password.length === 0) {
        res.status(400).json({
            error: "Password can`t be empty."
        });
        return;
    }
    const result = await pool.execute('insert into aplikacija.user set username = ? , password = ?', [username, password]);
    console.log(result);
    res.send(result[0]);
});
application.get("/genre", async function (req, res) {
    const result = await pool.query("Select * from genre");
    console.log(result);
    res.json(result[0]);
});
application.get("/genre/:id", async function (req, res) {
    var _a;
    const id = +((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    const result = await pool.execute('Select * from genre WHERE genre_id = ?', [id]);
    console.log(result);
    res.json(result[0]);
});
application.post("/genre", async function (req, res) {
    var _a;
    let name = (_a = req.body) === null || _a === void 0 ? void 0 : _a.name;
    const result = await pool.execute('insert into genre set name = ?', [name]);
    console.log(result);
    res.send(result);
});
application.delete("/genre/:id", async function (req, res) {
    var _a;
    const id = +((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    const result = await pool.execute('delete FROM genre WHERE genre_id = ?', [id]);
    console.log(result);
    res.send(result);
});
application.listen(dev_1.default.server.port);
//# sourceMappingURL=main.js.map