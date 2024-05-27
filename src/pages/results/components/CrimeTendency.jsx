import React, { useState } from "react";
import tendency from "../../../assets/tendency"
import { AgChartsReact } from "ag-charts-react";
import { useEffect } from "react";
export default function MostDangerousHours({ crimes }) {
	const crimeData = [
		{ month: "January", count: 10 },
		{ month: "February", count: 15 },
		{ month: "March", count: 8 },
		{ month: "April", count: 12 },
		{ month: "May", count: 17 },
		{ month: "June", count: 20 },
		{ month: "July", count: 22 },
		{ month: "August", count: 18 },
		{ month: "September", count: 15 },
		{ month: "October", count: 12 },
		{ month: "November", count: 11 },
		{ month: "December", count: 9 },
	];

	function generateDangerousHours(crimes) {
		const updatedHours = [...hours];
		crimes.forEach((crime) => {
			const hour = new Date(crime.date).getHours();
			const idx = updatedHours.findIndex(
				(ele) => hour >= ele.start && hour <= ele.end
			);
			updatedHours[idx].count++;
		});
		console.log(updatedHours, "updated");
		setHours(
			updatedHours.map((ele) => ({
				...ele,
				percent: (ele.count * 100) / crimes.length,
			}))
		);
	}
	const chartOptions = {
		height: 400,
		width: 870,
		data: crimeData,
		title: {
			text: "Tendency of this type of crime",
			color: "white",
			margin: "1em",
		},
		series: [
			{
				type: "line",
				xKey: "month",
				yKey: "count",
				stroke: "#ff6500",
				marker: {
					shape: "circle",
					size: 8,
					fill: "#121481",
					stroke: "#ffffff",
					strokeWidth: 2,
				},

				label: {
					fontSize: 12,
					fontWeight: "lighter",

					color: "#d3d3d3",
				},
			},
		],
		background: {
			fill: "black",
		},
	};
	useEffect(() => {
		// generateDangerousHours(crimes);
		// console.log(hours);
	}, []);
	return <AgChartsReact options={chartOptions} />;
}
