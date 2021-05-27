import axios from "axios";

export const url = "http://localhost:8080/api/v1";

const instance = axios.create({
	baseURL: url
});

export default instance;
