import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

//import getSpotify from '../../services/fetchSpotify'
// { select } from '../../redux/actions'

class Dropdown extends Component {

  handleChangeSelect(e) {
    e.preventDefault()

    const name = e.target.name
    const value = e.target.value
    if(value !== "0") {
      const data = []
      data.push({[name]:[value]})
      console.log(data)
      
    }
    
   /*  const { dispatch } = this.props
    console.log('handleChangeSelect',this.props)  
    const value = e.target.value
    if(value != 0) {
      const locale = 'pt_BR',
      country = 'BR',
      offset = 1,
      limit = 40
      dispatch(getSpotify.fetchSpotify(locale, country, offset, limit))
    }     */
  }

  render() {
    const { data } = this.props
    console.log('this.props', this.props)
    return (
      <>
        <select onChange={ this.handleChangeSelect } name={ data.id } data-name={ data.id }>
          <option value="0">Selecione {data.name === 'Locale' ? 'uma Localização' : `um ${data.name}`}</option>
          {
            data.values.map(value => {
              return <option
                value={ value.value }
                key={ value.value }
              >{ value.name }</option>
            })
          }
        </select>
      </>
    )
  }
}

export default Dropdown

Dropdown.propTypes = {
  data: PropTypes.any,
  option: PropTypes.string,
  select: PropTypes.func,
  dispatch: PropTypes.func
}
