'use strict'

const express    = require('express')
const path       = require('path')
const bodyParser = require('body-parser')
const request = require('request')
var cookieParser = require('cookie-parser')

const { getSpotifyList } = require('../spotify/spotifyApi')
const spotifyAuth = require('../auth/authPublicKey')

const app = express()
const port = process.env.PORT || 5001

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/getList', async (req, res, next) => {
  try {
    if(!req.cookies.accessToken) {
      res.status(203).send({'message':'Não autorizado'})
    } else {
      const token = req.cookies.accessToken
      const playList = await getSpotifyList(token)
      res.send(playList)
    }
  } catch(error) {
    res.status(203).send({message:'Não autorizado'})
  }
  next()
})

app.get('/login', function(req, res) {
  const scopes = 'user-read-private user-read-email'
  res.redirect('https://accounts.spotify.com/authorize' +
    '?client_id=' + spotifyAuth.clientID +
    '&response_type=code' +
    '&redirect_uri=' + encodeURIComponent(spotifyAuth.redirectURI) +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&show_dialog=true')
})

app.get('/callback', async (req, res) => {
  const { code } = req.query

  try {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: spotifyAuth.redirectURI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(`${spotifyAuth.clientID}:${spotifyAuth.clientSecret}`).toString('base64'))
      },
      json: true
    }

    request.post(authOptions, async (error, response, body) => {
      if (error && response.statusCode !== 200) {
        throw Error(response.statusText)
      }

      res.cookie('accessToken',body.access_token)
      res.redirect('http://localhost:8001/')
    })
  } catch(err) {
    res.redirect('/#/error/invalid token')
  }
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'))

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'dist','index.html'))
  })
}

app.listen(port, () => console.log(`Listening on port http://localhost:${port}`))