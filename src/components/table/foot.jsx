import React, { useCallback, useContext, useEffect, useState } from "react";
import { context } from "context";

export function TableFoot() {
	const { state } = useContext(context);
	const [cost, setCost] = useState(0);

	const totalCost = useCallback(async () => {
		const { products } = await state;
		let total = 0;

		products.forEach((product) => {
			for (let key in product.branches)
				total += Math.round(+product.branches[key].tquantity * +product.branches[key].currentCost) || 0;
		});
		setCost(total || 0);
	}, [state]);

	useEffect(() => {
		totalCost();
	}, [state, totalCost]);

	return (
		<tfoot className="table-foot">
			<tr className="head-row">
				<td className="col" colSpan="6">
					السعر الاجمالي للمخزن
				</td>
			</tr>
			<tr>
				<td className="col" colSpan="6" style={{ background: "linear-gradient(rgb(18, 102, 178), rgb(0, 0, 0))" }}>
					{cost.toLocaleString()}
				</td>
			</tr>
		</tfoot>
	);
}
