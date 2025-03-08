import HomePage from "./HomePage"
import "./App.css"
import PreCheckInForm from "./PreCheckInForm"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<div className="App">
							<header className="App-header">
								<Navbar />
								<HomePage />
							</header>
						</div>
					}></Route>
				<Route
					path="/pre-checkin"
					element={
						<div className="App">
							<header className="App-header">
								<Navbar />
								<PreCheckInForm />
							</header>
						</div>
					}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
