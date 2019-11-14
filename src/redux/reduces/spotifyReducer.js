import {
  FETCH_SPOTIFY_ERROR,
  FETCH_SPOTIFY_PENDING,
  FETCH_SPOTIFY_SUCCESS,
  FETCH_SPOTIFY_SEARCH,
} from '../actions/actionTypes'

const initialState = {
  pending: false,
  spotify: [],
  filtered: [],
  value: '',
  error: null,
}

export const spotifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPOTIFY_SUCCESS:
      return {
        ...state,
        pending: false,
        spotify: action.spotify,
        filtered: action.spotify,
      }
    case FETCH_SPOTIFY_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }
    case FETCH_SPOTIFY_PENDING:
      return {
        ...state,
        pending: true,
        spotify: [],
      }
    case FETCH_SPOTIFY_SEARCH: {
      const value = action.value

      return {
        ...state,
        value,
        filtered: {
          "playlists": {
            "items" : state.spotify.playlists.items.filter(item => {
              const lc = item.name.toLowerCase()
              const filter = value.toLowerCase()
              return lc.includes(filter)
            })
          }
        }
      }
    }
    default:
      return state
  }
}
