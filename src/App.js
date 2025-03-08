import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./HomePage"
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
			</Routes>
		</BrowserRouter>
	)
}

export default App
