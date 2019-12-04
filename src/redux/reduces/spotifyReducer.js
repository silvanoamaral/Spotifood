import {
  FETCH_SPOTIFY_ERROR,
  FETCH_SPOTIFY_PENDING,
  FETCH_SPOTIFY_SUCCESS,
  FETCH_SPOTIFY_SEARCH,
  FETCH_SPOTIFY_SELECT
} from '../actions/actionTypes'

const initialState = {
  pending: false,
  spotify: [],
  filtered: [],
  filters: [],
  value: '',
  option: '',
  error: null,
}

export const spotifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPOTIFY_SUCCESS:
      return {
        ...state,
        pending: false,
        spotify: action.spotify.spotify,
        filtered: action.spotify.spotify,
        filters: action.spotify.filters
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
    case FETCH_SPOTIFY_SELECT: {
      return {
        ...state,
        pending: false,
        option: action.option
      }
    }
    default:
      return state
  }
}
