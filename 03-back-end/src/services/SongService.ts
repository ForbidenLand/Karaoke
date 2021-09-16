import { pool } from "../db/dbconfig";
import { Song } from "../entities/song.interface";

export const findAllSongs = async(): Promise<Song[]> => {
  const result = await pool.execute('select * from song');
  console.log(result);
  return result;
}

export const createSong = async(newSong: Song): Promise<Song> => {
  const result = await pool.execute('insert into song (title, author, description, photo, music_url, lyrics_url, avg_mark, mark_count, genre_id) values (?, ?, ?, ?, ?, ?, 0, 0, ?)', [
    newSong.title,
    newSong.author,
    newSong.description,
    newSong.photo,
    newSong.music_url,
    newSong.lyrics_url,
    newSong.genre_id
  ])
  return result;  
}

export const findSongByGenre = async(genre_id: number): Promise<Song[]> => {
  const result = await pool.execute('select * from song where genre_id = ?', [genre_id]);
  return result;
}

export const deleteSong = async(song_id: number): Promise<Song> => {
  const result = await pool.execute('delete from song where song_id = ?', [song_id]);
  return result;
}