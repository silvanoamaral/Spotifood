import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from '../../redux/store'
import List from '../List'
import Filters from '../Filters'
class App extends Component {

  isLogin() {
    const ckname = 'accessToken'
    var code = document.cookie.match('(^|;) ?' + ckname + '=([^;]*)(;|$)')
    return code[2] !== 'undefined' ? true : false
  }

  render() {
    return (
      <Provider store={ store }>
        <div className="content">
          {this.isLogin() ?
            <List />
          :
            <h1>Você precisa realizar o Login</h1>
          }
          <Filters />
        </div>
      </Provider>      
    )
  }
}

export default App
