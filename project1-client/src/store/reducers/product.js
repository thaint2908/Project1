import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../utils/utilities";

const initialState = {
	product: null,
	loading: false,
	error: false
};

const displayProduct = (state, action) => {
	return updateObject(state, {
		loading: false,
		product: action.product
	});
};

const addProductSuccess = (state, action) => {
	return updateObject(state, {
		loading: false,
		product: action.payload
	});
};

const deleteProductSuccess = (state, action) => {
	return updateObject(state, {
		loading: false,
		error: false
	});
};

const fetchStart = (action, state) => {
	return updateObject(state, {
		loading: true
	});
};

const fetchFailed = (state, action) => {
	return updateObject(state, {
		loading: false,
		error: true
	})
}

const product = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.DISPLAY_PRODUCT:
			return displayProduct(state, action);
		case actionTypes.ADD_PRODUCT:
			return addProductSuccess(state, action);
		case actionTypes.DELETE_PRODUCT:
			return deleteProductSuccess(state, action);
		case actionTypes.FETCH_START:
			return fetchStart(action, state);
		case actionTypes.FETCH_FAILED:
			return fetchFailed(action, state);
		default:
			return state;
	}
};

export default product;
