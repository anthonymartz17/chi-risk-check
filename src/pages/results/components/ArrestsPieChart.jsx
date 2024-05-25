import { useEffect, useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import classes from "../Results.module.css";

export default function ArrestsPieChart({ crimes }) {
	const [arrests, setArrests] = useState({
		data: [],
		height:500,
		title: {
			text: "Arrests Made vs Not Arrested",
			color: "white",
		},
		background: {
			fill: "black",
		},
		series: [
			{
				labels: {
					color: "white",
				},

				fills: ["#121481", "#ff6500"],
				type: "pie",
				angleKey: "percent",
				calloutLabelKey: "category",
				sectorLabelKey: "count",
				sectorLabel: {
					color: "white",
					fontWeight: "bold",
					formatter: ({ value }) => `${value}`,
				},
			},
		],
	});

	function generateArrestsData() {
		const arrestsData = [
			{ category: "Arrests Made", count: 0, percent: 0 },
			{ category: "Not Arrested", count: 0, percent: 0 },
		];

		crimes.forEach((crime) => {
			if (crime.arrest) {
				arrestsData[0].count++;
			} else {
				arrestsData[1].count++;
			}
		});

		const totalCrimes = crimes.length;
		arrestsData[0].percent = (arrestsData[0].count * 100) / totalCrimes;
		arrestsData[1].percent = (arrestsData[1].count * 100) / totalCrimes;

		setArrests((prevArrests) => ({ ...prevArrests, data: arrestsData }));
	}

	useEffect(() => {
		generateArrestsData();
	}, []);

	return <AgChartsReact options={arrests} className={classes.piechart} />;
}
