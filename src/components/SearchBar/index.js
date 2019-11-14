import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { search } from '../../redux/actions'
import './SearchBar.scss'

class SearchBar extends Component {
  render() {
    const { search, value } = this.props

    return (
      <div className="search">
      <input
        type="text"
        className="search__input"
        placeholder="Filtrar pelo nome"
        onChange={ e => search(e.target.value) }
        value={ value }
      />
      </div>
    )
  }
}

const mapStateToProps = ({ spotifyReducer }) => {
  return {
    value: spotifyReducer !== undefined ? spotifyReducer.value : '',
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ search }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

SearchBar.propTypes = {
  value: PropTypes.string,
  search: PropTypes.func,
}
