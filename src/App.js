import HomePage from "./HomePage"
import "./App.css"
import PreCheckInForm from "./PreCheckInForm"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Signup from "./Signup"
import Login from "./Login"
import HealthForm from "./HealthForm"
import Dashboard from "./Dashboard"

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
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/login"
					element={
						<div className="App">
							<header className="App-header">
								<Navbar />
								<Login />
							</header>
						</div>
					}
				/>
				<Route path="/health-form" element={<HealthForm />} />
				<Route
					path="/login"
					element={
						<div className="App">
							<header className="App-header">
								<Navbar />
								<Dashboard />
							</header>
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
