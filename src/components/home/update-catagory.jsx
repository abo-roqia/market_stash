import React, { Fragment, useContext, useState } from "react";
import { context, UPDATE_CAT, UPDATE_PROD } from "context";
import Image from "react-file-base64";
import { DefaultImg } from "assets/images";
import { Alert } from "layout";
import "./sass/catagory.scss";

export function UpdateCatagory() {
	const { state, dispatch } = useContext(context);
	const [process, setProcess] = useState("brand");
	const [img, setImg] = useState(DefaultImg);
	const [alert, setAlert] = useState({ msg: "", state: "pending" });

	const closeWidget = () => document.querySelector(".update-catagory-widget").classList.add("hide-scale");
	const showAlert = (state, msg) => {
		setAlert((prev) => (prev = { msg, state }));
		setTimeout(() => setAlert((prev) => (prev = { msg: "", state: "pending" })), 2000);
	};

	const updateOne = async () => {
		let brand = document.querySelector(".update-catagory-widget input[name='product']")?.value?.trim();
		let oldKind = document.querySelector(".update-catagory-widget input[name='kind']")?.value?.trim();
		let newKind = document.querySelector(".update-catagory-widget input[name='new']")?.value?.trim();
		let { catagories, products } = await state;

		if (!brand) return showAlert("error", "يجب ادخال اسم القسم");

		let catagory = catagories.find((catagory) => catagory.type === brand);
		if (!catagory) return showAlert("error", "هذا القسم غير صحيح");

		let product = products.find((prod) => prod.type === brand);
		if (!product) return showAlert("error", "حدث خطأ في قاعدة البيانات");

		if (process === "brand") {
			if (!newKind) return showAlert("error", "يجب ادخال اسم القسم الجديد");

			let confirm = window.confirm("هل انت متأكد من تغيير اسم القسم؟");
			if (!confirm) return;

			await dispatch(UPDATE_CAT({ body: { catagory, updated: { type: newKind } }, showAlert, closeWidget }));
			await dispatch(UPDATE_PROD({ body: { product, newType: newKind }, showAlert, closeWidget }));
		}

		if (process === "kind") {
			if (!oldKind) return showAlert("error", "يجب ادخال اسم القسم القديم");

			if (!newKind) return showAlert("error", "يجب ادخال اسم القسم الجديد");

			let confirm = window.confirm("هل انت متاكد من تعديل اسم النوع؟");
			if (!confirm) return;

			let index = catagory.branches.findIndex((item) => item === oldKind);
			if (index === -1) return showAlert("error", "اسم النوع القديم غير صحيح");

			catagory.branches[index] = newKind;

			await dispatch(UPDATE_CAT({ body: { catagory, updated: { branches: catagory.branches } }, showAlert, closeWidget }));

			let target = product.branches;
			if (!target[oldKind]) return;

			await dispatch(UPDATE_PROD({ body: { product, newKind }, showAlert, closeWidget }));
		}

		if (process === "img") {
			if (!catagory) return showAlert("error", "هذا القسم غير موجود");
			await dispatch(UPDATE_CAT({ body: { catagory, updated: { img } }, showAlert, closeWidget }));
		}
	};

	return (
		<div className="update-catagory-widget catagory hide-scale">
			<i className="far fa-times-circle close-icon" onClick={closeWidget}></i>
			<h3 className="product-title gradient-text">
				تعديل {process === "brand" ? "اسم القسم" : process === "kind" ? "اسم النوع" : process === "img" && "الصورة"}
			</h3>
			<div className="toggle-btns">
				<button className={`mybtn ${process === "brand" && "active"}`} onClick={() => setProcess("brand")}>
					تعديل قسم
				</button>
				<button className={`mybtn ${process === "kind" && "active"}`} onClick={() => setProcess("kind")}>
					تعديل نوع
				</button>
				<button className={`mybtn ${process === "img" && "active"}`} onClick={() => setProcess("img")}>
					تعديل الصورة
				</button>
			</div>

			{process === "img" && (
				<div className="brand-img">
					<img src={img} alt="brand-img" />
					<Image type="file" onDone={({ base64 }) => setImg(base64)} />
				</div>
			)}

			<Alert alert={alert} />
			<input type="text" name="product" placeholder="أسم القسم" />

			{process === "brand" && <input type="text" name="new" placeholder="اسم القسم الجديد" />}

			{process === "kind" && (
				<Fragment>
					<input type="text" name="kind" placeholder="النوع المراد تغييره" />
					<input type="text" name="new" placeholder="اسم النوع الجديد" />
				</Fragment>
			)}

			<button className="update-catagory-btn mybtn" type="button" onClick={updateOne}>
				تعديل
			</button>
		</div>
	);
}
