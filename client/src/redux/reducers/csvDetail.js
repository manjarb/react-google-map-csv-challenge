import { UPDATE_CSV_DETAIL } from '../actions/actionTypes'

const csvDetail = (state = null, action) => {
  switch (action.type) {
    case UPDATE_CSV_DETAIL:
      return action.payload
    default:
      return state
  }
}

export default csvDetail
