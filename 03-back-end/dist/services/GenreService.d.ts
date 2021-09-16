import { Genre } from "../entities/genre.interface";
export declare const findAllGenres: () => Promise<Genre[]>;
export declare const findSingleGenre: (id: number) => Promise<Genre>;
export declare const createGenre: (newGenre: Genre) => Promise<Genre>;
export declare const deleteGenre: (id: number) => Promise<Genre>;
export declare const updateGenre: (id: number, newGenre: Genre) => Promise<Genre>;
