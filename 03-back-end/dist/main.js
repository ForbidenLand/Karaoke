"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const dev_1 = require("./config/dev");
const GenreService_1 = require("./services/GenreService");
const SongService_1 = require("./services/SongService");
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
application.get("/song", async function (req, res) {
    const result = await (0, SongService_1.findAllSongs)();
    res.send(result[0]);
});
application.get('/song/genre/:id', async function (req, res) {
    const id = req.params.id;
    const result = await (0, SongService_1.findSongByGenre)(id);
    res.send(result[0]);
});
application.post('/song', async function (req, res) {
    const song = req.body;
    const result = await (0, SongService_1.createSong)(song);
    res.send(song);
});
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
    const result = await (0, GenreService_1.findAllGenres)();
    console.log(result[0]);
    res.json(result[0]);
});
application.get("/genre/:id", async function (req, res) {
    var _a;
    const id = +((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    const result = await (0, GenreService_1.findSingleGenre)(id);
    console.log(result);
    res.json(result[0]);
});
application.post("/genre", async function (req, res) {
    let name = req.body;
    const result = await (0, GenreService_1.createGenre)(name);
    console.log(result);
    res.send(name);
});
application.delete("/genre/:id", async function (req, res) {
    var _a;
    const id = +((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    const result = await (0, GenreService_1.deleteGenre)(id);
    console.log(result);
    res.send(result);
});
application.put('/genre/:id', async function (req, res) {
    var _a;
    const id = +((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    const body = req.body;
    const result = await (0, GenreService_1.updateGenre)(id, body);
    res.send(result);
});
application.listen(dev_1.default.server.port);
//# sourceMappingURL=main.js.map