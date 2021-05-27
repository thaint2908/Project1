import axios from "../../axios-server";
import {fetchFailed, fetchStart} from "./fetchStatus";
import * as actionTypes from "./actionTypes";

export const displayProduct = (data) => {
	return {
		type: actionTypes.DISPLAY_PRODUCT,
		product: data.product,
		reviews: data.reviews,
		stars: data.stars
	}
}

export const getProduct = (id) => {
	return dispatch => {
		dispatch(fetchStart());
		axios.get(`/products/${id}`)
			.then(response => {
				dispatch(displayProduct(response.data));
			})
			.catch(err => {
				dispatch(fetchFailed(err.response.status));
			});
	}
};
