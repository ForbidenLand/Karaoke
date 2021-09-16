"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSong = exports.findSongByGenre = exports.createSong = exports.findAllSongs = void 0;
const dbconfig_1 = require("../db/dbconfig");
const findAllSongs = async () => {
    const result = await dbconfig_1.pool.execute('select * from song');
    console.log(result);
    return result;
};
exports.findAllSongs = findAllSongs;
const createSong = async (newSong) => {
    const result = await dbconfig_1.pool.execute('insert into song (title, author, description, photo, music_url, lyrics_url, avg_mark, mark_count, genre_id) values (?, ?, ?, ?, ?, ?, 0, 0, ?)', [
        newSong.title,
        newSong.author,
        newSong.description,
        newSong.photo,
        newSong.music_url,
        newSong.lyrics_url,
        newSong.genre_id
    ]);
    return result;
};
exports.createSong = createSong;
const findSongByGenre = async (genre_id) => {
    const result = await dbconfig_1.pool.execute('select * from song where genre_id = ?', [genre_id]);
    return result;
};
exports.findSongByGenre = findSongByGenre;
const deleteSong = async (song_id) => {
    const result = await dbconfig_1.pool.execute('delete from song where song_id = ?', [song_id]);
    return result;
};
exports.deleteSong = deleteSong;
//# sourceMappingURL=SongService.js.map