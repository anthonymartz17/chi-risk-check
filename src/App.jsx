import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Results from "./pages/results/Results";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./App.css";
import { useState } from "react";
import { geocodeAddress, fetchCrimeData } from "./services/chicagoApi";
import { crimes } from "./assets/mockup_db";

function App() {
	async function getCrimeData(payload) {
		try {
			const { lat, lng } = await geocodeAddress(payload.address);
			const response = await fetchCrimeData({ date: payload.date, lat, lng });

			console.log(response, "crime data");
		} catch (error) {
			console.log(error, "error apjsx");
		}
	}
	return (
		<>
			<Router>
				<div className="app">
					<Header />
					<main>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route
								path="/results"
								element={
									<Results onGetCrimeData={getCrimeData} crimes={crimes} />
								}
							/>
							<Route path="/about" element={<About />} />
						</Routes>
					</main>

					<Footer />
				</div>
			</Router>
		</>
	);
}

export default App;
