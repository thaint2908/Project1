import Cookies from 'js-cookie';

import * as types from '../actions/actionTypes';
import {updateObject} from '../../utils/utilities';

const initialState = {
    error: false,
    payload: null
};

const signUp = (state, action) => {
    return updateObject(state, {
        error: false,
        payload: action.data
    });
};

const login = (state, action) => {
    Cookies.set('token', action.data.accessToken, {
        expires: action.data.expiresIn / (3600000 * 24)
    });
    
    return updateObject(state, {
        error: false,
        payload: action.data
    });
};

const logout = (state, action) => {
    Cookies.remove('token');
    
    return updateObject(state, {
        error: false,
        payload: null
    });
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGN_UP:
            return signUp(state, action);
        case types.LOGIN:
            return login(state, action);
        case types.LOGOUT:
            return logout(state, action);
        default:
            return state;
    }
};

export default auth;
