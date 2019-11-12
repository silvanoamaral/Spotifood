import { FETCH_SPOTIFY_ERROR, FETCH_SPOTIFY_PENDING, FETCH_SPOTIFY_SUCCESS } from '../actions/actionTypes'

const initialState = {
  pending: false,
  spotify: [],
  error: null
}

export const spotifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPOTIFY_SUCCESS:
      return {
        ...state,
        pending: false,
        spotify: action.spotify
      }
    case FETCH_SPOTIFY_ERROR: 
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case FETCH_SPOTIFY_PENDING:
      return {
        ...state,
        pending: true,
        spotify: []
      }
    default:
      return state
  }
}

export const fetchspotifyError = () => ({
  type: FETCH_SPOTIFY_ERROR
})

export const fetchspotifyPendent = () => ({
  type: FETCH_SPOTIFY_PENDING
})