export const types = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_STORAGE: "LOGIN_STORAGE",
    LOGOUT: "LOGOUT",
    LOGIN_FAIL: "LOGIN_FAIL",
    IS_TABLE_TOGGLE: "IS_TABLE_TOGGLE",
    IS_TABLE_TRUE: "IS_TABLE_TRUE",
    IS_TABLE_FALSE: "IS_TABLE_FALSE"
}

export const initialState = {
    isAuthenticated: false,
    login: "",
    isTable: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case types.LOGIN_REQUEST:
            return state;

        case types.LOGIN_SUCCESS:
            return {...state, login: action.payload.login, isAuthenticated: action.payload.isAuthenticated};

        case types.LOGIN_FAIL:
            return state;

        case types.LOGIN_STORAGE:
            return {...state, login: action.payload.login, isAuthenticated: true};

        case types.LOGOUT:
            return {...state, login: "", isAuthenticated: false};

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
    onTable: () => ({ type: types.IS_TABLE_TRUE}),

    offTable: () => ({ type: types.IS_TABLE_FALSE}),

    toggleTable: () => ({ type: types.IS_TABLE_TOGGLE }),

    login: (login, pw)  => (dispatch, getState) => {
            dispatch({
                type: types.LOGIN_REQUEST
            });
            if(login === "admin" && pw === "admin") {
                localStorage.setItem("login", login);
                localStorage.setItem("access", true);
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: {
                        login: login,
                        isAuthenticated: true
                    }
                })
            }

    },
    logInStorage: (login) => (dispatch, getState) => {
        dispatch({
            type: types.LOGIN_STORAGE,
            payload: {
                login: login
            }
        })
    },
    logout: () => ({ type: types.LOGOUT })

}