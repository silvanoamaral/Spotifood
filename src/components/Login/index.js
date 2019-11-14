import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Login.scss'

class Login extends Component {
  render() {
    const { error } = this.props

    return (
      <>
        <div className="container">
          <div className="acesss__spotify">
            <p>{ error }</p>
            <a href="/login">Ir para a página login</a>            
          </div>
        </div>
      </>
    )
  }
}

export default Login


Login.propTypes = {
  error: PropTypes.string
}