import React, { useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import { useEffect } from "react";
export default function MostDangerousHours({ crimes }) {
	const [hours, setHours] = useState([
		{ hours: "12am - 1:59am", start: 0, end: 1, count: 0, percent: 0 },
		{ hours: "2am - 3:59am", start: 2, end: 3, count: 0, percent: 0 },
		{ hours: "4am - 5:59am", start: 4, end: 5, count: 0, percent: 0 },
		{ hours: "6am - 7:59am ", start: 6, end: 7, count: 0, percent: 0 },
		{ hours: "8am  - 9:59am", start: 8, end: 9, count: 0, percent: 0 },
		{ hours: "10am - 11:59am", start: 10, end: 11, count: 0, percent: 0 },
		{ hours: "12pm - 1:59pm", start: 12, end: 13, count: 0, percent: 0 },
		{ hours: "2pm - 3:59pm", start: 14, end: 15, count: 0, percent: 0 },
		{ hours: "4pm - 5:59pm", start: 16, end: 17, count: 0, percent: 0 },
		{ hours: "6pm - 7:59pm ", start: 18, end: 19, count: 0, percent: 0 },
		{ hours: "8pm  - 9:59pm", start: 20, end: 21, count: 0, percent: 0 },
		{ hours: "10pm - 11:59pm", start: 22, end: 23, count: 0, percent: 0 },
	]);

	function generateDangerousHours(crimes) {
		const updatedHours = [...hours];
		crimes.forEach((crime) => {
			const hour = new Date(crime.date).getHours();
			const idx = updatedHours.findIndex(
				(ele) => hour >= ele.start && hour <= ele.end
			);
			updatedHours[idx].count++;
		});
  console.log(updatedHours,'updated')
		setHours(
			updatedHours.map((ele) => ({
				...ele,
				percent: (ele.count * 100) / crimes.length,
			}))
		);
	}
	const chartOptions = {
		height: 500,
		width:870,
		data: hours,
		title: {
			text: "Most dangerous hours",
			color: "white",
			margin:"1em"
		},
		series: [
			{
				type: "line",
				xKey: "hours",
				yKey: "count",
				stroke: "#ff6500",
				marker: {
					shape: "circle",
					size: 8,
					fill: "#ff6500",
					stroke: "#ffffff",
					strokeWidth: 2,
				},
				label: {
					fontSize: 12,
					fontWeight: "lighter",
					color: "#d3d3d3", // Light color for y-axis labels
				},
			},
		],
		background: {
			fill: "black",
		},
	};
	useEffect(() => {
		generateDangerousHours(crimes);
		console.log(hours);
	}, []);
	return <AgChartsReact options={chartOptions} />;
}
