import { pool } from "../db/dbconfig";
import { Genre } from "../entities/genre.interface";

export const findAllGenres = async(): Promise<Genre[]> => {
  const result = await pool.query("Select * from genre");
  console.log(result);
  return result;
}

export const findSingleGenre = async(id: number): Promise<Genre> => {
  const result = await pool.execute('Select * from genre WHERE genre_id = ?',[id]);
  console.log(result);
  return result;
}

export const createGenre = async(newGenre: Genre): Promise<Genre> => {
  const result = await pool.execute('insert into genre set name = ?',[newGenre.name]);
  console.log(result);
  return result;
}

export const deleteGenre = async(id: number): Promise<Genre> => {
  const result = await pool.execute('delete from genre WHERE genre_id = ?', [id]);
  console.log(result);
  return result;
}

export const updateGenre = async(id: number, newGenre: Genre): Promise<Genre> => {
  const result = await pool.execute('update genre set name = ? where genre_id = ?',[newGenre.name, id]);
  console.log(result);
  return result;
}