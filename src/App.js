// <<<<<<< HEAD
// import "./App.css"
// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import HomePage from "./HomePage"
// import Navbar from "./Components/Navbar"

// function App() {
// 	return (
// 		<BrowserRouter>
// 			<Routes>
// 				<Route
// 					path="/"
// 					element={
// 						<div className="App">
// 							<header className="App-header">
// 								<Navbar />
// 								<HomePage />
// 							</header>
// 						</div>
// 					}></Route>
// 			</Routes>
// 		</BrowserRouter>
// 	)
// }

// export default App
// =======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import HealthForm from "./HealthForm";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/health-form" element={<HealthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
// >>>>>>> login
