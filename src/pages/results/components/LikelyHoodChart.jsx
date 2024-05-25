import React, { useEffect, useState } from "react";
import classes from "../Results.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

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
		<div className={classes.results_likelyhood}>
			<div className={classes.results_progress_bar_container}>
				<CircularProgressbar
					className={classes.results_progress_bar}
					value={30}
					text={`${30}%`}
					styles={buildStyles({
						pathColor: "#ff6500",
						textColor: "white",
						trailColor: "#d6d6d6",
					})}
				/>
			</div>
			<div className={classes.results_likely_crimes}>
				<h3 className="title_h3">Most likely crimes</h3>
				<ul>
					{primaryTypes.map((ele, idx) => (
						<li className={classes.likelyhood_crimes} key={idx}>
							<p>{ele.type}</p>
							<p>{ele.percent}%</p>
						</li>
					))}
				</ul>
				<Link
					to="analytics"
					className={`${classes.results_analytics_btn} primary_btn `}
				>
					See Analytics
				</Link>
			</div>
		</div>
	);
}
