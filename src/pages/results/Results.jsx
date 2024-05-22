import React, { useState } from "react";
import classes from "./Results.module.css";
import SideBar from "./components/SideBar";
import MostDangerousHours from "./components/MostDangerousHours";
import ArrestsPieChart from "./components/ArrestsPieChart";
import LikelyHoodChart from "./components/LikelyHoodChart";
import MostDangerousBlocks from "./components/MostDangerousBlocks";
export default function Results({ onGetCrimeData, crimes }) {
	console.log(crimes);
	return (
		<div className={classes.results}>
			<div className={classes.sidebar}>
				<SideBar onGetCrimeData={onGetCrimeData} />
			</div>
			<div className={classes.results_display}>
				<div className={classes.results_card}>
					<LikelyHoodChart crimes={crimes} />
				</div>
				<div className={classes.results_card}>
					<MostDangerousHours crimes={crimes} />
				</div>
				<div className={classes.results_card}>
					<MostDangerousBlocks crimes={crimes} />
				</div>

				<div className={classes.results_card}>
					<ArrestsPieChart crimes={crimes} />
				</div>
			</div>
		</div>
	);
}
