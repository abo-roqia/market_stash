import React, { useContext, useState } from "react";
import { context, UPDATE_PROD } from "context";
import { Alert } from "layout";

export function DeleteProduct({ product, kind }) {
	const { dispatch } = useContext(context);
	const [alert, setAlert] = useState({ msg: "", state: "pending" });

	const closeWidget = () => document.querySelector(".delete-product-widget").classList.add("hide-scale");
	const showAlert = (state, msg) => {
		setAlert((prev) => (prev = { msg, state }));
		setTimeout(() => setAlert((prev) => (prev = { msg: "", state: "pending" })), 3000);
	};

	const deleteOne = () => {
		let field = document.querySelector(".delete-product-widget .deleted-count").value;
		let countEl = document.querySelector(".delete-product-widget .product-count");

		let target = product?.branches[kind];
		if (!product || !target) return showAlert("error", `حدث خطأ`);
		if (+field > target.tquantity) return showAlert("warning", `لا يتوفر هذا العدد في المخزن`);
		if (!+field) return showAlert("warning", "يجب ادخال العدد المراد حذفه");

		target.tquantity -= +field;
		countEl.textContent = target.tquantity;
		dispatch(UPDATE_PROD({ body: { product }, showAlert, closeWidget }));
	};

	return (
		<div className="delete-product-widget widget hide-scale">
			<i className="far fa-times-circle close-icon" onClick={closeWidget}></i>
			<h3 className="product-title gradient-text">
				{product.type} {kind}
			</h3>

			<Alert alert={alert} />

			<h3 className="product-title">
				العدد الحالي: <span className="product-count">{product.branches[kind]?.tquantity.toLocaleString() || 0}</span>
			</h3>

			<div>
				<input className="deleted-count" type="number" placeholder="العدد المراد حذفه" />
				<button className="mybtn" onClick={deleteOne}>
					حذف
				</button>
			</div>
		</div>
	);
}
