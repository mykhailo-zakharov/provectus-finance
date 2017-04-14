import {getQuarterController, addQuarterController} from '../api/financeData'

export const types = {
    GET_FINANCE_DATA: "GET_FINANCE_DATA",
    SAVE_FINANCE_DATA: "SAVE_FINANCE_DATA",
    SET_ACTIVE_EMPLOYEE: "SET_ACTIVE_EMPLOYEE",
    ADD_QUATER: "ADD_QUATER",
}

export const initialState = {

}

export default (state = initialState, action) => {
    switch (action.type) {

        case types.GET_FINANCE_DATA:
            return {...state};

        case types.SAVE_FINANCE_DATA:
            return {...state, list: action.data};

        case types.ADD_QUATER:
            let newList = [...state.list];
            newList.push(action.data);
            return {...state, list: newList};

        default:
            return state
    }
}

//
export const actions = {

    getQuarter:(id) => (dispatch, getState) => {
        console.log("id "+id);
        dispatch({
            type: types.GET_FINANCE_DATA
        });

        getQuarterController(id)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                // console.log(data);

                dispatch({
                    type: types.SAVE_FINANCE_DATA,
                    data: data
                });

            }).catch((error) => console.log(error));

    },

    addQuarter:(year, numb, id) => (dispatch) => {

        addQuarterController(year, numb, id)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                dispatch({
                    type: types.ADD_QUATER,
                    data: data
                });

            }).catch((error) => console.log(error))
    }


}