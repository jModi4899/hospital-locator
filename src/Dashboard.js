import React, { useEffect, useState } from "react"
import { auth, db } from "./firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import "./App.css" // Import the CSS file for styling

const Dashboard = () => {
	const [userInfo, setUserInfo] = useState(null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		const checkUserData = async () => {
			const user = auth.currentUser
			if (!user) {
				navigate("/login")
				return
			}

			const userRef = doc(db, "users", user.uid)
			const userSnap = await getDoc(userRef)

			if (userSnap.exists()) {
				setUserInfo(userSnap.data())
			} else {
				navigate("/health-form") // Redirect if health data is missing
			}
			setLoading(false)
		}

		checkUserData()
	}, [navigate])

	const handleLogout = async () => {
		await auth.signOut()
		navigate("/login")
	}

	if (loading) {
		return (
			<div className="dashboard-container">
				<p>Loading...</p>
			</div>
		)
	}

	return (
		<div className="dashboard-container">
			<h2>Dashboard</h2>
			{userInfo ? (
				<div className="dashboard-info">
					<div className="info-card">
						<h3>Personal Information</h3>
						<p>
							<strong>Full Name:</strong> {userInfo.fullName}
						</p>
						<p>
							<strong>Age:</strong> {userInfo.age}
						</p>
						<p>
							<strong>Email:</strong> {userInfo.email}
						</p>
					</div>

					<div className="info-card">
						<h3>Health Information</h3>
						<p>
							<strong>Health Issue:</strong> {userInfo.healthIssue}
						</p>
						<p>
							<strong>Health Card Number:</strong> {userInfo.healthCardNumber}
						</p>
						<p>
							<strong>Previous Medical History:</strong>{" "}
							{userInfo.previousMedicalHistory || "None"}
						</p>
						<p>
							<strong>Previous Injuries:</strong>{" "}
							{userInfo.previousInjuries || "None"}
						</p>
					</div>
				</div>
			) : (
				<p>No user data found.</p>
			)}
			<button className="logout-button" onClick={handleLogout}>
				Logout
			</button>
		</div>
	)
}

export default Dashboard
