'use strict'

const fetch = require('node-fetch')
 
const getSpotifyList = async (code, query) => {
  const locale = query.locale || 'en_US',
    country = query.country || 'US',
    offset = query.offset || 0,
    limit = query.limit || 20

  const url = `https://api.spotify.com/v1/browse/featured-playlists?locale=${locale}&country=${country}&offset=${offset}&limit=${limit}`

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + code
    }
  }

  return await fetch(url, options)
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
