/*eslint-disable*/
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_STORAGE
} from '../constants/User'

// import {
//     PRELOADER_ON
// } from '../constants/System'

export function login(login, pw) {

    return (dispatch) => {

        dispatch({
            type: LOGIN_REQUEST
        })

        setTimeout(() => {
            if(login === "admin" && pw === "admin") {
                localStorage.setItem("login", login);
                localStorage.setItem("access", true);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        login: login,
                        isAuthenticated: true
                    }
                })
            }

        },1000)
    }
}

export function logInStorage(login) {

    return (dispatch) => {

        dispatch({
            type: LOGIN_STORAGE,
            payload: {
                login: login
            }
        })

    }
}

export function logout() {
    return {
        type: LOGOUT_SUCCESS
    }
}

