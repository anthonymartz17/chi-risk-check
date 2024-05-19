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
		data: dangerousBlocks,
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
