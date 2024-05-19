import React from "react";
import classes from "../Results.module.css";
export default function LikelyHoodChart() {
	return (
		<div>
			<h2>87%</h2>
			<p>Most likely crimes</p>
			<div className={classes.likelyhood_crimes}>
				<p>Theft</p>
				<p>30%</p>
			</div>
			<div className={classes.likelyhood_crimes}>
				<p>Battery</p>
				<p>20%</p>
			</div>
			<div className={classes.likelyhood_crimes}>
				<p>Homicide</p>
				<p>10%</p>
			</div>
		</div>
	);
}
