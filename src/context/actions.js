import { GET_CATS_VAR, ADD_CAT_VAR, DELETE_CAT_VAR, UPDATE_CAT_VAR } from "constants/";
import { GET_PRODS_VAR, ADD_PROD_VAR, DELETE_PROD_VAR, UPDATE_PROD_VAR } from "constants/";

export const GET_CATS = (payload) => ({ type: GET_CATS_VAR, payload });
export const ADD_CAT = (payload) => ({ type: ADD_CAT_VAR, payload });
export const DELETE_CAT = (payload) => ({ type: DELETE_CAT_VAR, payload });
export const UPDATE_CAT = (payload) => ({ type: UPDATE_CAT_VAR, payload });

export const GET_PRODS = (payload) => ({ type: GET_PRODS_VAR, payload });
export const ADD_PROD = (payload) => ({ type: ADD_PROD_VAR, payload });
export const DELETE_PROD = (payload) => ({ type: DELETE_PROD_VAR, payload });
export const UPDATE_PROD = (payload) => ({ type: UPDATE_PROD_VAR, payload });
