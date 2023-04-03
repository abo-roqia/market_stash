import React from "react";

export function TableHead() {
	return (
		<thead className="table-head">
			<tr>
				<td className="table-title gradient-text" colSpan="6">
					عرض كل الاقسام
				</td>
			</tr>
			<tr className="head-row">
				<td className="col">القسم</td>
				<td className="col">النوع</td>
				<td className="col">العدد</td>
				<td className="col">السعر</td>
				<td className="col">الاجمالي</td>
				<td className="col">المجموع</td>
			</tr>
		</thead>
	);
}
