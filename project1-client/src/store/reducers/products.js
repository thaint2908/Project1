import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../utils/utilities";

const initialState = {
	products: [],
	suggestProducts: [],
	totalDocs: null,
	categories: {},
	error: false,
	loading: false
};

const displayProducts = (state, action) => {
	return updateObject(state, {
		products: action.products,
		totalDocs: action.totalDocs,
		suggestProducts: action.suggestProducts,
		loading: false,
		categories: action.categories
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
	});
};

const getProducts = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.DISPLAY_PRODUCTS:
			return displayProducts(state, action);
		case actionTypes.FETCH_START:
			return fetchStart(state, action);
		case actionTypes.FETCH_FAILED:
			return fetchFailed(state, action);
		default:
			return state;
	}
};

export default getProducts;