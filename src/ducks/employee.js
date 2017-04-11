import {getAllEmployeesController, deleteEmployeesController} from '../api/employee'

export const types = {
    SAVE_LIST_EMPLOYEE: "SAVE_LIST_EMPLOYEE",
    DELETE_EMPLOYEE: "DELETE_EMPLOYEE"
}

export const initialState = {

}

export default (state = initialState, action) => {
    switch (action.type) {

        case types.SAVE_LIST_EMPLOYEE:
            return {...state, list: action.data};

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


            }).catch((error) => console.log(error));

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
    }


}