import React from "react";
import classes from "./About.module.css";
export default function About() {
	return (
		<div className={classes.about}>
			<div className={classes.about_content_wrapper}>
				<div className={classes.about_photo_container}>
					<img
						src="https://ca.slack-edge.com/TCVA3PF24-U0640C4HB5L-313b764ada25-512"
						alt="photo of the developer"
					/>
				</div>
				<div className={classes.about_description}>
					<h1 className={classes.about_title}>Antonio Martinez</h1>
					<h3 className="title_h2 text-gradient-primary">Front-end Dev</h3>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
						sunt a corrupti exercitationem illo nobis enim assumenda pariatur
						suscipit commodi itaque excepturi ipsam sapiente, animi quod, iste
						veritatis omnis accusantium.
					</p>
				</div>
			</div>
		</div>
	);
}
