import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { context } from "context";
import { DefaultImg } from "assets/images";
import "./sass/show-catagories.scss";

export function ShowCatagories() {
	const { state } = useContext(context);
	const [catagories, setCatagories] = useState([]);
	const navigate = useNavigate();

	const openEditPage = (brand) => navigate("/edit", { state: { brand } });

	useEffect(() => {
		state.then((res) => setCatagories((prev) => (prev = res.catagories)));
	}, [state]);

	return (
		<div className="catagory-list">
			{catagories.map(({ type, img }, i) => (
				<div className="product" key={i}>
					<div className="product-img">
						<img src={img || DefaultImg} alt={type} />
					</div>
					<h3 className="product-title gradient-text">{type}</h3>
					<div className="product-kinds">
						<button className="mybtn kind" onClick={() => openEditPage(type)}>
							عرض التفاصيل
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
