'use strict'

const fetch = require('node-fetch')
 
const getSpotifyList = async (code) => {

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + code
    }
  }
  return await fetch('https://api.spotify.com/v1/browse/featured-playlists?limit=25', options)
  .then(response => {
    if(response.status !== 200) {
      throw Error(response.statusText)
    }
    return response.json()
  })
  .then(responseData => {
    return responseData
  })
}

module.exports = {
  getSpotifyList
}
