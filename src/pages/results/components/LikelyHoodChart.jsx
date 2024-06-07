import React, { useEffect, useState } from "react";
import classes from "../Results.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

export default function LikelyHoodChart({ crimeData, isLoading }) {
	const [primaryTypes, setPrimaryTypes] = useState([]);
	const [likelyhood, setLikelyhood] = useState({});

	function generatePrimaryType(crimes) {
		const typeCount = {};

		crimes.forEach((ele) => {
			typeCount[ele.primary_type] = typeCount[ele.primary_type] + 1 || 1;
		});

		const crimeTypesFormatted = Object.entries(typeCount).map((ele) => ({
			type: ele[0],
			count: ele[1],
			percent: ((ele[1] * 100) / crimes.length).toFixed(2),
		}));
		setPrimaryTypes(crimeTypesFormatted.sort((a, b) => b.count - a.count));
	}

	function calcCrimeRate(crimeCount, population) {
		const SAMPLE_SIZE = 1000;
		const ratio = Math.round((crimeCount / population) * SAMPLE_SIZE);
		const result = { ratio, percent: (ratio / SAMPLE_SIZE) * 100 };
		console.log(result, "crimerate");
		setLikelyhood(result);
	}

	useEffect(() => {
		generatePrimaryType(crimeData.crimeData);
		calcCrimeRate(crimeData.crimeData.length, crimeData.population);
		console.log(likelyhood, "likelyhood");
	}, [crimeData, isLoading]);
	return (
		<>
			{isLoading ? (
				<div
					role="status"
					className="max-w-sm p-4 shadow animate-pulse md:p-6 dark:border-gray-700"
				>
					<div className="flex items-center flex-col justify-center border-8 border-gray-700   mb-4  rounded-full w-full h-80">
						loading...
					</div>
					<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
					<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
				</div>
			) : (
				<div className={classes.results_likelyhood}>
					<div className={classes.results_progress_bar_container}>
						<CircularProgressbar
							className={classes.results_progress_bar}
							value={likelyhood.percent}
							text={`${likelyhood.percent}%`}
							styles={buildStyles({
								pathColor: "#ff6500",
								textColor: "white",
								trailColor: "#d6d6d6",
							})}
							/>
						<b className="block my-1">Crime rate</b>
							{`${likelyhood.ratio} : 1000`}
					</div>
					<div className={classes.results_likely_crimes}>
						<h3 className="title_h3">Most committed crimes</h3>
						<ul>
							{primaryTypes.map((ele, idx) => {
								if (idx <= 4) {
									return (
										<li className={classes.likelyhood_crimes} key={idx}>
											<p>{ele.type}</p>
											<p>{ele.percent}%</p>
										</li>
									);
								}
							})}
						</ul>
						<Link
							to="analytics"
							className={`${classes.results_analytics_btn} primary_btn `}
						>
							See Analytics
						</Link>
					</div>
				</div>
			)}
		</>
	);
}
