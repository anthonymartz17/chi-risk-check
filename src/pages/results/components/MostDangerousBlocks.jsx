import React from "react";
import { AgChartsReact } from "ag-charts-react";
import { useState, useEffect } from "react";
export default function MostDangerousBlocks({ crimes }) {
	const [dangerousBlocks, setDangerousBlocks] = useState([]);

	function generateMostDangerousBlocks(crimes) {
		const count = {};

		crimes.forEach((ele) => {
			count[ele.block] = count[ele.block] + 1 || 1;
		});

		const blocksFormatted = Object.entries(count).map((ele) => ({
			category: ele[0],
			count: ele[1],
			value: (ele[1] * 100) / crimes.length,
		}));
		setDangerousBlocks(blocksFormatted);
	}

	useEffect(() => {
		generateMostDangerousBlocks(crimes);
	}, []);
	const barChartOptions = {
		height: 500,
		width: 870,
		data: dangerousBlocks,
		title: {
			text: "Most dangerous blocks",
			color: "white",
		},
		series: [
			{
				type: "bar",
				xKey: "category",
				yKey: "value",
				fill: "#ff6500", // Orange color for bars
			},
		],
		background: {
			fill: "black",
		},
		axes: [
			{
				type: "category",
				position: "bottom",
				label: {
					rotation: 30,
					color: "#ffffff",
				},
			},
			{
				type: "number",
				position: "left",
				label: {
					color: "#ffffff",
				},
			},
		],

		legend: {
			enabled: true,
			label: {
				color: "red", // White color for legend text
			},
		},
	};

	return <AgChartsReact options={barChartOptions} />;
}
