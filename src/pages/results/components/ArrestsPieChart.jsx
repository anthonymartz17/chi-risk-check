import { useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import classes from "../Results.module.css";
export default function ArrestsPieChart() {
	const donutChartOptions = {
		data: [
			{ category: "Apples", value: 40 },
			{ category: "Oranges", value: 30 },
		],
		series: [
			{
				type: "pie",
				angleKey: "value",
				labelKey: "category",
				// innerRadiusOffset: -50, // This creates the donut effect by specifying the inner radius
				fills: ["#f8a1d1", "#f2b809"],
				// strokes: ["#d078b5", "#b08b05", "#5ba664", "#7094b2"],
			},
		],
		legend: {
			enabled: false,
		},
	};

	return (
		<AgChartsReact options={donutChartOptions} className={classes.piechart} />
	);
}
