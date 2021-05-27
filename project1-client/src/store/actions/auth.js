import axios from '../../axios-server';
import * as types from './actionTypes';
import {fetchFailed} from './fetchStatus';

export const login = (data) => {
    return {
        type: types.LOGIN,
        data
    };
};

export const signUp = (data) => {
    return {
        type: types.SIGN_UP,
        data
    };
};

export const logout = () => {
    return {
        type: types.LOGOUT
    };
};

export const loginAuth = (loginDto) => {
    const params = new URLSearchParams();
    params.append('email', loginDto.email);
    params.append('password', loginDto.password);
    
    return dispatch => {
        axios.post('/login', params)
            .then(response => {
                dispatch(login(response.data));
            })
            .catch(err => {
                dispatch(fetchFailed(err));
            });
    };
};

export const signUpAuth = (signUpDto) => {
    const params = new URLSearchParams();
    params.append('username', signUpDto.username);
    params.append('email', signUpDto.email);
    params.append('password', signUpDto.password);
    
    return dispatch => {
        axios.post('/sign-up', params)
            .then(response => {
                dispatch(signUp(response.data));
            })
            .catch(err => {
                dispatch(fetchFailed(err));
            });
    };
};

export const logoutAuth = () => {
    return dispatch => {
        dispatch(logout());
    };
};
