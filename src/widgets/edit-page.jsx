import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AddProduct, DeleteProduct, UpdateProduct } from "components";
import { context } from "context";
import "./sass/edit.scss";

export function EditPage() {
	let { state } = useContext(context);
	let { brand } = useLocation().state;
	let [details, setDetails] = useState({ brand, kind: "" });
	let [product, setProduct] = useState({ type: "", branches: {} });
	let [catagory, setCatagory] = useState({});

	useEffect(() => {
		state.then(({ catagories, products }) => {
			let catagory = catagories.find(({ type }) => type === brand);
			let product = products.find(({ type }) => type === brand);
			setProduct(product);
			setCatagory(catagory);
		});
	}, [state]);

	const openAddWidget = (kind) => {
		setDetails((prev) => ({ ...prev, kind }));
		document.querySelector(".add-product-widget").classList.remove("hide-scale");
	};
	const openDeleteWidget = (kind) => {
		setDetails((prev) => ({ ...prev, kind }));
		document.querySelector(".delete-product-widget").classList.remove("hide-scale");
	};
	const openUpdateWidget = (kind) => {
		setDetails((prev) => ({ ...prev, kind }));
		document.querySelector(".update-product-widget").classList.remove("hide-scale");
	};

	return (
		<div className="edit-page">
			<div className="product-title gradient-text">{product && product.type}</div>
			<table>
				<thead>
					<tr className="head">
						<td className="column">التحكم</td>
						<td className="column">النوع</td>
						<td className="column">العدد</td>
						<td className="column">السعر</td>
						<td className="column">الاجمالي</td>
					</tr>
				</thead>
				<tbody>
					{catagory.branches &&
						catagory.branches
							.sort((a, b) => a.localeCompare(b))
							.map((kind, i) => {
								if (kind === "default") return;
								let target = product.branches[kind];
								return (
									<tr className={!target?.tquantity ? "empty" : ""} key={i}>
										<td className="column">
											<i className="fas fa-shopping-bag text-green" onClick={() => openAddWidget(kind)}></i>
											<i className="fas fa-edit text-gold" onClick={() => openUpdateWidget(kind)}></i>
											<i className="fas fa-trash-alt text-crimson" onClick={() => openDeleteWidget(kind)}></i>
										</td>
										<td className="column">{kind}</td>
										<td className="column">{target?.tquantity || 0}</td>
										<td className="column">{target?.currentCost || 0}</td>
										<td className="column">{Math.round(target?.tquantity * target?.currentCost) || 0}</td>
									</tr>
								);
							})}
				</tbody>
			</table>
			{<AddProduct product={product} kind={details?.kind} />}
			{<DeleteProduct product={product} kind={details?.kind} />}
			{<UpdateProduct product={product} kind={details?.kind} />}
		</div>
	);
}

/* 
<div className="show-products">
	<div className="product-title gradient-text">
		{brand} {kind}
	</div>
	<div className="product-title" style={{ fontSize: 22 }}>
		العدد : <span>{details.count.toLocaleString() || 0}</span> <br />
		السعر : <span>{details.cost.toLocaleString() || 0}</span>
	</div>
	<div>
		<button className="mybtn" type="button" onClick={openAddWidget}>
			اضافه صنف
		</button>
		<button className="mybtn" type="button" onClick={openDeleteWidget}>
			حذف صنف
		</button>
		<DeleteProduct />
		<button className="mybtn" type="button" onClick={openUpdateWidget}>
			تعديل السعر
		</button>
		<UpdateProduct />
	</div>
</div>
*/
