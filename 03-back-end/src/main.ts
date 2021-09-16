import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import * as mysql2 from "mysql2/promise";
import { findAllGenres, findSingleGenre, createGenre, deleteGenre, updateGenre } from "./services/GenreService";
import { Genre } from "./entities/genre.interface";
import { findAllSongs, createSong, findSongByGenre } from "./services/SongService";
import { Song } from "./entities/song.interface";


const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'aplikacija',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


const application: express.Application = express();

application.use(cors());
application.use(express.json());
//SONG

application.get("/song", async function(req, res) {
  const result = await findAllSongs();
  res.send(result[0]);
})

application.get('/song/genre/:id', async function(req, res) {
  const id: any = req.params.id;
  const result = await findSongByGenre(id);
  res.send(result[0]);
})

application.post('/song', async function(req, res) {
  const song: Song = req.body;
  const result = await createSong(song);
  res.send(song);
})

//USER

application.post("/register",async function(req, res){
  let username = req.body?.username;
  let password = req.body?.password;
  let userResult = await pool.execute('select * from user where username = ?',[username]);
  if (userResult[0].length>0){
    res.status(400).json({
      error: "Allready taken."
    });
    return;
  }
  if (password.length===0){
    res.status(400).json({
      error: "Password can`t be empty."
    });
    return;
  }
  const result = await pool.execute('insert into aplikacija.user set username = ? , password = ?',[username,password]);
  console.log(result);
  res.send(result[0]);

});

//GENRE

application.get("/genre",async function(req, res){
    // const result = await pool.query("Select * from genre");
    const result = await findAllGenres();
    console.log(result[0]);
    res.json(result[0]);
});

application.get("/genre/:id",async function(req, res){
  const id: number = +(req.params?.id);
  // const result = await pool.execute('Select * from genre WHERE genre_id = ?',[id]);
  const result = await findSingleGenre(id);
  console.log(result);
  res.json(result[0]);
});

application.post("/genre",async function(req, res){
  let name: Genre = req.body;
  const result = await createGenre(name);
  console.log(result);
  res.send(name);
});

application.delete("/genre/:id",async function(req, res){
  const id: number = +(req.params?.id);
  const result = await deleteGenre(id);
  console.log(result);
  res.send(result);
});

application.put('/genre/:id',async function(req, res){
  const id: number = +(req.params?.id);
  const body: Genre = req.body;
  const result = await updateGenre(id, body);
  res.send(result);
})

application.listen(Config.server.port);


