import { cloneDeep } from 'lodash';
import { getFilterdRecords, changeRecordStatus } from '../utils/quarterUtils';
import { FILTER_ALL_VALUE, APPROVED, REJECTED, UNDEFINED } from '../constants/quarterConstants';

export const types = {
  FETCH_RECORDS_LIST: 'FETCH_RECORDS_LIST',
  APPEND_RECORDS_LIST: 'APPEND_RECORDS_LIST',
  CHANGE_RECORD_STATUS: 'CHANGE_RECORD_STATUS',
  FILTER_RECORDS: 'FILTER_RECORDS',
  CHANGE_ALL_RECORD_STATUSES: 'CHANGE_ALL_RECORD_STATUSES',
};

export const initialState = {
  inittaxRecords: [],
  taxRecords: [],
  filterItems: [APPROVED, REJECTED, UNDEFINED, FILTER_ALL_VALUE],
  filterValue: FILTER_ALL_VALUE,
  id: '',
  quarterDefinition: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RECORDS_LIST: {
      const { taxRecords, quarterDefinition, id } = action.data;

      return Object.assign({}, state, {
        taxRecords,
        inittaxRecords: cloneDeep(taxRecords),
        filterValue: initialState.filterValue,
        quarterDefinition,
        id,
      });
    }
    case types.APPEND_RECORDS_LIST: {
      debugger; // todo Юля пофикси

      const newtaxRecords = [...state.inittaxRecords, ...action.records];
      const inittaxRecords = cloneDeep(newtaxRecords);
      const taxRecords = getFilterdRecords(state.filterValue, inittaxRecords);

      return Object.assign({}, state, {
        taxRecords,
        inittaxRecords,
      });
    }
    case types.CHANGE_RECORD_STATUS: {
      const newtaxRecords = changeRecordStatus(
        state.inittaxRecords,
        action.recordId,
        action.newStatus);

      const inittaxRecords = cloneDeep(newtaxRecords);
      const newFilteredTaxRecords = getFilterdRecords(inittaxRecords, state.filterValue);

      return Object.assign({}, state, {
        taxRecords: newFilteredTaxRecords,
        inittaxRecords,
      });
    }
    case types.FILTER_RECORDS: {
      const newtaxRecords = getFilterdRecords(state.inittaxRecords, action.recordFilter);

      return Object.assign({}, state, {
        taxRecords: newtaxRecords,
        filterValue: action.recordFilter,
      });
    }
    case types.CHANGE_ALL_RECORD_STATUSES: { // todo
      return { ...state };
    }
    default:
      return state;
  }
};

export const actions = {
  fetchtaxRecords: data => (dispatch) => {
    dispatch({ type: types.FETCH_RECORDS_LIST, data });
  },
  filtertaxRecords: recordFilter => (dispatch) => {
    dispatch({ type: types.FILTER_RECORDS, recordFilter });
  },
  appendtaxRecords: records => (dispatch) => {
    dispatch({ type: types.APPEND_RECORDS_LIST, records });
  },
  changeStatus: (recordId, newStatus) => (dispatch) => {
    dispatch({ type: types.CHANGE_RECORD_STATUS, recordId, newStatus });
  },
};
