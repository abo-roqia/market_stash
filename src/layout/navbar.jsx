import React from "react";
import { useNavigate } from "react-router";
import { Logo } from "assets/images";
import "./sass/navbar.scss";

export function Navbar() {
	const navigate = useNavigate();

	const openSidebar = () => document.querySelector(".sidebar").classList.remove("hide-left-clip");
	const closeDropdown = () => document.querySelector(".dropdown-container").classList.add("hide-scale");
	const openTablePage = () => navigate("/table");
	const openDropdown = ({ target }) => {
		let aria = target.closest("div").getAttribute("aria-label");
		document.querySelector(".dropdown-container").classList.remove("hide-scale");
		aria && document.querySelector(`.${aria}-catagory-widget`).classList.remove("hide-scale");
	};

	return (
		<nav className="navbar">
			<div className="logo">
				<img src={Logo} alt="logo" className="logo-img fa-spin" />
				<h1 className="gradient-text">المخزن الرئيسي</h1>
			</div>

			<div className="nav-togglers">
				<div className="togglers">
					<i className="fas fa-table icon gradient-text" onClick={openTablePage}></i>
					<i className="fas fa-paperclip icon gradient-text" onClick={openDropdown}></i>
					<i className="fas fa-user icon gradient-text" onClick={openSidebar}></i>
				</div>
				<div className="dropdown-container hide-scale" onClick={closeDropdown}>
					<div className="dropdown">
						<div className="item gradient-text" aria-label="add" onClick={openDropdown}>
							<i className="fas fa-plus"></i>
							<h3>اضافه قسم/نوع</h3>
						</div>
						<div className="item gradient-text" aria-label="delete" onClick={openDropdown}>
							<i className="fas fa-trash-alt"></i>
							<h3>حذف قسم/نوع</h3>
						</div>
						<div className="item gradient-text" aria-label="update" onClick={openDropdown}>
							<i className="fas fa-edit"></i>
							<h3>تعديل قسم/نوع</h3>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
