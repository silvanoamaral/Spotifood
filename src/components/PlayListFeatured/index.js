import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import getSpotify from '../../services/fetchSpotify'
import Loading from '../Loading'
import CardList from '../CardList'
import Filters from '../Filters'
import SearchBar from '../SearchBar'
import Login from '../Login'

class PlayListFeatured extends Component {
  async componentDidMount() {
    const { dispatch } = this.props
    dispatch(getSpotify.fetchSpotify())
  }

  render() {
    const { pending, error, filtered, dispatch } = this.props

    return (
      <>
        {pending 
        ? <Loading />
        : (
          error ?
            <Login error={ error } />
          :
            <div className="container">
              <SearchBar />
              <Filters props={ this.props }/>
              {filtered && (
                <>
                  <CardList list={ filtered } dispatch={ dispatch } />
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
    filtered,
    filters,
  } = spotifyReducer || {
    error: false,
    pending: true,
    spotify: [],
    filtered: [],
    filters: [],
  }

  return {
    error,
    pending,
    spotify,
    filtered,
    filters,
  }
}

export default connect(mapStateToProps)(PlayListFeatured)

PlayListFeatured.propTypes = {
  error: PropTypes.string,
  pending: PropTypes.bool,
  dispatch: PropTypes.func,
  filtered: PropTypes.any,
  spotify: PropTypes.any,
  filters: PropTypes.any
}
