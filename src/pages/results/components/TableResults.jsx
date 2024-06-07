import React, { useState } from "react";
import classes from "../Results.module.css";
import { Link } from "react-router-dom";
export default function TableResults({ crimes, isLoading }) {
	const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const [crimeList, setCrimelist] = useState(crimes);

	function searchCrimes(e) {
		const list = crimes.filter((ele) =>
			Object.values(ele)
				.join(" ")
				.toLowerCase()
				.match(e.target.value.toLowerCase())
		);

		setCrimelist(list);
	}
	return (
		<div>
			{isLoading ? (
				<div
					role="status"
					className=" p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 "
				>
					{skeleton.map((ele) => (
						<div key={ele} className="flex items-center justify-between ">
							<div className="mb-1 pt-2">
								<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
								<div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
							</div>
							<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
						</div>
					))}

					<span className="sr-only">Loading...</span>
				</div>
			) : (
				<>
					<div className={classes.controls}>
						<div className={classes.form_inputs}>
							<input
								onChange={searchCrimes}
								className={classes.form_input_field}
								id="street"
								placeholder="Search..."
								required
							/>
						</div>
					</div>
					<table className={classes.table} key={crimeList}>
						<thead>
							<tr className={classes.table_header}>
								<th>Case Number</th>
								<th>Type Of Crime</th>
								<th>Address</th>
								<th>Arrested</th>
								<th>Action</th>
							</tr>
						</thead>

						<tbody>
							{crimeList.map((ele) => {
								return (
									<tr className={classes.table_body_rows} key={ele.id}>
										<td>{ele.case_number}</td>
										<td>{ele.primary_type}</td>
										<td>{ele.block}</td>
										<td>{ele.arrest ? "Yes" : "No"}</td>
										<td>
											<Link to={ele.id}>
												<button className="primary_btn">See Details</button>
											</Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</>
			)}
		</div>
	);
}
