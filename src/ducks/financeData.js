import {getQuarterController} from '../api/financeData'

export const types = {
    GET_FINANCE_DATA: "GET_FINANCE_DATA",
    SAVE_FINANCE_DATA: "SAVE_FINANCE_DATA",
}

export const initialState = {

}

export default (state = initialState, action) => {
    switch (action.type) {

        case types.GET_FINANCE_DATA:
            return {...state};

        case types.SAVE_FINANCE_DATA:
            return {...state, list: action.data};

        default:
            return state
    }
}

//
export const actions = {

    getQuarter:(params = {}) => (dispatch, getState) => {

        console.log(params);

        dispatch({
            type: types.GET_FINANCE_DATA
        });

        getQuarterController(params)
            .then(function (response) {
                return response;
            })
            .then(function (message) {

                console.log('message in quarter :', message);

                // if (message.error) throw new Error();
                //
                // dispatch({
                //     type: types.SAVE_FINANCE_DATA,
                //     data: message.content
                // });


            }).catch((error) => console.log(error));

    },
//
//     deleteEmployees:(params = {}) => (dispatch, getState) => {
//
//         deleteEmployeesController(dispatch)
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (message) {
//
//                 console.log('message in operators :', message);
//
//                 if (message.error) throw new Error();
//
//                 dispatch({
//                     type: types.DELETE_EMPLOYEE
//                 });
//
//
//             }).catch((error) => console.log(error))
//     }
//
//
}