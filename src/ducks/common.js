export const types = {
    IS_TABLE_TOGGLE: "IS_TABLE_TOGGLE",
    IS_TABLE_TRUE: "IS_TABLE_TRUE",
    IS_TABLE_FALSE: "IS_TABLE_FALSE"
}

export const initialState = {
    isTable: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.IS_TABLE_TOGGLE:
            return { ...state, isTable: !state.isTable}

        case types.IS_TABLE_TRUE:
            return { ...state, isTable: true}

        case types.IS_TABLE_FALSE:
            return { ...state, isTable: false}

        default:
            return state
    }
}

export const actions = {
    onTable: () => ({ type: IS_TABLE_TRUE}),
    offTable: () => ({ type: actionTypes.IS_TABLE_FALSE}),
    toggleTable: () => ({ type: types.IS_TABLE_TOGGLE })
}