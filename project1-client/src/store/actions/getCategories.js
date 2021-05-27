import axios from "../../axios-server";
import {fetchFailed} from "./fetchStatus";
import * as actionTypes from "./actionTypes";

export const displayCategories = (data) => {
	return {
		type: actionTypes.DISPLAY_CATEGORIES,
		allCategories: data.categories
	}
}

export const getAllCategories = () => {
	return dispatch => {
		axios.get("/categories", {
				headers: {"Cache-Control": "max-age=86400"}
			})
			.then(response => {
				dispatch(displayCategories(response.data));
			})
			.catch(err => {
				dispatch(fetchFailed());
			})
	}
}