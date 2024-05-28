import React, { useState } from "react";
import tendency from "../../../assets/tendency";
import { AgChartsReact } from "ag-charts-react";
import { useEffect } from "react";
export default function MostDangerousHours({similarCrimes}) {
	const [chartOptions, setChartOptions] = useState({
		height: 400,
		width: 870,
		data: [],
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
	});

  function generateTendency() {
    console.log(similarCrimes,'khay')
		const trend = similarCrimes.reduce((acc, curr) => {
			const month = getMonthName(new Date(curr.date).getMonth());
			if (!acc[month]) {
				acc[month] = { month, count: 0, date: curr.date };
			}
			acc[month].count++;
			return acc;
		}, {});
		const resultTrend = Object.values(trend).sort(
			(a, b) => new Date(a.date) - new Date(b.date)
		);

		setChartOptions((prev) => ({
			...prev,
			data: resultTrend,
		}));
	}
	function getMonthName(monthNumber) {
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		return monthNames[monthNumber];
	}

	useEffect(() => {
		generateTendency();
		// console.log(hours);
	}, []);
	return <AgChartsReact options={chartOptions} />;
}
