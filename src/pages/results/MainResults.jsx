import React, { useState } from "react";
import classes from "./Results.module.css";
import TableResults from "./components/TableResults";
import LikelyHoodChart from "./components/LikelyHoodChart";
export default function Results({ crimes }) {
	return (
		<div className={classes.main_results}>
			<div className={classes.results_col_1}>
				{/* <div className={classes.results_card}> */}
					<LikelyHoodChart crimes={crimes} />
				{/* </div> */}
			</div>

			<div className={classes.results_col_2}>
				<TableResults crimes={crimes} />
			</div>
		</div>
	);
}
