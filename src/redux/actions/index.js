import {
  FETCH_SPOTIFY_PENDING,
  FETCH_SPOTIFY_SUCCESS,
  FETCH_SPOTIFY_SEARCH,
  FETCH_SPOTIFY_ERROR,
  FETCH_SPOTIFY_SELECT,
} from './actionTypes'

export const fetchSpotifyPending = () => ({
  type: FETCH_SPOTIFY_PENDING,
})

export const fetchSpotifySuccess = spotify => ({
  type: FETCH_SPOTIFY_SUCCESS,
  spotify,
})

export const fetchSpotifyError = error => ({
  type: FETCH_SPOTIFY_ERROR,
  error,
})

export const search = value => ({
  type: FETCH_SPOTIFY_SEARCH,
  value,
})

export const select = option => {
  return {
    type: FETCH_SPOTIFY_SELECT,
    option
  }
}