const database = require("./database");


// const getMovies = (req, res) => {

//   let sql = "SELECT * FROM movies ";
//   //FILTRER PAR COULEUR
//   const sqlValues = [];
//   if (req.query.color != null) {
//     sql += "WHERE color=?";
//     sqlValues.push(req.query.color);
//   }
//   //FILTRER PAR DURÉE MAXIMUM DU FILM en fonction de la valeur
//   if (req.query.max_duration != null)
//     sql += "WHERE duration <= ?";
//   sqlValues.push(req.query.max_duration)
//   database
//     .query(sql, sqlValues)
//     .then(([movies]) => {
//       res.json(movies);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error retrieving data from database");
//     });
// };
//----------------------------------------------------------------

const getMovies = (req, res) => {
  const initialSql = "select * from movies";
  const where = [];

  if (req.query.color != null) {
    where.push({
      column: "color",
      value: req.query.color,
      operator: "=",
    });
  }
  if (req.query.max_duration != null) {
    where.push({
      column: "duration",
      value: req.query.max_duration,
      operator: "<=",
    });
  }

  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )
    .then(([movies]) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};





//----------------------------------------------------------------



const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?,?,?,?,?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      console.log(result.insertId);
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error saving the movie");
    });
};

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id)
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "UPDATE movies set title=?, director=?, year=?, color=?, duration=? WHERE id =?",
      [title, director, year, color, duration, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error editing the movie");
    });
};

const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id)

  database
    .query('DELETE from movies WHERE id=?', [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500).send('Error deleting the movie');
    });
};


module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  updateMovie,
  deleteMovie,
};
