import React, { useEffect, useState } from "react";
import "./MovieBoard.css";

function MovieBoard() {
  const [movies, setMovies] = useState([]);
  const [editMovie, setEditMovie] = useState(null);

  const getMovies = async () => {
    let res = await fetch("http://localhost:5000/movies");
    let data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const deleteMovie = async (id) => {
    await fetch(`http://localhost:5000/movies/${id}`, { method: "DELETE" });
    getMovies();
  };

  const saveMovie = async (id) => {
    await fetch(`http://localhost:5000/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editMovie),
    });
    setEditMovie(null);
    getMovies();
  };

  return (
    <div className="board">
      <h2>Movie Management</h2>

      {movies.length === 0 && <p>No movies yet.</p>}

      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            {editMovie && editMovie._id === movie._id ? (
              <>
                <input
                  value={editMovie.title}
                  onChange={(e) =>
                    setEditMovie({ ...editMovie, title: e.target.value })
                  }
                />
                <input
                  value={editMovie.director}
                  onChange={(e) =>
                    setEditMovie({ ...editMovie, director: e.target.value })
                  }
                />
                <input
                  value={editMovie.releaseYear}
                  onChange={(e) =>
                    setEditMovie({ ...editMovie, releaseYear: e.target.value })
                  }
                />
                <input
                  value={editMovie.genre}
                  onChange={(e) =>
                    setEditMovie({ ...editMovie, genre: e.target.value })
                  }
                />
                <button onClick={() => saveMovie(movie._id)}>Save</button>
              </>
            ) : (
              <>
                <b>{movie.title}</b> ({movie.releaseYear})  
                - {movie.director} [{movie.genre}]
                <div>
                  <button onClick={() => setEditMovie(movie)}>Edit</button>
                  <button onClick={() => deleteMovie(movie._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieBoard;
