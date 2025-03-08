import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<div className="App">
							<h1>Under Construction</h1>
						</div>
					}
					title="Hospital Information"></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
