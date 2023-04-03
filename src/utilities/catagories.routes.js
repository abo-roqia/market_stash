import axios from "axios";
import { CATAGORIES } from "constants/";

let router = axios.create({ baseURL: CATAGORIES.REMOTE });

export const GET_CATAGORIES = async () => {
	try {
		return await router.get("/");
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const ADD_CATAGORY = async (body) => {
	try {
		return await router.post("/", body);
	} catch (err) {
		console.log(err);
	}
};

export const UPDATE_CATAGORY = async (id, body) => {
	try {
		return await router.put("/" + id, body);
	} catch (err) {
		console.log(err);
	}
};

export const DELETE_CATAGORY = async (id) => {
	try {
		return await router.delete("/" + id);
	} catch (err) {
		console.log(err);
	}
};
