import React, { useContext, useState } from "react";
import { context, DELETE_CAT, DELETE_PROD, UPDATE_CAT, UPDATE_PROD } from "context";
import { Alert } from "layout";
import "./sass/catagory.scss";

export function DeleteCatagory() {
	const { state, dispatch } = useContext(context);
	const [process, setProcess] = useState("brand");
	const [alert, setAlert] = useState({ msg: "", state: "pending" });

	const closeWidget = () => document.querySelector(".delete-catagory-widget").classList.add("hide-scale");
	const showAlert = (state, msg) => {
		setAlert((prev) => (prev = { msg, state }));
		setTimeout(() => setAlert((prev) => (prev = { msg: "", state: "pending" })), 2000);
	};

	const deleteOne = async () => {
		let brand = document.querySelector(".delete-catagory-widget input[name='product']").value.trim();
		let kind = document.querySelector(".delete-catagory-widget input[name='branch']")?.value?.trim();
		let { catagories, products } = await state;

		if (!brand) return showAlert("error", "يجب ادخال اسم القسم المراد حذفة");

		let catagory = catagories.find((catagory) => catagory.type === brand);
		if (!catagory) return showAlert("error", "هذا القسم غير موجود");

		let product = products.find((prod) => prod.type === brand);
		if (!product) return showAlert("error", "حدث خطأ في قاعدة البيانات");

		if (process === "brand") {
			let confirm = window.confirm("هل انت متأكد من حذف هذا القسم؟");
			if (!confirm) return;

			await dispatch(DELETE_CAT({ body: { catagory }, showAlert, closeWidget }));
			await dispatch(DELETE_PROD({ body: { product }, showAlert, closeWidget }));
		}

		if (process === "kind") {
			if (!kind) return showAlert("error", "يجب ادخال اسم النوع المراد حذفة");

			let confirm = window.confirm("هل انت متأكد من حذف هذا النوع ؟");
			if (!confirm) return;

			let checker = catagory.branches.filter((catKind) => catKind === kind)[0];
			if (!checker) return showAlert("error", "هذا النوع غير صحيح");

			let branches = catagory.branches.filter((catKind) => catKind !== kind);

			await dispatch(UPDATE_CAT({ body: { catagory, updated: { branches } }, showAlert, closeWidget }));

			if (!product.branches) return;

			await dispatch(UPDATE_PROD({ body: { product, oldKind: kind }, showAlert, closeWidget }));
		}
	};

	return (
		<div className="delete-catagory-widget catagory hide-scale">
			<i className="far fa-times-circle close-icon" onClick={closeWidget}></i>
			<h3 className="product-title gradient-text">{process === "brand" ? "حذف قسم" : "حذف نوع"}</h3>
			<div className="toggle-btns">
				<button className={`mybtn ${process === "brand" && "active"}`} onClick={() => setProcess("brand")}>
					حذف قسم
				</button>
				<button className={`mybtn ${process === "kind" && "active"}`} onClick={() => setProcess("kind")}>
					حذف نوع
				</button>
			</div>
			<Alert alert={alert} />
			<input type="text" name="product" placeholder="أسم القسم" />
			{process === "kind" && <input type="text" name="branch" placeholder="أسم النوع المراد حذفه" />}
			<button className="delete-catagory-btn mybtn" type="button" onClick={deleteOne}>
				حذف
			</button>
		</div>
	);
}
