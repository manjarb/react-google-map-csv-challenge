import { UPDATE_CSV_LIST } from '../actions/actionTypes'

const csvList = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CSV_LIST:
      return action.payload
    default:
      return state
  }
}

export default csvList
