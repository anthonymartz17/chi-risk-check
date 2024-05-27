import React, { useEffect, useState } from "react";
import crimeScene from "../../assets/images/crimescene.webp";
import classes from "./Results.module.css";
import { fetchCrimeData } from "../../services/chicagoApi";
import CrimeTendency from "../results/components/CrimeTendency";
import { useParams } from "react-router-dom";
export default function SingleCrime({ crimes }) {
	const { id } = useParams();
	const [crime, setCrime] = useState({});
	const containerStyle = {
		backgroundImage: `url(${crimeScene})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		height: "40vh",
	};
	function formatTime(timestamp) {
		const date = new Date(timestamp);
		return new Intl.DateTimeFormat("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		}).format(date);
	}

	async function getCrime() {
		try {
			const foundCrime = crimes.find((ele) => ele.id == id);
			foundCrime.time = formatTime(foundCrime.date);
			const startDate = getDateThreeMonthsAgo();
			const endDate = new Date().toISOString().split("T")[0];

			const params = {
				$where: `within_circle(location, ${foundCrime.latitude}, ${
					foundCrime.longitude
				}, ${500}) AND date BETWEEN '${startDate}T00:00:00' AND '${endDate}T23:59:59' AND primary_type='${
					foundCrime.primary_type
				}'`,
				$limit: 5000,
			};
			// const data = await fetchCrimeData(params);
			foundCrime.similar_crimes = [...data];
			console.log(data, "k vino");
			setCrime(foundCrime);
		} catch (error) {
			console.log(error, "error apjsx");
		}
	}

	function getDateThreeMonthsAgo() {
		const today = new Date();
		const oneYearAgo = new Date(
			today.getFullYear() - 1,
			today.getMonth(),
			today.getDate()
		);

		return oneYearAgo.toISOString().split("T")[0];
	}

	useEffect(() => {
		getCrime();
	}, []);

	return (
		<div className={classes.singlecrime}>
			<div className={classes.singlecrime_description_container}>
				<div className={classes.singlecrime_description}>
					<h2 className="title_h1 text-primary">{crime.primary_type}</h2>
					<p className={classes.singlecrime_description_item}>
						<span>Case:</span>
						{crime.case_number}
					</p>
					<p className={classes.singlecrime_description_item}>
						<span>Location:</span>
						{crime.location_description}
					</p>
					<p className={classes.singlecrime_description_item}>
						<span>Block:</span>
						{crime.block}
					</p>
					<p className={classes.singlecrime_description_item}>
						<span>Time:</span>
						{crime.time}
					</p>
					<p className={classes.singlecrime_description_item}>
						<span>Arrested:</span>
						{crime.arrest ? "Suspected arrested" : "Suspect not arrested"}
					</p>

					<div style={containerStyle}></div>
				</div>
			</div>
			<div className={classes.singlecrime_tendency}>
				<div className={classes.singlecrime_tendency_item}>
					<CrimeTendency crime={crime} />
					<p className={classes.singlecrime_tendency_item_num}>23</p>
					<p>Similar crimes last 3 months</p>
				</div>
				<div className={classes.singlecrime_tendency_item}>
					<p className={classes.singlecrime_tendency_item_num}>1 / 4</p>
					<p>Resulted in arrests</p>
				</div>
			</div>
		</div>
	);
}
