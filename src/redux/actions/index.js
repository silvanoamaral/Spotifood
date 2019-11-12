import {
  FETCH_SPOTIFY_PENDING,
  FETCH_SPOTIFY_SUCCESS,
  FETCH_SPOTIFY_ERROR
} from './actionTypes'

export const fetchSpotifyPending = () => ({
  type: FETCH_SPOTIFY_PENDING
})

export const fetchSpotifySuccess = spotify => ({
  type: FETCH_SPOTIFY_SUCCESS,
  spotify
})

export const fetchSpotifyError = error => ({
  type: FETCH_SPOTIFY_ERROR,
  error
})