// HospitalList.js
import React from "react"
import "../App.css"

const HospitalList = ({ hospitals, onHospitalClick }) => {
	return (
		<ul style={{ listStyleType: "none", padding: 0 }}>
			{hospitals.map((hospital, index) => (
				<li
					className="hList"
					key={index}
					style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
					onClick={() => onHospitalClick(hospital)}>
					<strong>{hospital.name}</strong>
					<p>{hospital.vicinity}</p>
					{hospital.distance && (
						<p>
							<b>Distance:</b> {hospital.distance}
						</p>
					)}
				</li>
			))}
		</ul>
	)
}

export default HospitalList
