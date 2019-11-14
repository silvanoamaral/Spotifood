import React, { Component } from 'react'

import './Header.scss'

class Header extends Component {
  render() {
    return (
      <header>
        <div className="container">
          <div className="logo">
            <img
              src={require('../../../public/imagen/logo-spotify.png')}
              alt="Spotify Developers"
            />
          </div>
        </div>
      </header>
    )
  }
}

export default Header