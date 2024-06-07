import React, { useEffect } from "react";
import classes from "./Home.module.css";
import { fetchCrimeData } from "../../services/chicagoApi";
import skyline from "../../assets/images/chicago_skyline.png";
import helicopter from "../../assets/images/helicopter.gif";
import Form from "../../components/UI/Form.jsx";

export default function Home({ onGetCrimeData, isLoading }) {
	async function getCrimeData() {
		try {
			const data = await fetchCrimeData();
			data.sort((a, b) => b.date - a.date);
			console.log(data, "from home");
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		// getCrimeData();
	}, []);

	return (
		<div className={classes.home}>
			<h1 className={classes.home_hero_text}>How risky is it to visit?</h1>
			<Form onGetCrimeData={onGetCrimeData} isLoading={isLoading} />
			<div className={classes.home_skyline}>
				<img className={classes.skyline} src={skyline} alt="" />
				<img className={classes.helicopter} src={helicopter} alt="" />
			</div>

		</div>
	);
}
