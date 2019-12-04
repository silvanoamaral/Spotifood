'use strict'

const fetch = require('node-fetch')

const getFilter = async (next) => {
  try {
    const options = {
      rejectUnauthorized: false,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    let result

    await fetch('http://www.mocky.io/v2/5a25fade2e0000213aa90776', options)
    .then(res => res.json())
    .then(data => {
      result = data
    })
    .catch(err => {
      result = err
    })

    return result
  } catch(error) {
    console.log('error.getFilter', error.message)
    next()
  }
  return false
}
 
const getSpotifyList = async (code, query, next) => {
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

  let spotify
  
  await fetch(url, options)
  .then(response => {
    if(response.status !== 200) {
      throw Error(response.statusText)
    }
    return response.json()    
  })
  .then(responseData => {
    spotify = responseData
  })

  const filters = await getFilter(next)

  const data = {
    spotify,
    filters
  }
  return data
}

module.exports = {
  getSpotifyList
}
