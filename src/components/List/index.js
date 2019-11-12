import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import getSpotify from '../../services/fetchSpotify'

class List extends Component {
  constructor(props) {
		super(props)
		this.state = {
      filtered: [],
      items: []
		}
		this.handleChange = this.handleChange.bind(this)
  }

  async callApi() {
    const response = await fetch(`api/getList`)
    const body = await response.json()

    if (response.status !== 200) throw Error(body.message)

    return body
  }

  async componentDidMount() {
    const { dispatch } = this.props
    await dispatch(getSpotify.fetchSpotify())
    /* await this.callApi()
    .then(res => {
      this.setState({ 
        items: res.playlists.items,
        filtered: res.playlists.items
      })
    })
    .catch(err => err) */
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
    })
  }
	
	handleChange(e) {
    let currentList = []
    let newList = []

    if (e.target.value !== '') {
      currentList = this.state.items

      newList = currentList.filter(item => {
        const lc = item.name.toLowerCase()
        const filter = e.target.value.toLowerCase()
        return lc.includes(filter)
      })
    } else {
      newList = this.state.items
    }

    this.setState({
      filtered: newList
    })
  }

  render() {
    const { spotify = [], pending, error} = this.props

    const isEmpty = spotify.length === 0

		return (
      <>
        {isEmpty
          ? (pending ? <h1>aguarde...</h1> : <h1>Emply</h1>)
          : (error ? 
            <p>{error}</p> :

            <div className="container">
              <section className="section">
                <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
                <ul>
                  {this.state.filtered &&
                    this.state.filtered.map(item => (
                      <li key={item.id}>
                        {item.name}
                      </li>
                    ))
                  }
                </ul>
              </section>
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
)(List)

//export default List

List.propTypes = {
  error: PropTypes.string,
  pending: PropTypes.boolean,
  items: PropTypes.array,
  spotify: PropTypes.object,
  dispatch: PropTypes.func
}
