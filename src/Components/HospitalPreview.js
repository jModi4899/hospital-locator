// HospitalPreview.js
import React from "react"

const HospitalPreview = ({ hospitals, onHospitalClick }) => {
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
					{hospital.extraInfo ? (
						<div>
							<p>
								Estimated Wait Time: {hospital.extraInfo.avg_wait_time} minutes
							</p>
						</div>
					) : (
						<p>No extra info available</p>
					)}
				</li>
			))}
		</ul>
	)
}

export default HospitalPreview
