import React, { useEffect, useState } from "react";
import classes from "../Results.module.css";
export default function LikelyHoodChart({ crimes }) {
	const [primaryTypes, setPrimaryTypes] = useState([]);

	function generatePrimaryType(crimes) {
		const typeCount = {};

		crimes.forEach((ele) => {
			typeCount[ele.primary_type] = typeCount[ele.primary_type] + 1 || 1;
		});

		const crimeTypesFormatted = Object.entries(typeCount).map((ele) => ({
			type: ele[0],
			count: ele[1],
			percent: (ele[1] * 100) / crimes.length,
		}));
		setPrimaryTypes(crimeTypesFormatted.sort((a, b) => b.count - a.count));
	}

	useEffect(() => {
		generatePrimaryType(crimes);
	}, []);
	return (
		<div>
			<h2>87%</h2>
			<p>Most likely crimes</p>
			<ul>
				{primaryTypes.map((ele, idx) => (
					<li className={classes.likelyhood_crimes} key={idx}>
						<p>{ele.type}</p>
						<p>{ele.percent}%</p>
					</li>
				))}
			</ul>
		</div>
	);
}
