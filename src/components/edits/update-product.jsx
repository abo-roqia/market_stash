import React, { useContext, useState } from "react";
import { context, UPDATE_PROD } from "context";
import { Alert } from "layout";

export function UpdateProduct({ product, kind }) {
	const { dispatch } = useContext(context);
	const [alert, setAlert] = useState({ msg: "", state: "pending" });

	const closeWidget = () => document.querySelector(".update-product-widget").classList.add("hide-scale");
	const showAlert = (state, msg) => {
		setAlert((prev) => (prev = { msg, state }));
		setTimeout(() => setAlert((prev) => (prev = { msg: "", state: "pending" })), 3000);
	};

	const updateOne = async () => {
		let newCost = document.querySelector(".update-product-widget .new-cost").value;

		if (!product) return showAlert("error", "حدث خطأ");
		if (!product.branches[kind]?.currentCost) return showAlert("error", "لا يوجد اي منتجات حالياً");

		product.branches[kind].currentCost = +newCost;
		await dispatch(UPDATE_PROD({ body: { product }, showAlert, closeWidget }));
	};

	return (
		<div className="update-product-widget widget hide-scale">
			<i className="far fa-times-circle close-icon" onClick={closeWidget}></i>
			<h3 className="product-title gradient-text">
				{product.type} {kind}
			</h3>

			<Alert alert={alert} />

			<h3 className="product-title">
				السعر الحالي: <span className="product-cost">{product.branches[kind]?.currentCost.toLocaleString() || 0}</span>
			</h3>
			<div>
				<input className="new-cost" type="number" placeholder="سعر المنتج الجديد" />
				<button className="mybtn" onClick={updateOne}>
					تعديل
				</button>
			</div>
		</div>
	);
}
