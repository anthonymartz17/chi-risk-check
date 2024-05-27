import React, { useState } from "react";
import classes from "../UI/UI.module.css";
import { useNavigate } from "react-router-dom";
import { Datepicker } from "flowbite-react";

export default function Form({ onGetCrimeData }) {
	const navigate = useNavigate();
	const [date, setDate] = useState("");
	const [address, setAddress] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		const formatted = new Date(date).toISOString().split("T")[0];
		onGetCrimeData({ address, date: formatted });
		navigate("/results");
	}

	return (
		<form onSubmit={handleSubmit} className={classes.form}>
			<div className={classes.form_inputs}>
				<label htmlFor="date">Pick a Date</label>

				<Datepicker
					onChange={(date) => setDate(date)}
					className="w-full  dark:bg-gray-800"
					style={{ background: "grey", color: "white" }}
					// minDate={new Date(2023, 0, 1)}
					// maxDate={new Date(2023, 3, 30)}
				/>
			</div>
			<div className={classes.form_inputs}>
				<label htmlFor="address">Enter Address</label>
				<input
					className={classes.form_input_address}
					id="address"
					type="text"
					value={address}
					required
					onChange={(e) => setAddress(e.target.value)}
				/>
			</div>
			<div>
				<button className="primary_btn">Find out</button>
			</div>
		</form>
	);
}
