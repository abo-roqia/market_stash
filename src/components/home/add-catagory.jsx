import React, { useContext, useState } from "react";
import { context, ADD_CAT, ADD_PROD, UPDATE_CAT } from "context";
import Image from "react-file-base64";
import { DefaultImg } from "assets/images";
import { Alert } from "layout";
import "./sass/catagory.scss";

export function AddCatagory() {
	const { state, dispatch } = useContext(context);
	const [img, setImg] = useState(DefaultImg);
	const [kindsCount, setKindsCount] = useState([]);
	const [process, setProcess] = useState("brand");
	const [alert, setAlert] = useState({ msg: "", state: "pending" });

	const closeWidget = () => document.querySelector(".add-catagory-widget").classList.add("hide-scale");
	const showAlert = (state, msg) => {
		setAlert((prev) => (prev = { msg, state }));
		setTimeout(() => setAlert((prev) => (prev = { msg: "", state: "pending" })), 3000);
	};

	const addNewKind = () => setKindsCount((prev) => [...prev, ""]);

	const postOne = async () => {
		let fields = document.querySelectorAll(".add-catagory-widget #input");
		let { catagories } = await state;

		// Check If The User Enter The Product Name OR Not
		if (!fields[0].value) return showAlert("error", "يجب ادخال اسم القسم المراد اضافتة/تغييرة");

		// Check That User Enter Atleast One Kind
		let checker = Array.from(fields)
			.slice(1)
			.every((input) => !input.value);
		if (checker) return showAlert("error", "يجب ادخال احد الانوع علي الاقل");

		// Get User Kinds
		let values = Array.from(fields)
			.slice(1)
			.map((input) => input.value.trim())
			.filter((ele) => ele);

		// Get The Current Catagory From The Database
		let catagory = catagories.find((catagory) => catagory.type === fields[0].value.trim());

		// Add New Brand
		if (process === "brand") {
			if (catagory) return showAlert("error", "هذا القسم موجود بالفعل");
			await dispatch(ADD_CAT({ body: { type: fields[0].value.trim(), branches: Array.from(values), img }, showAlert, closeWidget }));
			await dispatch(ADD_PROD({ body: { type: fields[0].value.trim() }, showAlert, closeWidget }));
		}

		// Add New Kinds
		if (process === "kind") {
			if (!catagory) return showAlert("error", "هذا القسم غير موجود");
			let filterValues = new Set([...values, ...catagory.branches]);
			await dispatch(UPDATE_CAT({ body: { catagory, updated: { branches: Array.from(filterValues) } }, showAlert, closeWidget }));
		}
	};

	return (
		<div className="add-catagory-widget catagory hide-scale">
			<i className="far fa-times-circle close-icon" onClick={closeWidget}></i>
			<h3 className="product-title gradient-text">{process === "brand" ? "اضافه قسم" : "اضافه نوع"}</h3>

			<div className="toggle-btns">
				<button className={`mybtn ${process === "brand" && "active"}`} onClick={() => setProcess("brand")}>
					اضافه قسم
				</button>
				<button className={`mybtn ${process === "kind" && "active"}`} onClick={() => setProcess("kind")}>
					اضافه نوع
				</button>
			</div>

			{process === "brand" && (
				<div className="brand-img">
					<img src={img} alt="brand-img" />
					<Image type="file" onDone={({ base64 }) => setImg(base64)} />
				</div>
			)}

			<Alert alert={alert} />

			<div className="kind-row">
				<input type="text" id="input" name="product" placeholder="اسم القسم" />
				<button className="btn mybtn" onClick={addNewKind}>
					+
				</button>
			</div>

			<input type="text" id="input" name="branch" placeholder="النوع 1" />
			{kindsCount.map((_, i) => (
				<input type="text" id="input" name="branch" placeholder={`النوع ${i + 2}`} key={i} />
			))}

			<button className="mybtn" type="button" onClick={postOne}>
				اضافه
			</button>
		</div>
	);
}
