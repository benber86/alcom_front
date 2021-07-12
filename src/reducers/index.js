import { combineReducers } from 'redux'
import {rootReducer, initialState as rootState} from './rootReducer'

export const initialState = Object.assign(rootState)

export const reducers = combineReducers({
  root: rootReducer
})