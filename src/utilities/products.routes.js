import axios from "axios";
import { PRODUCTS } from "constants/";

let router = axios.create({ baseURL: PRODUCTS.REMOTE });

export const GET_PRODUCTS = async () => {
	try {
		return await router.get("/");
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const ADD_PRODUCT = async (body) => {
	try {
		return await router.post("/", body);
	} catch (err) {
		console.log(err);
	}
};

export const UPDATE_PRODUCT = async (id, body) => {
	try {
		return await router.put("/" + id, body);
	} catch (err) {
		console.log(err);
	}
};

export const DELETE_PRODUCT = async (id) => {
	try {
		return await router.delete("/" + id);
	} catch (err) {
		console.log(err);
	}
};
