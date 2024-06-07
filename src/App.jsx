import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Results from "./pages/results/Results";
import MainResults from "./pages/results/MainResults";
import SingleCrime from "./pages/results/SingleCrime";
import Analytics from "./pages/results/Analytics";
import Header from "./components/layout/Header";
import Alert from "./components/UI/Alert";
import Footer from "./components/layout/Footer";
import "./App.css";
import { useEffect, useState } from "react";
import { geocodeAddressIO } from "./services/chicagoApi";
import { crimes } from "./assets/mockup_db";
function App() {
	const [crimeData, setCrimeData] = useState({});

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	async function getCrimeData(payload, navigate) {
		try {
			setIsLoading(true);

			const crimeData  = await geocodeAddressIO(payload);

			setCrimeData(crimeData);
			navigate("/results");
			setIsLoading(false);
		} catch (error) {
			setError(error);
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
								element={
									<Home onGetCrimeData={getCrimeData} isLoading={isLoading} />
								}
							/>
							<Route path="/results" element={<Results />}>
								<Route
									path=""
									element={
										<MainResults crimeData={crimeData} isLoading={isLoading} />
									}
								/>
								<Route
									path="analytics"
									element={<Analytics crimes={crimeData.crimeData} />}
								/>
								<Route
									path=":id"
									element={<SingleCrime crimes={crimeData.crimeData} />}
								/>
							</Route>
							<Route path="/about" element={<About />} />
						</Routes>
					</main>

					{/* <Footer /> */}
				</div>
			</Router>
			{error && <Alert />}
		</>
	);
}

export default App;
