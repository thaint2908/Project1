import * as types from '../actions/actionTypes';
import {updateObject} from '../../utils/utilities';

const initialState = {
    error: false,
    cart: {}
};

const addProductToCart = (state, action) => {
    return updateObject(state, {
        cart: action.payload,
        error: false
    });
};

const getCartSuccess = (state, action) => {
    return updateObject(state, {
        cart: action.payload,
        error: false
    });
};

const deleteProductFromCart = (state, action) => {
    return updateObject(state, {
        cart: action.payload,
        error: false
    });
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TO_CART:
            return addProductToCart(state, action);
        case types.GET_CART:
            return getCartSuccess(state, action);
        case types.DELETE_FROM_CART:
            return deleteProductFromCart(state, action);
        default:
            return state;
    }
};

export default cart;
