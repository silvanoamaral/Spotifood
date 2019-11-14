import React from 'react'
import ReactDOM from 'react-dom'
import CardList from './index'

it('renders CardList', () => {
  const filtered = {
    "playlists": {
      "items" : [ {
        "id" : "6ftJBzU2LLQcaKefMi7ee7",
        "name" : "Monday Morning Mood",
      } ]
    }
  }
  const div = document.createElement('div')
  ReactDOM.render(<CardList list={ filtered } />, div)
  ReactDOM.unmountComponentAtNode(div)
})
