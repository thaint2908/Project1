import * as types from '../actions/actionTypes';
import {updateObject} from '../../utils/utilities';

const initialState = {
    error: false,
    order: {}
};

const createOrder = (state, action) => {
    return updateObject(state, {
        error: false,
        order: action.payload
    });
};

const fetchFailed = (state, action) => {
    return updateObject(state, {
        error: true
    });
};

const fetchStart = (state, action) => {
    return updateObject(state, {
        error: false
    });
};

const order = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_ORDER:
            return createOrder(state, action);
        case types.FETCH_FAILED:
            return fetchFailed(state, action);
        case types.FETCH_START:
            return fetchStart(state, action);
        default:
            return state;
    }
};

export default order;
