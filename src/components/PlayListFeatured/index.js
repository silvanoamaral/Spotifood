import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchSpotifySuccess } from '../../redux/actions'
import getSpotify from '../../services/fetchSpotify'
import Loading from '../Loading'
import CardList from '../CardList'
import Filters from '../Filters'

class PlayListFeatured extends Component {
  constructor(props) {
		super(props)
		this.state = {
      filtered: [],
      items: []
		}
		this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const { dispatch } = this.props
    dispatch(getSpotify.fetchSpotify())
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { playlists } = nextProps.spotify
    if(playlists) {
      this.setState({
        filtered: playlists.items,
        items: playlists.items
      })
    }
  }

	handleChange(e) {
    let currentList = []
    let newList = []

    if (e.target.value !== '') {
      currentList = this.state.items
      console.log(currentList)

      newList = currentList.filter(item => {
        const lc = item.name.toLowerCase()
        const filter = e.target.value.toLowerCase()
        return lc.includes(filter)
      })
    } else {
      newList = this.state.items
    }

    const { dispatch } = this.props
    dispatch(fetchSpotifySuccess(newList))
    console.log('newList', newList)
    this.setState({
      filtered: newList
    })
  }

  render() {
    const { spotify, pending, error} = this.props
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
              <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
              {spotify &&
                <>
                  <CardList list={ spotify } />
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
    spotify
  } = spotifyReducer || {
    error: false,
    pending: true,
    spotify: []
  }

  return {
    error,
    pending,
    spotify
  }
}

export default connect(
  mapStateToProps,
)(PlayListFeatured)

PlayListFeatured.propTypes = {
  error: PropTypes.string,
  pending: PropTypes.boolean,
  items: PropTypes.array,
  spotify: PropTypes.object,
  dispatch: PropTypes.func
}
