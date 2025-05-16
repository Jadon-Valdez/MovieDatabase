import React, { useEffect, useState } from 'react'
import axios from 'axios'

function FeaturedList() {

    const [movies, setMovies] = useState([])

    const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/now_playing',
    params: {language: 'en-US', page: '1'},
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzY0NmZmMzcxOTJhZTQxMzBhY2FhZTE5MmYyOWM2MCIsIm5iZiI6MTc0NzM2MTI0Ni44NTYsInN1YiI6IjY4MjY5ZGRlNGY4Y2EyOTdkYzRiNTk2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l7UonY9jAiJ-A9oR8JF0s3Gqur0bhNAfVvBonAqoVuc'
    }
    };

    axios
    .request(options)
    .then(res => setMovies(res.data.results)) //res.data.results since the returned JSON is an object and not an array
    .catch(err => console.error(err));

  return (
    <div>
        <ul>
            {movies.map(movie => (
                <li key={movie.id}>
                    <div>
                        <div>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                            <h1>{movie.title}</h1>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default FeaturedList