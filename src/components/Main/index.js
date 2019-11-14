import React, { Component } from 'react'

import PlayListFeatured from '../PlayListFeatured'
import Header from '../Header'
import Footer from '../Footer'

class Main extends Component {
  render() {
    return (
      <>
        <Header />
        <PlayListFeatured />
        <Footer />
      </>
    )
  }
}

export default Main
