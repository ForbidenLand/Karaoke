import { Song } from "../entities/song.interface";
export declare const findAllSongs: () => Promise<Song[]>;
export declare const createSong: (newSong: Song) => Promise<Song>;
export declare const findSongByGenre: (genre_id: number) => Promise<Song[]>;
export declare const deleteSong: (song_id: number) => Promise<Song>;
