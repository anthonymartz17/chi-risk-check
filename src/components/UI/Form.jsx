import React, { useState } from "react";
import classes from "../UI/UI.module.css";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export default function Form({ onGetCrimeData }) {
	const [date, setDate] = useState("");
	const [address, setAddress] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		const formatted = new Date(date).toISOString().split("T")[0];

		// onGetCrimeData({ address, date: formatted });
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className={classes.form_inputs}>
				<label htmlFor="date">Pick a Date</label>
				<DatePicker
					id="date"
					className={classes.form_date_picker}
					onChange={(e) => setDate(e)}
					value={date}
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
				<button className={classes.form_submit_btn}>Find out</button>
			</div>
		</form>
	);
}
