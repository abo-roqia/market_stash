import React, { Fragment, useContext, useEffect, useState } from "react";
import { context } from "context";
import { colors } from "constants/";
import "./sass/body.scss";

export function TableBody() {
	const { state } = useContext(context);
	let [products, setProducts] = useState([]);

	useEffect(() => {
		state.then((res) => setProducts((prev) => (prev = res.products)));

		let tbodies = document.querySelectorAll("table tbody");

		tbodies.forEach((tbody) => {
			let isAllEmpty = Array.from(tbody.querySelectorAll("tr")).every((tr) => tr.classList.contains("all-empty"));
			if (isAllEmpty) {
				let ele = (ele) => tbody.querySelector(`.${ele}`);
				Boolean(ele("product-name")) && ele("product-name").classList.add("gray");
				Boolean(ele("product-cost")) && ele("product-cost").classList.add("gray");
			}
		});
	});

	const TotalBrand = ({ branches }) => {
		let total = 0;
		for (let kind in branches) {
			if (kind === "default") continue;
			total += Math.round(+branches[kind].currentCost * +branches[kind].tquantity);
		}
		return total.toLocaleString() || 0;
	};

	return (
		<Fragment>
			{products?.map(({ _id, type, branches }, i) => {
				let kinds = Object.keys(branches).sort((a, b) => b !== "default" && a.localeCompare(b));
				let bodyStyle = { background: `linear-gradient(rgb(${colors[i % 13]}), rgb(0,0,0))` };

				return (
					<tbody className="table-body" style={bodyStyle} key={_id}>
						{kinds.map((kind, index) => {
							let { tquantity, currentCost } = branches[kind];
							return (
								kind !== "default" && (
									<tr className={`row ${tquantity === 0 ? "all-empty" : tquantity <= 5 && "nearly-empty"}`} key={index}>
										{index === 1 && (
											<td className="col product-name" rowSpan={kinds.length}>
												{type}
											</td>
										)}
										<td className="col kind">{kind}</td>
										<td className={`col count ${!tquantity && "empty"}`}>{tquantity.toLocaleString() || 0}</td>
										<td className="col cost">{currentCost.toLocaleString() || 0}</td>
										<td className="col total-salary">{Math.round(+currentCost * +tquantity).toLocaleString() || 0}</td>
										{index === 1 && (
											<td className="col product-cost" rowSpan={kinds.length}>
												<TotalBrand branches={branches} />
											</td>
										)}
									</tr>
								)
							);
						})}
					</tbody>
				);
			})}
		</Fragment>
	);
}
