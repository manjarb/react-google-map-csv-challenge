import axios from 'axios'
import { UPDATE_CSV_LIST } from './actionTypes'

export const updateCsvList = payload => ({
  type: UPDATE_CSV_LIST,
  payload,
})

export const getCsvList = () => (dispatch) => {
  axios.get('/api/csv-list')
    .then((res) => {
      dispatch(updateCsvList(res.data.result))
    })
    .catch((e) => {
      console.log(e)
    })
}

export const uploadCsv = formData => (dispatch) => {
  axios({
    method: 'post',
    url: '/upload/csv',
    data: formData,
    config: { headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' } },
  }).then((res) => {
    dispatch(updateCsvList(res.data.result))
  }).catch((e) => {
    console.log(e)
  })
}
