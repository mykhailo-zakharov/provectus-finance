import { combineReducers } from 'redux'

import employee from '../ducks/employee'
import common from '../ducks/common'
import financeData from '../ducks/financeData'


export const rootReducer = combineReducers({
    common,
    employee,
    financeData,
});
