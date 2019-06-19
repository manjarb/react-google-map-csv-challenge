import { combineReducers } from 'redux'
import csvList from './csvList'
import csvDetail from './csvDetail'

export default combineReducers({
  csvList,
  csvDetail,
})
