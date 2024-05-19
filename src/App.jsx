import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Results from "./pages/results/Results";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./App.css";
import { useState } from "react";

function App() {
	return (
		<>
			<Router>
				<div className="app">
					<Header />
					<main>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/results" element={<Results />} />
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
