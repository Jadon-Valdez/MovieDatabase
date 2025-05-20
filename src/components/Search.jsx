import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../static/Search.css';
const token = import.meta.env.VITE_TMDB_TOKEN;

function Search() {

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const suppressOnChange = useRef(false);

  const containerRef = useRef();

  useEffect(() => {
    if (!query || suppressOnChange.current) {
      suppressOnChange.current = false;
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: { query, language: 'en-US', include_adult: false },
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        });
        setSuggestions(res.data.results.slice(0, 6));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (movie) => {
    suppressOnChange.current = true;
    setSelectedMovie(movie);
    setQuery(movie.title);
    setSuggestions([]);
  };

  return (
    <div className="search-container" ref={containerRef}>
        <h3 className="search-title">Search Any Movie</h3>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => {
          if (!suppressOnChange.current) {
            setQuery(e.target.value);
            setSelectedMovie(null);
          }
        }}
      />

      {loading && <div className="loading">Loading...</div>}

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((movie) => (
            <li key={movie.id} onMouseDown={() => handleSelect(movie)}>
              <div className="select-movie-container">
                <div>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : 'https://via.placeholder.com/92x138?text=?'
                    }
                    alt={movie.title}
                  />
                </div>
                <div>
                  <strong>{movie.title}</strong>
                  <p>{movie.release_date?.slice(0, 4)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedMovie && (
        <div className="selected-movie">
          <img
            src={
              selectedMovie.poster_path
                ? `https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image'
            }
            alt={selectedMovie.title}
          />
          <div className="movie-info">
            <h2>{selectedMovie.title}</h2>
            <p><strong>Release:</strong> {selectedMovie.release_date}</p>
            <p>{selectedMovie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
