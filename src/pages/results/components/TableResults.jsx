import React from "react";
import classes from "../Results.module.css";
import { Link } from "react-router-dom";
export default function TableResults({ crimes }) {
	return (
		<div>
			<table className={classes.table}>
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
					{crimes.map((ele) => {
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
		</div>
	);
}
