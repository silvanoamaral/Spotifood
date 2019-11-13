import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchSpotifySuccess } from '../../redux/actions'
import getSpotify from '../../services/fetchSpotify'
import Loading from '../Loading'
import CardList from '../CardList'
import Filters from '../Filters'
import SearchBar from '../SearchBar'

class PlayListFeatured extends Component {
  async componentDidMount() {
    const { dispatch } = this.props
    dispatch(getSpotify.fetchSpotify())
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.filtered.playlists) {
      const { dispatch } = this.props
      console.log('nextProps.filtered',nextProps)
      dispatch(fetchSpotifySuccess(nextProps.filtered))
    }
  }

  render() {
    const { spotify, pending, error, filtered } = this.props
    const isEmpty = spotify.length === 0

		return (
      <>
        {isEmpty
          ? (pending ? <Loading /> : <h1>Emply</h1>)
          : (error ?
            <div className="acesss__spotify">
              <a href="/login">Ir para a página login</a>
              <p>{error}</p>
            </div>
          :
            <section className="play__list">
              <SearchBar />
              {filtered &&
                <>
                  <CardList list={ filtered } />
                  <Filters />
                </>
              }
            </section>
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
    filtered: []
  }

  return {
    error,
    pending,
    spotify,
    filtered
  }
}

export default connect(
  mapStateToProps,
)(PlayListFeatured)

PlayListFeatured.propTypes = {
  error: PropTypes.string,
  pending: PropTypes.bool,
  dispatch: PropTypes.func,
  filtered: PropTypes.array,
  spotify: PropTypes.array
}

PlayListFeatured.defaultProps = {
  filtered: {},
  spotify: {}
}
