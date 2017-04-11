import { combineReducers } from 'redux'
import user from './user'
import system from './system'
// import employee from './employee'
import employee from '../ducks/employee'
import common from '../ducks/common'
import financeData from '../ducks/financeData'

export const rootReducer = combineReducers({
    common,
    employee,
    financeData,

    user,
    system

})
