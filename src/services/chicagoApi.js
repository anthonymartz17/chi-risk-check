import axios from "axios";
const BASE_URL = import.meta.env.VITE_SOCRATA_BASE;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export async function geocodeAddressIO({ address, radius }) {
	const startDate = getDateOneYearAgo();
	const endDate = new Date().toISOString().split("T")[0];
	try {
		const apiKey = import.meta.env.VITE_GEOCODIO_API_KEY;
		const apiUrl = `https://api.geocod.io/v1.6/geocode?q=${encodeURIComponent(
			address
		)}&fields=census&api_key=${apiKey}`;

		const response = await axios.get(apiUrl);

		const { lat, lng } = response.data.results[0].location;
		const { state_fips, county_fips, tract_code, block_group } =
			response.data.results[0].fields.census[2023];

		const population = await getPopulationByBlockGroup(
			block_group,
			tract_code,
			county_fips.slice(2),
			state_fips
		);

		const params = {
			$where: `within_circle(location, ${lat}, ${lng}, ${100}) AND date BETWEEN '${startDate}T00:00:00' AND '${endDate}T23:59:59'`,
			$limit: 5000,
		};
		const data = await fetchCrimeData(params);

		return {
			crimeData: data,
			population: Number(population),
			centerCoor: [lat, lng],
		};
	} catch (error) {
		console.error("Error performing reverse geocoding:", error);
		throw error;
	}
}

export async function getPopulationByBlockGroup(
	blockGroup,
	tract,
	county,
	state
) {
	try {
		const params = new URLSearchParams({
			get: "B01003_001E",
			for: `block group:${blockGroup}`,
			in: `state:${state}+county:${county}+tract:${tract}`,
			key: import.meta.env.VITE_CENSUS_API_KEY,
		});

		const response = await axios.get(
			`https://api.census.gov/data/2019/acs/acs5?${params.toString()}`
		);

		if (response.data && response.data.length > 1) {
			return response.data[1][0]; // Extract the population data
		} else {
			throw new Error("No data available for the specified parameters.");
		}
	} catch (error) {
		console.error("Error fetching data:", error.message);
		throw error;
	}
}

function getDateOneYearAgo() {
	const today = new Date();
	const oneYearAgo = new Date(
		today.getFullYear() - 1,
		today.getMonth(),
		today.getDate()
	);

	return oneYearAgo.toISOString().split("T")[0];
}

export async function fetchCrimeData(params) {
	try {
		const response = await axios.get(BASE_URL, { params });
		return response.data;
	} catch (error) {
		throw error;
	}
}
