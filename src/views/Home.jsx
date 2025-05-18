import React from 'react'
import NavBar from '../components/NavBar'
import FeaturedList from '../components/FeaturedList'
import Intro from '../components/Intro'
import '../static/MovieSlider.css'

function Home() {
  return (
    <div className="home-style">
        <NavBar></NavBar>
        {/* <Intro></Intro> */}
        <FeaturedList></FeaturedList>
    </div>
  )
}

export default Home