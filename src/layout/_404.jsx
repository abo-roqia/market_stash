import React from "react";
import { _404_png } from "assets/images";
import "./sass/404.scss";

export function _404() {
	return (
		<div className="page-not-found">
			<img className="_404" src={_404_png} alt="_404" />
		</div>
	);
}
