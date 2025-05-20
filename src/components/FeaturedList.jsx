import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../static/MovieSlider.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PlayBtn from '../assets/playbtn.png';
const token = import.meta.env.VITE_TMDB_TOKEN;

function Modal({ show, onClose, videoKey }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} style={{ width: '80%', height: '80%' }}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function FeaturedList() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/movie/now_playing',
          params: { language: 'en-US', page: '1' },
          headers: {
            accept: 'application/json',
            Authorization:
              `Bearer ${token}`,
          },
        };

        const res = await axios.request(options);
        const movieBriefList = res.data.results.slice(0, 6);

        const detailRequests = movieBriefList.map((movie) =>
          axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
            params: { language: 'en-US' },
            headers: options.headers,
          })
        );

        const detailedResponses = await Promise.all(detailRequests);
        const detailedMovies = detailedResponses.map((r) => r.data);

        setFeaturedMovies(detailedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchFeaturedMovies();
  }, []);

  const fetchVideoAndOpenModal = async (movieId) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzY0NmZmMzcxOTJhZTQxMzBhY2FhZTE5MmYyOWM2MCIsIm5iZiI6MTc0NzM2MTI0Ni44NTYsInN1YiI6IjY4MjY5ZGRlNGY4Y2EyOTdkYzRiNTk2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l7UonY9jAiJ-A9oR8JF0s3Gqur0bhNAfVvBonAqoVuc',
        },
      };

      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );

      const results = res.data.results;
      if (results.length > 0) {
        setVideoKey(results[0].key);
        setModalOpen(true);
      } else {
        alert('No trailers available for this movie.');
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  return (
    <>
      <div className="card-container">
        <Slider {...settings}>
          {featuredMovies.map((movie) => (
            <div className="card" slick-animated key={movie.id}>
              <div
                className="hero"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
                }}
              >
                <div className="overlay">
                  <div className="img-container">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                  <div className="text-container">
                    <div className="title">
                      <h2 className="movie-title">{movie.title}</h2>
                      <p className="secondary-info">
                        {movie.release_date.slice(0, 4)} &#8226;{' '}
                        {movie.genres
                          .slice(0, 2)
                          .map((genre) => genre.name)
                          .join(', ')}{' '}
                        &#8226; {movie.runtime}min
                      </p>
                    </div>

                    <div
                      className="trailer"
                      style={{ cursor: 'pointer' }}
                      onClick={() => fetchVideoAndOpenModal(movie.id)}
                    >
                      <div className="trailer-btn-container">
                        <img src={PlayBtn} alt="play button" />
                      </div>
                      <div>
                        <p>Watch Trailer</p>
                      </div>
                    </div>

                    <div className="overview">
                      <p>Overview</p>
                      <p>{movie.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <Modal show={modalOpen} videoKey={videoKey} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default FeaturedList;
