import { types as typesCommon } from './common';
import {
    getQuarterController,
    addQuarterController,
    getKursController,
    addTaxController,
    delTaxController,
    editeTaxController,
    upload,
    sendQuarterRecords,
    downloadFile,
} from '../api/financeData';

export const types = {
  GET_FINANCE_DATA: 'GET_FINANCE_DATA',
  SAVE_FINANCE_DATA: 'SAVE_FINANCE_DATA',
  SET_ACTIVE_EMPLOYEE: 'SET_ACTIVE_EMPLOYEE',
  ADD_QUATER: 'ADD_QUATER',
  SAVE_ADDED_QUATER: 'SAVE_ADDED_QUATER',
};

export const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case types.GET_FINANCE_DATA:
      return { ...state };

    case types.SAVE_FINANCE_DATA:
      return { ...state, list: action.data };

    case types.ADD_QUATER:
      const newList = [...state.list];
      newList.push(action.data);
      return { ...state, list: newList };

    default:
      return state;
  }
};

//
export const actions = {

  getQuarter: id => (dispatch, getState) => {
    dispatch({ type: typesCommon.IS_PRELOADER_TRUE });

    dispatch({ type: types.GET_FINANCE_DATA });

    getQuarterController(id)
            .then(response => response.json())
            .then((data) => {
                // console.log(data);

              dispatch({
                type: types.SAVE_FINANCE_DATA,
                data,
              });

              dispatch({ type: typesCommon.IS_PRELOADER_FALSE });
            }).catch((error) => {
              dispatch({ type: typesCommon.IS_PRELOADER_FALSE });
              console.log(error);
            });
  },

  addQuarter: (year, numb, id) => (dispatch) => {
    dispatch({ type: typesCommon.IS_PRELOADER_TRUE });

    return addQuarterController(year, numb, id)
            .then(response => response.json())
            .then((data) => {
                // dispatch({
                //     type: types.ADD_QUATER,
                //     data: data
                // });
              dispatch({ type: typesCommon.IS_PRELOADER_FALSE });
              return id;
            }).catch((error) => {
              dispatch({ type: typesCommon.IS_PRELOADER_FALSE });
              console.log(error);
            });
  },

  addTax: (data, idEmployee, idQuarter) => (dispatch) => {
    dispatch({ type: typesCommon.IS_PRELOADER_TRUE });

    return addTaxController(data, idEmployee, idQuarter)
            .then(response => response.json())
            .then((data) => {
              dispatch({ type: typesCommon.IS_PRELOADER_FALSE });
              return data;
            })
            .catch((error) => {
              dispatch({ type: typesCommon.IS_PRELOADER_FALSE });
              console.log(error);
            });
  },

  editeTax: (employeeId, quarterId, data) => (dispatch) => {
    dispatch({ type: typesCommon.IS_PRELOADER_TRUE });

    return editeTaxController(employeeId, quarterId, data)
            .then(response => response.json())
            .then((data) => {
              dispatch({ type: typesCommon.IS_PRELOADER_FALSE });
                // return data;
            })
            .catch((error) => {
              dispatch({ type: typesCommon.IS_PRELOADER_FALSE });
              console.log(error);
            });
  },

  deleteTax: (employeeId, quarterId, taxRecordId) => (dispatch) => {
    dispatch({ type: typesCommon.IS_PRELOADER_TRUE });

    return delTaxController(employeeId, quarterId, taxRecordId)
            .then(response => response.json())
            .then((data) => {
              dispatch({ type: typesCommon.IS_PRELOADER_FALSE });
                // return data;
            })
            .catch((error) => {
              dispatch({ type: typesCommon.IS_PRELOADER_FALSE });
              console.log(error);
            });
  },

  getKurs: date => (dispatch) => {
    dispatch({ type: typesCommon.IS_PRELOADER_TRUE });

    return getKursController(date)
            .then((response) => {
              dispatch({ type: typesCommon.IS_PRELOADER_FALSE });
              return response.json();
            })
            .catch((error) => {
              dispatch({ type: typesCommon.IS_PRELOADER_FALSE });
              console.log(error);
            });
  },

  upload: (formData, employeeId) => (dispatch) => {
    dispatch({ type: typesCommon.IS_PRELOADER_TRUE });
    return upload(formData, employeeId);
  },
  sendQuarterRecords: quarterObj => (dispatch) => {
    dispatch({ type: typesCommon.IS_PRELOADER_TRUE });
    return sendQuarterRecords(quarterObj);
  },

  downloadFile: location => () => downloadFile(location),
};
