import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { search } from '../../redux/actions'

class SearchBar extends Component {
  render() {
    const { search, value } = this.props

    return (
      <input
        type="text"
        className="search"
        placeholder="Search..."
        onChange={ e => search(e.target.value) }
        value={ value }
      />
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
