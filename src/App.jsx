import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { context, ContextProvider, GET_CATS, GET_PRODS } from "context";
import { Authanticator, HomePage, EditPage, ProductsTable } from "widgets";
import { _404, Loading } from "layout";
import "assets/scss/_index.scss";
import "assets/fonts/fontAwasome.css";

function App() {
	const { state, dispatch, loading, setLoading } = useContext(context);
	const username = window.localStorage.getItem("user");

	useEffect(() => {
		if (username !== import.meta.env.VITE_REACT_USERNAME) return;
		(async function () {
			let { catagories } = await state;
			setLoading({ msg: "يتم تحميل البيانات", state: "pending" });
			await dispatch(GET_CATS({ setLoading }));
			await dispatch(GET_PRODS({ setLoading }));
			if (catagories.length > 1) return setLoading({ msg: "", state: "success" });
		})();
	}, [state?.catagories]);

	return (
		<BrowserRouter>
			{username === import.meta.env.VITE_REACT_USERNAME ? (
				loading.state === "success" ? (
					<Routes>
						<Route path="/*" element={<_404 />} />
						<Route path="/" element={<HomePage />} />
						<Route path="/table" element={<ProductsTable />} />
						<Route path="/edit" element={<EditPage />} />
					</Routes>
				) : loading.state === "pending" ? (
					<Loading loading={loading} />
				) : (
					loading.state === "error" && <Loading icon="frown" loading={loading} />
				)
			) : (
				<Authanticator />
			)}
		</BrowserRouter>
	);
}

export default function ContextApp() {
	document.body.setAttribute("data-theme", localStorage.getItem("theme"));
	return (
		<ContextProvider>
			<App />
		</ContextProvider>
	);
}
