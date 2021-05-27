import Cookies from 'js-cookie';

import * as types from './actionTypes';
import axios from '../../axios-server';
import {fetchFailed, fetchStart} from './fetchStatus';

export const createNewOrder = (data) => {
    return {
        type: types.CREATE_ORDER,
        payload: data
    };
};

export const createOrder = (createOrderDto) => {
    const token = Cookies.get('token');
    const params = new URLSearchParams();
    params.append('cartId', createOrderDto.cartId);
    params.append('orderedDate', createOrderDto.orderedDate);
    
    return dispatch => {
        axios.post('/orders', params, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                dispatch(fetchStart());
                dispatch(createNewOrder(response.data));
            })
            .catch(err => {
                dispatch(fetchFailed(err));
            });
    };
};
