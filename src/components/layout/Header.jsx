import React from "react";
import classes from "./Layout.module.css";
import { NavLink } from "react-router-dom";
import chiRiskCheckLogo from "../../assets/images/chi-risk-check.svg";

const links = [
	{ path: "/", name: "Home", isActive: true },
	// { path: "/results", name: "Advanced Search", isActive: false },
	{ path: "/about", name: "About", isActive: false },
];

export default function Header() {
	function setActiveStyles({ isActive }) {
		return {
			color: isActive ? "#ff6500" : "white",
			fontWeight: isActive ? "bold" : "normal",
		};
	}

	return (
		<header>
			<div className={classes.header}>
				<div className={classes.header_logo}>
					<NavLink to="/">
						<img src={chiRiskCheckLogo} alt="chi risk check website logo" />
					</NavLink>
				</div>
				<div className={classes.header_nav_container}>
					<ul className={classes.header_nav}>
						{links.map((ele, idx) => (
							<li className={classes.header_item} key={idx}>
								<NavLink
									to={ele.path}
									className={classes.header_nav_item_link}
									style={setActiveStyles}
								>
									{ele.name}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			</div>
		</header>
	);
}
