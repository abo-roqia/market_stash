import React, { useContext, useState } from "react";
import { context, UPDATE_PROD } from "context";
import { Alert } from "layout";

export function AddProduct({ product, kind }) {
	const { dispatch } = useContext(context);
	const [alert, setAlert] = useState({ msg: "", state: "pending" });
	const [newProduct, setNewProduct] = useState({ quantity: 0, salary: 0, totalSalary: 0 });

	const closeWidget = () => document.querySelector(".add-product-widget").classList.add("hide-scale");
	const showAlert = (state, msg) => {
		setAlert((prev) => (prev = { msg, state }));
		setTimeout(() => setAlert((prev) => (prev = { msg: "", state: "pending" })), 3000);
	};

	const handle = ({ target: { name, value } }) => {
		setNewProduct((prev) => (prev = { ...prev, [name]: +value }));
		if (name === "salary")
			document.querySelector(`.add-product-widget input[name='totalSalary']`).value = Math.round(+newProduct.quantity * +value);
	};

	const PostOne = () => {
		if (!product) return showAlert("error", "حدث خطأ");

		if (newProduct.quantity === 0 || newProduct.salary === 0) return showAlert("warning", "يجب ادخال عدد/سعر المنتج");

		let target = product.branches[kind];
		if (target) product.branches[kind] = { tquantity: (target.tquantity += newProduct.quantity), currentCost: newProduct.salary };
		else product.branches[kind] = { tquantity: newProduct.quantity, currentCost: newProduct.salary };
		dispatch(UPDATE_PROD({ body: { product }, showAlert, closeWidget }));
	};

	return (
		<div className="add-product-widget widget hide-scale">
			<i className="far fa-times-circle close-icon" onClick={closeWidget}></i>
			<h1 className="product-title gradient-text">
				{product.type} {kind}
			</h1>

			<Alert alert={alert} />

			<input type="number" name="quantity" placeholder="عدد المنتجات" onChange={handle} />
			<input type="number" name="salary" placeholder="سعر القطعه" onChange={handle} disabled={!newProduct.quantity && true} />
			<input type="number" name="totalSalary" placeholder="السعر الكلي" onChange={handle} disabled={!newProduct.salary && true} />
			<button type="button" className="mybtn" onClick={PostOne}>
				اضافه
			</button>
		</div>
	);
}
