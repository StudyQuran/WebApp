import { combineReducers } from 'redux'
import AuthReducer from './Auth/Reducer'

const root_reducer = combineReducers({
  Auth: AuthReducer
})

export default root_reducer
