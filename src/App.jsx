import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Results from "./pages/results/Results";
import MainResults from "./pages/results/MainResults";
import SingleCrime from "./pages/results/SingleCrime";
import Analytics from "./pages/results/Analytics";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./App.css";
import { useState } from "react";
import { geocodeAddress, fetchCrimeData } from "./services/chicagoApi";
import { crimes } from "./assets/mockup_db";

function App() {
	const [crimeData, setCrimeData] = useState(crimes);
	async function getCrimeData({ address, date }) {
		try {
			const { lat, lng } = await geocodeAddress(address);
			const params = {
				$where: `within_circle(location, ${lat}, ${lng}, ${radius}) AND date BETWEEN '${date}T00:00:00' AND '${date}T23:59:59'`,
				$limit: 5000,
			};
			const data = await fetchCrimeData(params);
			setCrimeData(data);
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
							<Route
								path="/"
								element={<Home onGetCrimeData={getCrimeData} />}
							/>
							<Route path="/results" element={<Results />}>
								<Route path="" element={<MainResults crimes={crimeData} />} />
								<Route
									path="analytics"
									element={<Analytics crimes={crimeData} />}
								/>
								<Route
									path=":id"
									element={<SingleCrime crimes={crimeData} />}
								/>
							</Route>
							<Route path="/about" element={<About />} />
						</Routes>
					</main>

					{/* <Footer /> */}
				</div>
			</Router>
		</>
	);
}

export default App;
