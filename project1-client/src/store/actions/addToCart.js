import Cookies from 'js-cookie';

import axios from '../../axios-server';
import * as types from './actionTypes';
import {fetchFailed} from './fetchStatus';

export const addProdToCart = (data) => {
    return {
        type: types.ADD_TO_CART,
        payload: data
    };
};

export const addToCart = (addToCartDto) => {
    const token = Cookies.get('token');
    
    return dispatch => {
        axios.post('/carts', addToCartDto, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                dispatch(addProdToCart(response.data));
            })
            .catch(err => {
                dispatch(fetchFailed(err));
            });
    };
};
