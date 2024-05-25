import React, { useEffect } from "react";
import classes from "./Home.module.css";
import { fetchCrimeData } from "../../services/chicagoApi";
import Form from "../../components/UI/Form.jsx";
export default function Home() {
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
			{/* <div className={classes.home_wrapper}> */}
			<h1 className={classes.home_hero_text}>
				How likely were you to be a victim of a crime?
			</h1>
			{/* <div className="card"> */}
				<Form />
			{/* </div> */}
			{/* </div> */}
		</div>
	);
}
