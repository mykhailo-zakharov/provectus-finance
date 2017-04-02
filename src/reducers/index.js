import { combineReducers } from 'redux'
import user from './user'
import system from './system'
import employee from './employee'

export const rootReducer = combineReducers({
    user,
    system,
    employee
})
