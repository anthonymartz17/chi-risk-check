import { useState } from "react";
import classes from "./Results.module.css";
import MostDangerousHours from "./components/MostDangerousHours";
import ArrestsPieChart from "./components/ArrestsPieChart";
import MostDangerousBlocks from "./components/MostDangerousBlocks";

export default function Analytics({ crimes }) {
	return (
		
		<div className={classes.results_analytics}>
			<div>
				<div className={classes.results_card}>
					<ArrestsPieChart crimes={crimes} />
				</div>
			</div>
			<div>
				<div className={classes.results_card}>
					<MostDangerousHours crimes={crimes} />
				</div>
				<div className={classes.results_card}>
					<MostDangerousBlocks crimes={crimes} />
				</div>
			</div>
		</div>
	);
}
