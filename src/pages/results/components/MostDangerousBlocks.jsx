import React from "react";
import { AgChartsReact } from "ag-charts-react";
export default function MostDangerousBlocks() {
	const barChartOptions = {
		data: [
			{ category: "Apples", value: 40 },
			{ category: "Oranges", value: 30 },
			{ category: "Bananas", value: 20 },
			{ category: "Grapes", value: 10 },
		],
		series: [
			{
				type: "bar",
				xKey: "category",
				yKey: "value",
				fills: ["#f8a1d1", "#f2b809", "#7adf8c", "#9bc3e6"],
				strokes: ["#d078b5", "#b08b05", "#5ba664", "#7094b2"],
			},
		],
		axes: [
			{
				type: "category",
				position: "bottom",
				label: {
					rotation: 30,
				},
			},
			{
				type: "number",
				position: "left",
			},
		],
		legend: {
			enabled: true,
		},
	};

	return <AgChartsReact options={barChartOptions} />;
}
