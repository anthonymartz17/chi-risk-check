import React from "react";
import Form from "../../../components/UI/Form";

export default function SideBar({onGetCrimeData}) {
	return (
		<div>
			<div>
				<Form onGetCrimeData={ onGetCrimeData}/>
			</div>
		</div>
	);
}
