import React from "react";
import { AgChartsReact } from "ag-charts-react";
export default function MostDangerousHours() {
	const chartOptions = {
		data: [
			{ month: "Jan", value: 30 },
			{ month: "Feb", value: 20 },
			{ month: "Mar", value: 50 },
			{ month: "Apr", value: 40 },
			{ month: "May", value: 60 },
			{ month: "Jun", value: 80 },
			{ month: "Jul", value: 70 },
			{ month: "Aug", value: 90 },
			{ month: "Sep", value: 100 },
			{ month: "Oct", value: 110 },
			{ month: "Nov", value: 120 },
			{ month: "Dec", value: 130 },
		],
		series: [
			{
				type: "line",
				xKey: "month",
				yKey: "value",
			},
		],
	};
	return <AgChartsReact options={chartOptions} />;
}
