import { Link, Outlet } from "react-router-dom";
import classes from "./Results.module.css";

export default function Results() {
	return (
		<div className={classes.results}>
			<div className={classes.results_header_container}>
				<h1 className="title_h1">Results</h1>
				<Link to="/results">
				
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#e8eaed"
					>
						<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
					</svg>{" "}
					Back
				</Link>
			</div>

			<Outlet />
		</div>
	);
}
