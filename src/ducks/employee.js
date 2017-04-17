import {getAllEmployeesController, deleteEmployeesController} from '../api/employee'

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

        getAllEmployeesController(dispatch)
            .then(function (response) {
                return response.json();
            })
            .then(function (message) {

                console.log('message in operators :', message);

                if (message.error) throw new Error();

                dispatch({
                    type: types.SAVE_LIST_EMPLOYEE,
                    data: message.content
                });


            }).catch((error) => {
                console.log(error);
                alert("Ошибка подключиния к серверу!");
            });

    },

    deleteEmployees:(params = {}) => (dispatch, getState) => {

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


            }).catch((error) => console.log(error))
    },

    setActiveYmployee:(id) => (dispatch) => {
        dispatch({
            type: types.SET_ACTIVE_EMPLOYEE,
            id
        });
    }


}