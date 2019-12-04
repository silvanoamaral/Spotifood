import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import CheckBox from '../CheckBox'
import DropDown from '../DropDown'

class Filters extends Component {
  render() {
    const { filters, dispatch } = this.props.props

    return (
      <section className="filters">
        {filters.filters &&
          filters.filters.map(filter => {
            return (
              filter.id === 'locale' || filter.id === 'country' ?
                <DropDown data={ filter } key={ filter.id } dispatch={ dispatch } />
              :
                <p key={ filter.id }>{ filter.name }</p>
            )
          })}
      </section>
    )
  }
}

export default Filters

Filters.propTypes = {
  dispatch: PropTypes.func,
  filters: PropTypes.any,
  props: PropTypes.any
}
