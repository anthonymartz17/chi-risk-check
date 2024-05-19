import React from "react";
import classes from "./Layout.module.css";
import { Link } from "react-router-dom";
import chiRiskCheckLogo from "../../assets/images/chi-risk-check.svg";

const links = [
	{ path: "/", name: "Home", isActive: true },
	{ path: "/results", name: "Advanced Search", isActive: false },
	{ path: "/about", name: "About", isActive: false },
];

export default function Header() {
	return (
		<header>
			<div className={classes.header}>
				<div className={classes.header_logo}>
					<img src={chiRiskCheckLogo} alt="chi risk check website logo" />
				</div>
				<div className={classes.header_nav_container}>
					<ul className={classes.header_nav}>
						{links.map((ele, idx) => (
							<li className={classes.header_item} key={idx}>
								<Link to={ele.path} className={classes.header_nav_item_link}>{ele.name}</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</header>
	);
}
