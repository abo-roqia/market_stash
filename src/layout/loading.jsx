import React from "react";
import { Logo } from "assets/images";
import "./sass/loading.scss";

export function Loading({ icon = "smile-wink", loading: { state, msg } }) {
	return (
		<div className={`loading ${state}`}>
			{state === "pending" ? <img className="loader" src={Logo} alt="loader" /> : <i className={`far fa-${icon} icon`}></i>}
			<h1 className="msg">{msg}</h1>
		</div>
	);
}
