import React, { useState } from "react";
import { Datepicker, Dropdown } from "flowbite-react";
import classes from "../UI/UI.module.css";
import { useNavigate } from "react-router-dom";

export default function Form({ onGetCrimeData }) {
	const navigate = useNavigate();
	const [selectedDate, setSelectedDate] = useState(null);
	const [address, setAddress] = useState("");
	const [radius, setRadius] = useState(1000);

	function handleSubmit(e) {
		e.preventDefault();
		console.log(radius, "radius");
		const formatted = new Date(selectedDate).toISOString().split("T")[0];
		onGetCrimeData({ address, radius, date: formatted }, navigate);
	}
	const radiusList = [500, 1000, 1500];
	const today = new Date();
	const oneWeekBeforeToday = new Date(today);
	oneWeekBeforeToday.setDate(today.getDate() - 7);
	console.log(today.getDate(), "oneWeekBeforeToday");

	return (
		<form onSubmit={handleSubmit} className={classes.form}>
			<div className={classes.form_inputs}>
				<label htmlFor="date">Pick a Date</label>

				<Datepicker
					onSelectedDateChanged={(selectedDate) =>
						setSelectedDate(selectedDate)
					}
					className="w-full  dark:bg-gray-800"
					style={{ background: "#373a40", border: "none", color: "white" }}
					// minDate={oneWeekBeforeToday}
					maxDate={oneWeekBeforeToday}
				/>
			</div>
			<div className={classes.form_inputs}>
				<label htmlFor="address">Enter Address</label>
				<input
					className={classes.form_input_field}
					id="address"
					value={address}
					placeholder="123 st Chicago, IL 11001"
					required
					onChange={(e) => setAddress(e.target.value)}
				/>
			</div>
			<div className={classes.form_inputs}>
				<label htmlFor="radius">Select Radius:</label>
				<select
					className={classes.form_input_field}
					name="radius"
					id="radius"
					value={radius}
					onChange={(e) => setRadius(e.target.value)}
				>
					{radiusList.map((ele, index) => (
						<option key={index} value={ele}>
							{`${ele} mts`}
						</option>
					))}
				</select>
			</div>
			<div>
				<button className="primary_btn">Find out</button>
			</div>
		</form>
	);
}
