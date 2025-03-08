import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "./firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import "./App.css" // Import your CSS file for styling

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()

	const handleLogin = async (e) => {
		e.preventDefault()
		setError(null)

		// Basic form validation
		if (!email || !password) {
			setError("Please fill in all fields.")
			return
		}

		setLoading(true)

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			const user = userCredential.user

			// Check if user has completed health form
			const userRef = doc(db, "users", user.uid)
			const userSnap = await getDoc(userRef)

			if (userSnap.exists() && userSnap.data().healthIssue) {
				navigate("/dashboard") // Redirect to dashboard if health info exists
			} else {
				navigate("/health-form") // Redirect to health form if missing
			}
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="login-container">
			<h2>Login</h2>
			{error && <p className="error-message">{error}</p>}
			<form onSubmit={handleLogin} className="login-form">
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<div className="password-input">
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<button
							type="button"
							className="toggle-password"
							onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? "Hide" : "Show"}
						</button>
					</div>
				</div>
				<button type="submit" className="login-button" disabled={loading}>
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
			<p className="signup-link">
				Don't have an account? <a href="/signup">Sign up</a>
			</p>
		</div>
	)
}

export default Login
