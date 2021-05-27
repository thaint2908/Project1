import axios from "../../axios-server";
import {fetchStart, fetchFailed} from "./fetchStatus";
import * as actionTypes from "./actionTypes";

export const displayProducts = (data) => {
	return {
		type: actionTypes.DISPLAY_PRODUCTS,
		products: data.products,
		totalDocs: data.totalDocs,
		suggestProducts: data.highRatingProducts,
		categories: data.searchCategories
	};
};

export const getProducts = (config) => {
	return dispatch => {
		dispatch(fetchStart());
		axios.get("/products", config)
			.then(response => {
				dispatch(displayProducts(response.data));
			})
			.catch(err => {
				dispatch(fetchFailed(err.response.status));
			})
	};
};
