import axios from "axios";
const BASE_URL = import.meta.env.VITE_SOCRATA_BASE;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export async function geocodeAddress(address) {
	try {
		const response = await axios.get(import.meta.env.VITE_GOOGLE_GEOCODE, {
			params: {
				address,
				key: GOOGLE_API_KEY,
			},
		});
		if (response.data.status !== "OK") {
			throw new Error("Address not found");
		}
		console.log(response, "google api");
		const { lat, lng } = response.data.results[0].geometry.location;
		return { lat, lng };
	} catch (error) {
		throw error;
	}
}

export async function fetchFIPSCode(lat, lng) {
	try {
		const response = await axios.get(import.meta.env.VITE_FCC_FIPS_CODE, {
			params: {
				latitude: lat,
				longitude: lng,
				format: "json",
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
export async function getPopulation(county, state) {
	try {
		const params = new URLSearchParams({
			get: "POP",
			for: `county:${county.slice(2)}`,
			in: `state:${state}`,
			key: import.meta.env.VITE_CENSUS_API_KEY,
		});
		const queryString = decodeURIComponent(params.toString());

		const response = await axios.get(
			`${import.meta.env.VITE_CENSUS_BASE_URL}?${queryString}`
		);
		return response.data[1];
	} catch (error) {
		throw error;
	}
}

export async function fetchCrimeData(params) {
	try {
		const response = await axios.get(BASE_URL, { params });
		return response.data;
	} catch (error) {
		throw error;
	}
}
