"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGenre = exports.deleteGenre = exports.createGenre = exports.findSingleGenre = exports.findAllGenres = void 0;
const dbconfig_1 = require("../db/dbconfig");
const findAllGenres = async () => {
    const result = await dbconfig_1.pool.query("Select * from genre");
    console.log(result);
    return result;
};
exports.findAllGenres = findAllGenres;
const findSingleGenre = async (id) => {
    const result = await dbconfig_1.pool.execute('Select * from genre WHERE genre_id = ?', [id]);
    console.log(result);
    return result;
};
exports.findSingleGenre = findSingleGenre;
const createGenre = async (newGenre) => {
    const result = await dbconfig_1.pool.execute('insert into genre set name = ?', [newGenre.name]);
    console.log(result);
    return result;
};
exports.createGenre = createGenre;
const deleteGenre = async (id) => {
    const result = await dbconfig_1.pool.execute('delete from genre WHERE genre_id = ?', [id]);
    console.log(result);
    return result;
};
exports.deleteGenre = deleteGenre;
const updateGenre = async (id, newGenre) => {
    const result = await dbconfig_1.pool.execute('update genre set name = ? where genre_id = ?', [newGenre.name, id]);
    console.log(result);
    return result;
};
exports.updateGenre = updateGenre;
//# sourceMappingURL=GenreService.js.map