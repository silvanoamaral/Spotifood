import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import getSpotify from '../../services/fetchSpotify'
import Loading from '../Loading'
import CardList from '../CardList'
//import Filters from '../Filters'
import SearchBar from '../SearchBar'
import Login from '../Login'

class PlayListFeatured extends Component {
  async componentDidMount() {
    const { dispatch } = this.props
    dispatch(getSpotify.fetchSpotify())
  }

  render() {
    const { spotify, pending, error, filtered } = this.props
    const isEmpty = spotify.length === 0

    return (
      <>
        {isEmpty 
        ? (
            pending ? <Loading />
            : <h1>Emply</h1>
          )
        : error 
        ? <Login error={ error } />
        : (
            <div className="container">
              <SearchBar />
              {filtered && (
                <>
                  <CardList list={ filtered } />
                </>
              )}
            </div>
          )
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  const { spotifyReducer } = state

  const {
    error,
    pending,
    spotify,
    filtered
  } = spotifyReducer || {
    error: false,
    pending: true,
    spotify: [],
    filtered: [],
  }

  return {
    error,
    pending,
    spotify,
    filtered,
  }
}

export default connect(mapStateToProps)(PlayListFeatured)

PlayListFeatured.propTypes = {
  error: PropTypes.string,
  pending: PropTypes.bool,
  dispatch: PropTypes.func,
  filtered: PropTypes.any,
  spotify: PropTypes.any
}
