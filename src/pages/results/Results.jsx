import React, { useState } from "react";
import classes from "./Results.module.css";
import SideBar from "./components/SideBar";
import MostDangerousHours from "./components/MostDangerousHours";
import ArrestsPieChart from "./components/ArrestsPieChart";
import LikelyHoodChart from "./components/LikelyHoodChart";
import MostDangerousBlocks from "./components/MostDangerousBlocks";
export default function Results() {
	return (
		<div className={classes.results}>
			<div className={classes.sidebar}>
				<SideBar />
			</div>
			<div className={classes.results_display}>
				<div className={`${classes.results_likelyhood} card`}>
					<LikelyHoodChart />
				</div>
				<div className="card">
					<MostDangerousHours />
				</div>
				<div className="card">
					<MostDangerousBlocks />
				</div>
				<div className="card">
					<h2>Percentage of Arrests Made</h2>
					{/* <ArrestsPieChart /> */}
				</div>
			</div>
		</div>
	);
}
