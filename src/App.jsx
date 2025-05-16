import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Intro from './components/Intro'
import FeaturedList from './components/FeaturedList'

function App() {

  return (
    <>
    <NavBar></NavBar>
    <Intro></Intro>
    <FeaturedList></FeaturedList>
    </>
  )
}

export default App
