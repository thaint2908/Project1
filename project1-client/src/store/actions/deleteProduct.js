import Cookies from 'js-cookie';

import * as types from './actionTypes';
import axios from '../../axios-server';
import {fetchFailed, fetchStart} from './fetchStatus';

export const deleteProd = () => {
    return {
        type: types.DELETE_PRODUCT
    };
};

export const deleteProduct = (id) => {
    const token = Cookies.get('token');
    
    return dispatch => {
        axios.delete(`/products/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                dispatch(fetchStart());
                if (response.status === 204) {
                    dispatch(deleteProd());
                }
            })
            .catch(err => {
                dispatch(fetchFailed(err));
            });
    };
};
