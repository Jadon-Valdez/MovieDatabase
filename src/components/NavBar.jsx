import React from 'react'
import '../static/NavBar.css'
import MovieLogo from '../assets/DATABASE.png'

function NavBar() {
  return (
    <div class="nav">
        <div>
            <img src={MovieLogo} alt="Movie database logo" />
        </div>
        {/* <div>
            <div>
                <a href='/'>Login</a>
            </div>
            <div>
                <a href='/'>Sign Up</a>
            </div>
        </div> */}
    </div>
  )
}

export default NavBar