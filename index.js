const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const PORT = '3001';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Abcd.1234',
  database: 'sample_app',
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/api/getAllMovies', (req, res) => {
  const sqlSELECT = 
    "SELECT * FROM movie_reviews ORDER BY updated_at DESC";
    
  db.query(sqlSELECT, (err, result) => {
    err ? res.send(err) : res.send(result);
  })
});

app.post('/api/insert', (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const created_at = new Date();
  const sqlInsert = 
    "INSERT INTO `movie_reviews` (`movie_name`, `movie_review`, `created_at`) VALUES (?,?,?)";
  
  db.query(sqlInsert, [movieName, movieReview, created_at], (err, result) => {
    console.log(err,result);
    err ? res.send(err) : res.send(result);
  })
});

app.post('/api/update', (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const id = req.body.id;
  const sqlInsert = 
    "UPDATE `movie_reviews` SET movie_name = ?, movie_review = ? WHERE id = ? ";

  db.query(sqlInsert, [movieName, movieReview , id], (err, result) => {
    err ? res.send(err) : res.send(result);
  })
});

app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;
  const sqlDelete = 
    "DELETE FROM `movie_reviews` WHERE id = ?";
  
  db.query(sqlDelete, id, (err, result) => {
    err ? res.send(err) : res.send(result);
  })
})

app.listen(PORT, () => {
  console.log(`runnning on port ${PORT}`);
});