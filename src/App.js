import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Hospital from "./Components/Hospital"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/hospital_info"
					element={
						<div className="App">
							<Hospital />
						</div>
					}
					title="Hospital Information"></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
