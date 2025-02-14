

import React, { useState } from 'react';
import './index.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=d7835d06aa9bf95f73ab15509e7dc769&query=${query}`);
    const data = await response.json();
    setMovies(data.results);
  };

  return (
    <div className="app">
      <div className="search-bar">
      <span className="site-name">Movie DB App Trending</span>   
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button onClick={fetchMovies}>Search</button>
      </div>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

function MovieCard({ movie }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      {showMore && (
        <div className="movie-details">
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
        </div>
      )}
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Hide' : 'View More'}
      </button>
    </div>
  );
}

export default App;