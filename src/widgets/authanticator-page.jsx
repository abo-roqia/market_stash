import React, { useState } from "react";
import { Alert } from "layout";
import { authentication } from "constants/";
import "./sass/authanticator.scss";

export function Authanticator() {
	const [alert, setAlert] = useState({ msg: "", state: "pending" });

	const showAlert = (state, msg) => {
		setAlert((prev) => (prev = { msg, state }));
		setTimeout(() => setAlert((prev) => (prev = { msg: "", state: "pending" })), 2000);
	};

	const checkValidity = () => {
		let userField = document.querySelector(".auth-page #username").value.trim();
		let passField = document.querySelector(".auth-page #password").value.trim();
		const { USERNAME, PASSWORD } = authentication;

		if (USERNAME !== userField) return showAlert("error", "اسم المستخدم غير صحيح");
		if (PASSWORD !== passField) return showAlert("error", "كلمه المرور غير صحيحه");

		showAlert("success", "😎 مرحباً بك عمر السيد ❤️");
		setTimeout(() => {
			localStorage.setItem("user", USERNAME);
			window.location.reload();
		}, 3000);
	};

	return (
		<div className="auth-page">
			<Alert alert={alert} />
			<label htmlFor="username">اسم المستخدم : </label>
			<input type="text" id="username" name="username" placeholder="اسم المستخدم" />
			<label htmlFor="password">كلمة المرور :</label>
			<input type="text" id="password" name="password" placeholder="كلمه المرور" />
			<button className="login mybtn" onClick={checkValidity}>
				تسجيل الدخول
			</button>
		</div>
	);
}
