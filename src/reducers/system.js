import {
    PRELOADER_ON,
    PRELOADER_OFF
} from '../constants/System'

const initialState = {
    isPreloader: false
};

export default function systemstate(state = initialState, action) {

    switch (action.type) {

        case PRELOADER_ON:
            return {...state, isPreloader: true}

        case PRELOADER_OFF:
            return {...state, isPreloader: false}

        default:
            return state
    }
}
