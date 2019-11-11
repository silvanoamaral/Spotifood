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

  async callApi() {
    const response = await fetch(`api/getList`)
    const body = await response.json()

    if (response.status !== 200) throw Error(body.message)

    return body
  }

  componentDidMount() {
    if(this.isLogin()) {
      this.callApi()
      .then(res => this.setState({ list: res.express }))
      .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <div className="content">
        {this.isLogin() ?
          <div className="container">
            <section className="section">
              <List items={this.state.list} />
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
