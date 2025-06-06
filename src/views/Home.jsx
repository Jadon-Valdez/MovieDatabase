import React from 'react';
import NavBar from '../components/NavBar';
import FeaturedList from '../components/FeaturedList';
import Intro from '../components/Intro';
import '../static/MovieSlider.css';
import Search from '../components/Search';
import MovieGenres from '../components/MovieGenres';

function Home() {
  return (
    <div className="home-style">
        <NavBar></NavBar>
        {/* <Intro></Intro> */}
        <FeaturedList></FeaturedList>
        <Search></Search>
        <MovieGenres></MovieGenres>
    </div>
  )
}

export default Home