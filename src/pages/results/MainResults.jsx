import React, { useState } from "react";
import classes from "./Results.module.css";
import TableResults from "./components/TableResults";
import LikelyHoodChart from "./components/LikelyHoodChart";
import MapDisplay from "./components/MapLeafLet";
export default function Results({ crimeData, isLoading }) {
	console.log(crimeData, "crimeData");
	return (
		<div className={classes.main_results}>
			<div className={classes.results_col_1}>
				<LikelyHoodChart crimeData={crimeData} isLoading={isLoading} />
			</div>

			<div className={classes.results_col_2}>
				<TableResults crimes={crimeData.crimeData} isLoading={isLoading} />
			<div className="bg-red-600">
				<MapDisplay crimeData={crimeData} />
			</div>
			</div>

		</div>
	);
}
