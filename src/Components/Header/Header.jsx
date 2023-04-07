import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import {ImSearch} from 'react-icons/im'

const Header = () => {
    console.log(logo)
  return (
    <nav className="header">

        <img src={logo} alt='logo' />
        <div>
          <Link to='/tvshows'>Tv SHows</Link>
          <Link to='/movies'>Movies</Link>
          <Link to='/recentlyadd'>Recently Added</Link>
          <Link to='/mylinks'>My Links</Link>
        </div>
      <ImSearch />
    </nav>
  )
}

export default Header