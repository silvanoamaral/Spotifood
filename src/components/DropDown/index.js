import React, { Component } from 'react'

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tech: 'select'
    }
  }

  handleChange(e) {
    this.setState({
      tech: e.target.value
    })
  }

  render() {
    return (
      <>
        <h2>{this.state.tech}</h2>
        <select onChange={ this.handleChange.bind(this) } value={ this.state.tech }>
          <option value="select">Select a technology</option>
          <option value="Angular">Angular</option>
          <option value="Bootstrap">Bootstrap</option>
          <option value="React">React</option>
        </select>
      </>
    )
  }
}

export default Dropdown