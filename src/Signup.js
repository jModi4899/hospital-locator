import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "./firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import "./App.css" // Import the CSS file for styling

const Signup = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()

	const handleSignup = async (e) => {
		e.preventDefault()
		setError(null)

		// Basic form validation
		if (!email || !password) {
			setError("Please fill in all fields.")
			return
		}

		setLoading(true)

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const user = userCredential.user

			// Store user in Firestore with an empty health profile
			await setDoc(doc(db, "users", user.uid), {
				email: user.email,
				healthIssue: "",
				healthCardNumber: "",
			})

			navigate("/health-form") // Redirect to health form
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="login-container">
			<h2>Sign Up</h2>
			{error && <p className="error-message">{error}</p>}
			<form onSubmit={handleSignup} className="login-form">
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
					{loading ? "Signing up..." : "Sign Up"}
				</button>
			</form>
			<p className="signup-link">
				Already have an account? <a href="/login">Login</a>
			</p>
		</div>
	)
}

export default Signup
