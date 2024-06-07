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
						I'm a passionate coder, dedicated father of two amazing girls, and
						an avid adventure seeker. I thrive on problem-solving and embracing
						new challenges. When I'm not immersed in lines of code, I'm out
						exploring the world, seeking new thrills and experiences to share
						with my loved ones.
					</p>
				</div>
			</div>
		</div>
	);
}
