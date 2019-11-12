import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CheckBox from '../CheckBox'

class Filters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: null
    }
  }

  async getFilter() {
    return await fetch('https://www.mocky.io/v2/5a25fade2e0000213aa90776')
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data
    })
    .catch( err => {
      err.text().then( errorMessage => {
        return errorMessage
      })
    })
  }

  async componentDidMount() {
    const filters = await this.getFilter()

    this.setState({
      filters
    })
  }

  render() {
    return (
      <section className="filters">
        {this.state.filters &&
          this.state.filters.filters.map(filter => {
            return <ul key={ filter.id } className="filters">
              <h2>{ filter.name }</h2>
              {filter.values &&
                filter.values.map(value => {
                  return <li key={ value.name } className="checkbox">
                    <CheckBox
                      name={ value.name }
                      value={ value.value }
                      params={ filter.id === 'country' ? 'market' : 'locale' }
                      event={ this.handleClikInput }
                      />
                  </li>
                })
              }
            </ul>
          })
        }
      </section>
    )
  }
}

export default Filters

Filters.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  params: PropTypes.string,
  event: PropTypes.func
}