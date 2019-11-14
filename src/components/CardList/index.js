import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './CardList.scss'

class CardList extends Component {
  render() {
    const { playlists } = this.props.list

    return (
      <ul className="card">
        {playlists &&
          playlists.items.map(item =>
            <li key={ item.id }>              
              <img src={item.images[0].url} />
              <p>{item.name}</p>
            </li>
          )
        }
      </ul>
    )
  }
}

export default CardList

CardList.propTypes = {
  list: PropTypes.any,
  playlists: PropTypes.any,
}