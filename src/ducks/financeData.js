import {getQuarterController, addQuarterController} from '../api/financeData'

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

    getQuarter:(year, numb, id) => (dispatch, getState) => {

        dispatch({
            type: types.GET_FINANCE_DATA
        });

        dispatch({
            type: types.SET_ACTIVE_EMPLOYEE,
            id: id
        });

        getQuarterController(year, numb, id)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                console.log(data);

                dispatch({
                    type: types.SAVE_FINANCE_DATA,
                    data: data
                });


            }).catch((error) => console.log(error));

    },

    addQuarter:(params = {}) => (dispatch) => {

        addQuarterController(params)
            .then(function (response) {
                return response.json();
            })
            .then(function (message) {

                console.log('add in quarter :', message);

                // dispatch({
                //     type: types.DELETE_EMPLOYEE
                // });


            }).catch((error) => console.log(error))
    }


}