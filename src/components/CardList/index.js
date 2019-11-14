import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CardList extends Component {
  render() {
    const { playlists } = this.props.list

    return (
      <ul className="card">
        {playlists &&
          playlists.items.map(item =>
            <li key={ item.id }>
              {item.name}
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