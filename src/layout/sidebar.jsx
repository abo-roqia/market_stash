import React, { useState } from "react";
import { Avatar } from "assets/images";
import "./sass/sidebar.scss";

export function Sidebar() {
	const [themes] = useState(["red", "blue", "purple", "yellow", "green", "silver", "darkBlue"]);

	const closeSidebar = () => document.querySelector(".sidebar").classList.add("hide-left-clip");

	const themesDropdown = (event) => {
		let title = event.target.closest(".nested-title");
		let sibling = title.nextElementSibling;
		sibling.classList.toggle("hide-height");

		if (sibling.classList.contains("hide-height")) title.querySelector("i").style.transform = "rotate(-90deg)";
		else title.querySelector("i").style.transform = "rotate(0deg)";
	};
	const toggleTheme = (event) => {
		localStorage.setItem("theme", `light-${event.target.dataset.theme}-theme`);
		document.body.setAttribute("data-theme", `light-${event.target.dataset.theme}-theme`);
		closeSidebar();
	};

	return (
		<div className="sidebar hide-left-clip">
			<div className="sidebar-section">
				<h3 className="sidebar-title">
					<div className="screen-size">
						<small className="gradient-text">Screen Width: {window.innerWidth}px</small>
						<small className="gradient-text">Screen Height: {window.innerHeight}px</small>
					</div>
					<div className="avatar">
						<img className="img" src={Avatar} alt="avatar" />
						<h3 className="owner">Amr Elsayed</h3>
					</div>
					<i className="far fa-times-circle sidebar-icon" onClick={closeSidebar}></i>
				</h3>

				<div className="sidebar-theme">
					<h3 className="nested-title" onClick={themesDropdown}>
						اختيار <span>المود :</span>
						<i className="fa fa-chevron-down sidebar-title-icon"></i>
					</h3>
					<div className="sidebar-themes-list">
						{themes.map((theme, i) => (
							<p className={`theme-btn light-${theme}-theme`} key={i} data-theme={theme} onClick={toggleTheme}>
								{`light ${theme} theme`}
							</p>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
