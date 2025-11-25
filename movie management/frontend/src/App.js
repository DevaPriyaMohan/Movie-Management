import React, { useState, useEffect } from "react";
import { Contract,  BrowserProvider } from "ethers";
import Contract_Address  from "./contract_address.json";
import abi from "./abi.json";

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    id:0,
    title: "",
    releaseYear: "",
    genre: "",
  });

 const provider = new BrowserProvider(window.ethereum)

  async function connectMetaMask() {
    console.log(Contract_Address);
    
    const signer = await provider.getSigner()

    alert(`Successfully Connected ${signer.address}`)
  }
  const [editMovie, setEditMovie] = useState(null);

  const getMovies = async () => {
   const signer = await provider.getSigner()
    const instance = new Contract(Contract_Address.Contract_Address, abi.abi, signer)

    // const trx = await instance.getMovies(id)
    // console.log('Transaction Hash:', trx.hash)
  };

  useEffect(() => {
    getMovies();
  }, []);

  const addMovie = async () => {
  const signer = await provider.getSigner()
  console.log(Contract_Address);
  
    const instance = new Contract(Contract_Address.Contract_Address, abi.abi, signer)

    const trx = await instance.addMovie(newMovie.id,newMovie.title,newMovie.releaseYear,newMovie.genre)
    console.log('Transaction Hash:', trx.hash)
  };

  const saveEdit = async (id) => {
    await fetch(`http://localhost:5000/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editMovie),
    });
    setEditMovie(null);
    getMovies();
  };

  const deleteMovie = async (id) => {
    await fetch(`http://localhost:5000/movies/${id}`, { method: "DELETE" });
    getMovies();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{display:'flex',alignItems:'center'}}>
      <h1 style={{ flex: 1, textAlign: 'center' }}>Movie Management</h1>
      <button  style={{paddingRight:'20px'}} onClick={connectMetaMask}>connect metamask</button>
      </div>
      <h2>Add Movie</h2>
      
        <input
        placeholder="ID"
        value={newMovie.id}
        onChange={(e) => setNewMovie({ ...newMovie, id: e.target.value })}
      />
      <input
        placeholder="Title"
        value={newMovie.title}
        onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
      />
      {/* <input
        placeholder="Director"
        value={newMovie.director}
        onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
      /> */}
      <input
        placeholder="Year"
        value={newMovie.releaseYear}
        onChange={(e) => setNewMovie({ ...newMovie, releaseYear: e.target.value })}
      />
      <input
        placeholder="Genre"
        value={newMovie.genre}
        onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
      />
      {/* <input
        placeholder="Rating"
        value={newMovie.rating}
        onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
      /> */}
      <button onClick={addMovie}>Add Movie</button>

      <h2>Movie List</h2>
      {movies.map((movie) => (
        <div key={movie._id} style={{ margin: "10px", padding: "10px", border: "1px solid gray" }}>
          {editMovie && editMovie._id === movie._id ? (
            <>
              <input
                value={editMovie.title}
                onChange={(e) => setEditMovie({ ...editMovie, title: e.target.value })}
              />
              <input
                value={editMovie.director}
                onChange={(e) => setEditMovie({ ...editMovie, director: e.target.value })}
              />
              <input
                value={editMovie.releaseYear}
                onChange={(e) => setEditMovie({ ...editMovie, releaseYear: e.target.value })}
              />
              <input
                value={editMovie.genre}
                onChange={(e) => setEditMovie({ ...editMovie, genre: e.target.value })}
              />
              <input
                value={editMovie.rating}
                onChange={(e) => setEditMovie({ ...editMovie, rating: e.target.value })}
              />
              <button onClick={() => saveEdit(movie._id)}>Save</button>
            </>
          ) : (
            <>
              <p>
                <b>{movie.title}</b> ({movie.releaseYear}) – {movie.director} [{movie.genre}]
                {movie.rating}
              </p>
              <button onClick={() => setEditMovie(movie)}>Edit</button>
              <button onClick={() => deleteMovie(movie._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;