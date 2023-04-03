import React from "react";
import "./sass/alert.scss";

export function Alert({ alert: { msg, state } }) {
	return <div className={`warn-msg ${state}`}>{state !== "pending" && msg}</div>;
}
