import React from "react";
import { Navbar, Sidebar } from "layout";
import { AddCatagory, DeleteCatagory, UpdateCatagory, ShowCatagories } from "components";
import "./sass/home.scss";

export function HomePage() {
	return (
		<div className="products-catagory">
			<Sidebar />
			<Navbar />

			<div className="functionality">
				<AddCatagory />
				<DeleteCatagory />
				<UpdateCatagory />
			</div>

			<ShowCatagories />
		</div>
	);
}
