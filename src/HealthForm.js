import React, { useState } from "react"
import { auth, db } from "./firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import "./App.css" // Import the CSS file for styling

const HealthForm = () => {
	const [healthData, setHealthData] = useState({
		fullName: "",
		age: "",
		healthIssue: "",
		healthCardNumber: "",
		previousMedicalHistory: "",
		previousInjuries: "",
	})

	const [errors, setErrors] = useState({})
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	// Input Change Handler
	const handleChange = (e) => {
		setHealthData({ ...healthData, [e.target.name]: e.target.value })
	}

	// Validation Function
	const validateForm = () => {
		let newErrors = {}

		if (!healthData.fullName.trim()) {
			newErrors.fullName = "Full Name is required."
		}
		if (!healthData.age || isNaN(healthData.age) || healthData.age <= 0) {
			newErrors.age = "Valid age is required."
		}
		if (!healthData.healthIssue.trim()) {
			newErrors.healthIssue = "Health Issue is required."
		}
		if (
			!healthData.healthCardNumber.trim() ||
			healthData.healthCardNumber.length < 6
		) {
			newErrors.healthCardNumber =
				"Health Card Number must be at least 6 characters."
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0 // If no errors, return true
	}

	// Form Submission
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!validateForm()) return // Stop if validation fails

		const user = auth.currentUser
		if (!user) {
			alert("Error: User not authenticated.")
			return
		}

		setLoading(true)

		try {
			await setDoc(doc(db, "users", user.uid), {
				email: user.email || "N/A",
				fullName: healthData.fullName,
				age: healthData.age,
				healthIssue: healthData.healthIssue,
				healthCardNumber: healthData.healthCardNumber,
				previousMedicalHistory: healthData.previousMedicalHistory,
				previousInjuries: healthData.previousInjuries,
			})

			alert("✅ Health Info Saved Successfully!")
			navigate("/dashboard")
		} catch (error) {
			console.error("❌ Firestore Error:", error)
			setErrors({
				form: "An error occurred while saving your data. Please try again.",
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="login-container">
			<h2>Complete Your Health Info</h2>
			{errors.form && <p className="error-message">{errors.form}</p>}
			<form onSubmit={handleSubmit} className="login-form">
				<div className="form-group">
					<label htmlFor="fullName">Full Name</label>
					<input
						type="text"
						id="fullName"
						name="fullName"
						placeholder="Enter your full name"
						value={healthData.fullName}
						onChange={handleChange}
						required
					/>
					{errors.fullName && (
						<p className="error-message">{errors.fullName}</p>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="age">Age</label>
					<input
						type="number"
						id="age"
						name="age"
						placeholder="Enter your age"
						value={healthData.age}
						onChange={handleChange}
						required
					/>
					{errors.age && <p className="error-message">{errors.age}</p>}
				</div>

				<div className="form-group">
					<label htmlFor="healthIssue">Health Issue</label>
					<input
						type="text"
						id="healthIssue"
						name="healthIssue"
						placeholder="Enter your current health issue"
						value={healthData.healthIssue}
						onChange={handleChange}
						required
					/>
					{errors.healthIssue && (
						<p className="error-message">{errors.healthIssue}</p>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="healthCardNumber">Health Card Number</label>
					<input
						type="text"
						id="healthCardNumber"
						name="healthCardNumber"
						placeholder="Enter your health card number"
						value={healthData.healthCardNumber}
						onChange={handleChange}
						required
					/>
					{errors.healthCardNumber && (
						<p className="error-message">{errors.healthCardNumber}</p>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="previousMedicalHistory">
						Previous Medical History (Optional)
					</label>
					<textarea
						id="previousMedicalHistory"
						name="previousMedicalHistory"
						placeholder="Enter your previous medical history"
						value={healthData.previousMedicalHistory}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="previousInjuries">Previous Injuries (Optional)</label>
					<textarea
						id="previousInjuries"
						name="previousInjuries"
						placeholder="Enter your previous injuries"
						value={healthData.previousInjuries}
						onChange={handleChange}
					/>
				</div>

				<button type="submit" className="login-button" disabled={loading}>
					{loading ? "Submitting..." : "Submit"}
				</button>
			</form>
		</div>
	)
}

export default HealthForm
