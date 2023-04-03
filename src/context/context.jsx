import React, { useState, createContext, useReducer } from "react";
import { INITIAL_STATES } from "constants/";
import Reducer from "context/reducer";

export const context = createContext(INITIAL_STATES);

export const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, INITIAL_STATES);
	const [loading, setLoading] = useState({ msg: "", state: "pending" });

	let values = { state, dispatch, loading, setLoading };
	return <context.Provider value={values}>{children}</context.Provider>;
};
