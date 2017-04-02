import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_STORAGE
} from '../constants/User'

const initialState = {
    login: null,
    isAuthenticated: false
};
// const initialState = JSON.parse(window.localStorage.getItem('rr_user')) || {}

export default function userstate(state = initialState, action) {

  switch (action.type) {

    case LOGIN_REQUEST:
      return state;

    case LOGIN_SUCCESS:
      return {...state, login: action.payload.login, isAuthenticated: action.payload.isAuthenticated};

    case LOGIN_FAIL:
      return state;

    case LOGOUT_SUCCESS:
      return state;

      case LOGIN_STORAGE:
      return {...state, login: action.payload.login, isAuthenticated: true};

    default:
      return state
    }
}
