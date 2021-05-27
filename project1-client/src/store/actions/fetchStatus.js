import * as actionTypes from "./actionTypes";

export const fetchStart = () => {
	return {
		type: actionTypes.FETCH_START
	};
};

export const fetchFailed = (status) => {
	return {
		type: actionTypes.FETCH_FAILED,
		status: status
	};
};