import Cookies from 'js-cookie';

import * as types from './actionTypes';
import axios from '../../axios-server';
import {fetchFailed} from './fetchStatus';

export const deleteProdFromCart = (data) => {
    return {
        type: types.DELETE_FROM_CART,
        payload: data
    };
};

export const deleteFromCart = (prodId) => {
    const token = Cookies.get('token');
    
    return dispatch => {
        axios.delete(`/carts/mine/${prodId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                dispatch(deleteProdFromCart(response.data));
            })
            .catch(err => {
                dispatch(fetchFailed(err));
            });
    };
};
