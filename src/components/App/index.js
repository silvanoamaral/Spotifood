import React, { Component } from 'react'

import List from '../List'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  isLogin() {
    const ckname = 'accessToken'
    var code = document.cookie.match('(^|;) ?' + ckname + '=([^;]*)(;|$)')
    return code[2] !== 'undefined' ? true : false
  }

  render() {
    return (
      <div className="content">
        {this.isLogin() ?
          <div className="container">
            <section className="section">
              <List />
            </section>
          </div>
        :
          <h1>Você precisa realizar o Login</h1>
        }
      </div>
    )
  }
}

export default App
