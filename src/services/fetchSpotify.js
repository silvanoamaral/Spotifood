import {
  fetchSpotifyPending,
  fetchSpotifySuccess,
  fetchSpotifyError,
} from '../redux/actions'

const fetchSpotify = () => {
  return dispatch => {
    dispatch(fetchSpotifyPending())

    fetch(`api/getList?locale=en_US&country=US&offset=0&limit=20`)
      .then(res => {
        if (res.status !== 200) {
          dispatch(fetchSpotifyError('Não Autorizado, efetuar login'))
        }
        return res.json()
      })
      .then(res => {
        dispatch(fetchSpotifySuccess(res))
      })
      .catch(error => {
        dispatch(fetchSpotifyError(error))
      })
  }
}

export default {
  fetchSpotify,
}
