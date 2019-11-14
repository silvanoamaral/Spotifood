import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import getSpotify from '../../services/fetchSpotify'
// { select } from '../../redux/actions'

class Dropdown extends Component {
  
  handleChangeSelect(e) {
    console.log(this.state)
    const { dispatch } = this.props
    console.log('handleChangeSelect',this.props)  
    const value = e.target.value
    if(value != 0) {
      const locale = 'pt_BR',
      country = 'BR',
      offset = 1,
      limit = 40
      dispatch(getSpotify.fetchSpotify(locale, country, offset, limit))
    }    
  }

  render() {
    const { select, option } = this.props
    console.log('this.props', this.props)

    return (
      <>
        <h2>{option}</h2>
        <select onChange={ this.handleChangeSelect } >
          <option value="0">Select um País</option>
          <option value="AU">Australia</option>
          <option value="DE">Alemanhã</option>
          <option value="BR">Brasil</option>
          <option value="PT">Portugal</option>
          <option value="UE">EUA</option>
          <option value="RU">Rússia</option>
        </select>
      </>
    )
  }
}

//export default Dropdown
const mapStateToProps = state => {
  const { spotifyReducer } = state

  const {
    option
  } = spotifyReducer || {
    option
  }

  return {
    option
  }
}

export default connect(mapStateToProps)(Dropdown)

Dropdown.propTypes = {
  option: PropTypes.string,
  select: PropTypes.func,
  dispatch: PropTypes.func
}
