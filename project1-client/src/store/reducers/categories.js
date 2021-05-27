import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../utils/utilities";

const initialState = {
	error: false,
	allCategories: []
}

const displayCategories = (state, action) => {
	return updateObject(state, {
		allCategories: action.allCategories
	});
};

const fetchFailed = (state, action) => {
	return updateObject(state, {
		error: true
	});
};

const getAllCategories = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.DISPLAY_CATEGORIES:
			return displayCategories(state, action);
		case actionTypes.FETCH_FAILED:
			return fetchFailed(state, action);
		default:
			return state;
	}
};

export default getAllCategories;
