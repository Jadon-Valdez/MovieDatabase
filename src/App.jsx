import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Intro from './components/Intro'
import FeaturedList from './components/FeaturedList'
import Home from './views/Home'

function App() {

  return (
    <>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
    {/* <NavBar></NavBar>
    <Intro></Intro>
    <FeaturedList></FeaturedList> */}
    </>
  )
}

export default App
