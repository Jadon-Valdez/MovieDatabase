import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../static/MovieGenres.css';
const token = import.meta.env.VITE_TMDB_TOKEN;

  const genres = [
    'Action', 'Comedy', 'Drama', 'Horror', 'Romance',
    'Sci-Fi', 'Thriller', 'Fantasy', 'Documentary', 'Animation'
  ];

  const genreMap = {
    Action: 28,
    Comedy: 35,
    Drama: 18,
    Horror: 27,
    Romance: 10749,
    'Sci-Fi': 878,
    Thriller: 53,
    Fantasy: 14,
    Documentary: 99,
    Animation: 16
  };

  const MovieGenres = () => {
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!selectedGenre) return;
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            with_genres: genreMap[selectedGenre],
            sort_by: 'popularity.desc',
            language: 'en-US',
            include_adult: false
          },
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json'
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  return (
    <div className="movie-genres-container">
      <div className="genre-buttons">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="masonry-grid">
        {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
                <img
                src={
                    movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={movie.title}
                />
                <div className="movie-overlay">{movie.title}</div>
            </div>
            ))}
      </div>
    </div>
  );
};

export default MovieGenres;