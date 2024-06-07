import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import pin from "../../../assets/images/pin.svg";
// import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";

const customIcon = new Icon({
	iconUrl: pin,
	iconSize: [38, 38],
});

const createClusterCustomIcon = function (cluster) {
	return new divIcon({
		html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
		className: "custom-marker-cluster",
		iconSize: point(33, 33, true),
	});
};

const CrimeMap = ({ crimeData }) => {

	const mapStyles = {
		width: "100%",
		height: "400px",
		marginTop: "2em",
	};
	return (
		<MapContainer
			className="crime-map"
			center={crimeData.centerCoor}
			zoom={11}
			style={mapStyles}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* <Marker position={crimeData.centerCoor} icon={customIcon}>
				<Popup>
					<b>Selected address</b>
					<br />
				</Popup>
			</Marker> */}
			{crimeData.crimeData.map((marker, index) => (
				<div>
					<Marker
						key={marker.id}
						position={[marker.latitude, marker.longitude]}
						icon={customIcon}
					>
						<Popup>
							<b>{marker.description}</b>
							<br />
							{marker.block}
						</Popup>
					</Marker>
				</div>
			))}
		</MapContainer>
	);
};

export default CrimeMap;
