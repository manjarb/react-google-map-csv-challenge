import axios from 'axios'
import { UPDATE_CSV_DETAIL } from './actionTypes'

export const updateCsvDetail = payload => ({
  type: UPDATE_CSV_DETAIL,
  payload,
})

export const getCsvDetail = id => (dispatch) => {
  axios.get(`/api/csv/${id}`)
    .then((res) => {
      dispatch(updateCsvDetail(res.data.result))
    })
    .catch((e) => {
      console.log(e)
    })
}
