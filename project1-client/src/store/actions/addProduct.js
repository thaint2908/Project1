import Cookies from 'js-cookie';

import axios from '../../axios-server';
import * as types from './actionTypes';
import {fetchFailed, fetchStart} from './fetchStatus';

export const addProduct = (data) => {
    return {
        type: types.ADD_PRODUCT,
        payload: data
    };
};

export const addNewProduct = (createProductDto) => {
    const token = Cookies.get('token');
    
    const formData = new FormData();
    formData.append('name', createProductDto.name);
    formData.append('price', createProductDto.price);
    formData.append('category', createProductDto.category);
    formData.append('summary_description', createProductDto.summary_description);
    formData.append('description', createProductDto.description);
    formData.append('image', createProductDto.image);
    
    return dispatch => {
        axios.post('/products', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                dispatch(fetchStart());
                dispatch(addProduct(response.data));
            })
            .catch(err => {
                dispatch(fetchFailed(err));
            });
    };
};
