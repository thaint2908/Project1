import Cookies from 'js-cookie';

import * as types from './actionTypes';
import axios from '../../axios-server';
import {fetchFailed, fetchStart} from './fetchStatus';

export const getProdsCart = (data) => {
    return {
        type: types.GET_CART,
        payload: data
    };
};

export const getCart = () => {
    const token = Cookies.get('token');
    
    return dispatch => {
        axios.get('/carts/mine', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                dispatch(fetchStart());
                dispatch(getProdsCart(response.data));
            })
            .catch(err => {
                dispatch(fetchFailed(err));
            });
    };
};
