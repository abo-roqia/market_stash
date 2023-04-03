import React from "react";
import { TableHead, TableBody, TableFoot } from "components";
import "./sass/table.scss";

export function ProductsTable() {
	return (
		<table className="table-page">
			<TableHead />
			<TableBody />
			<TableFoot />
		</table>
	);
}
