import {getAllEmployeesController, deleteEmployeesController} from '../api/employee'
import {types as typesCommon} from './common'


export const types = {
    SAVE_LIST_EMPLOYEE: "SAVE_LIST_EMPLOYEE",
    DELETE_EMPLOYEE: "DELETE_EMPLOYEE",
    SET_ACTIVE_EMPLOYEE: "SET_ACTIVE_EMPLOYEE"
}

export const initialState = {
    activeEmployee: 1
}

export default (state = initialState, action) => {
    switch (action.type) {

        case types.SAVE_LIST_EMPLOYEE:
            return {...state, list: action.data};

        case types.SET_ACTIVE_EMPLOYEE:
            return {...state, activeEmployee: action.id};

        default:
            return state
    }
}

export const actions = {

    getAllEmployees:(params = {}) => (dispatch, getState) => {

        dispatch({ type: typesCommon.IS_PRELOADER_TRUE});

        getAllEmployeesController(dispatch)
            .then(function (response) {
                return response.json();
            })
            .then(function (message) {

                if (message.error) throw new Error();

                dispatch({
                    type: types.SAVE_LIST_EMPLOYEE,
                    data: message.content
                });

                dispatch({ type: typesCommon.IS_PRELOADER_FALSE});
                dispatch({ type: typesCommon.CLEAR_MODAL});

                return message;

            }).catch((error) => {
                console.log(error);
                alert("Ошибка подключиния к серверу!");
                dispatch({ type: typesCommon.IS_PRELOADER_FALSE});
            });

    },

    deleteEmployees:(params = {}) => (dispatch, getState) => {

        dispatch({type: typesCommon.IS_PRELOADER_TRUE});

        deleteEmployeesController(dispatch)
            .then(function (response) {
                return response.json();
            })
            .then(function (message) {

                console.log('delete  operators :', message);

                if (message.error) throw new Error();

                dispatch({
                    type: types.DELETE_EMPLOYEE
                });

                dispatch({type: typesCommon.IS_PRELOADER_FALSE});


            }).catch((error) => {
                dispatch({type: typesCommon.IS_PRELOADER_FALSE});
                console.log(error)
            })

    },

    setActiveYmployee:(id) => (dispatch) => {
        dispatch({
            type: types.SET_ACTIVE_EMPLOYEE,
            id
        });
    }


}