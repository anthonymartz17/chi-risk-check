import React, { useEffect, useState } from "react";
import crimeScene from "../../assets/images/crimescene.webp";
import classes from "./Results.module.css";
import { fetchCrimeData } from "../../services/chicagoApi";
import CrimeTendency from "../results/components/CrimeTendency";
import { useParams } from "react-router-dom";
export default function SingleCrime({ crimes }) {
	const { id } = useParams();
	const [crime, setCrime] = useState({});
	const [isLoading, setIsLoading] = useState(false);
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

	function getDateOneYearAgo() {
		const today = new Date();
		const oneYearAgo = new Date(
			today.getFullYear() - 1,
			today.getMonth(),
			today.getDate()
		);

		return oneYearAgo.toISOString().split("T")[0];
	}

	useEffect(() => {
		async function getCrime() {
			setIsLoading(true);
			try {
				const foundCrime = crimes.find((ele) => ele.id == id);

				foundCrime.time = formatTime(foundCrime.date);
				const startDate = getDateOneYearAgo();
				const endDate = new Date().toISOString().split("T")[0];

				const params = {
					$where: `within_circle(location, ${foundCrime.latitude}, ${
						foundCrime.longitude
					}, ${500}) AND date BETWEEN '${startDate}T00:00:00' AND '${endDate}T23:59:59' AND primary_type='${
						foundCrime.primary_type
					}'`,
					$limit: 5000,
				};
				const data = await fetchCrimeData(params);
				foundCrime.similar_crimes = data;
				foundCrime.arrest_made_percent = (
					(data.filter((ele) => ele.arrest).length * 100) /
					data.length
				).toFixed(2);
				console.log(crimes);
				console.log(foundCrime, "in function");

				setCrime(foundCrime);
				setIsLoading(false);
			} catch (error) {
				console.log(error, "error apjsx");
			}
		}
		if (crimes.length > 0) {
			getCrime();
			console.log(crime, "crime effect");
		}
	}, [id]);

	return (
		<div className={classes.singlecrime}>
			{isLoading ? (
				<div role="status" class="max-w-sm animate-pulse">
					<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
					<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
					<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
					<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
					<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
					<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
					<span class="sr-only">Loading...</span>
				</div>
			) : (
				<div className={classes.singlecrime_description_container}>
					<div className={classes.singlecrime_description}>
						<h2 className="title_h1 text-primary">{crime.primary_type}</h2>
						<p className={classes.singlecrime_description_item}>
							<span>Case:</span>
							{crime.case_number}
						</p>
						<p className={classes.singlecrime_description_item}>
							<span>Description:</span>
							{crime.description}
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
					</div>
				</div>
			)}

			{isLoading ? (
				<div
					role="status"
					className="w-full border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
				>
					<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
					<div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
					<div className="flex items-baseline mt-4">
						<div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
						<div className="w-full h-56 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
						<div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
						<div className="w-full h-64 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
						<div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
						<div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
						<div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
					</div>
					<span className="sr-only">Loading...</span>
				</div>
			) : (
				<div className={classes.singlecrime_tendency}>
					{crime.similar_crimes && (
						<div className={classes.singlecrime_tendency_item}>
							<CrimeTendency crime={crime} />
							<p className={classes.singlecrime_tendency_item_num}>
								{crime.similar_crimes.length}
							</p>
							<p>Similar crimes over the past year</p>
						</div>
					)}
					<div className={classes.singlecrime_tendency_item}>
						<p className={classes.singlecrime_tendency_item_num}>
							{crime.arrest_made_percent + "%"}
						</p>
						<p>Resulted in arrests</p>
					</div>
				</div>
			)}
		</div>
	);
}
