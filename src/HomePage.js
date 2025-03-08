import "./App.css"
import { useEffect, useState } from "react"
import {
	GoogleMap,
	Marker,
	InfoWindow,
	useJsApiLoader,
} from "@react-google-maps/api"
import HospitalPreview from "./Components/HospitalPreview"

const containerStyle = {
	width: "85vw",
	height: "85vh",
}

function HomePage() {
	const [map, setMap] = useState(null)
	const [currentPosition, setCurrentPosition] = useState(null)
	const [hospitals, setHospitals] = useState([])
	const [selectedHospital, setSelectedHospital] = useState(null)
	const [hasSearched, setHasSearched] = useState(false)

	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyAELYPulYaAk7gYh_yM-Gzf2Zr_s7hYhAE",
		libraries: ["places"],
	})

	// Get the user's current location

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					}
					console.log(pos)
					setCurrentPosition(pos)
				},
				(error) => console.error("Error fetching geolocation:", error)
			)
		} else {
			console.error("Geolocation is not supported by this browser.")
		}
	}, [])

	const onMapLoad = (mapInstance) => {
		setMap(mapInstance)
	}

	useEffect(() => {
		if (currentPosition && map && !hasSearched && window.google) {
			setHasSearched(true)
			// Convert the currentPosition to a google.maps.LatLng object
			const latLng = new window.google.maps.LatLng(
				currentPosition.lat,
				currentPosition.lng
			)

			const service = new window.google.maps.places.PlacesService(map)
			const request = {
				location: latLng,
				radius: 30000, // Search within 5 km
				types: ["hospital"], //keyword:'hospitals',.
				openNow: true,
				keyword: "emergency",
			}
			service.nearbySearch(request, (results, curstatus) => {
				if (
					curstatus === window.google.maps.places.PlacesServiceStatus.OK &&
					results
				) {
					//const hospitalsData= {...place};
					results.forEach((place) => {
						setHospitals((prev) => [...prev, place])
					})
					calculateDistances(currentPosition, results)
					const bounds = new window.google.maps.LatLngBounds()
					bounds.extend(latLng)
					results.forEach((hospital) => {
						bounds.extend(hospital.geometry.location)
					})

					// Adjust map view to fit all hospitals
					map.fitBounds(bounds)

					// setHospitals(results);
					console.log(results)
				} else {
					console.error(" hospitals Not found", curstatus)
				}
			})
		}
	}, [currentPosition, map])

	const calculateDistances = (origin, hospitals) => {
		const service = new window.google.maps.DistanceMatrixService()
		const destinations = hospitals.map((hospital) => hospital.geometry.location)

		service.getDistanceMatrix(
			{
				origins: [origin],
				destinations: destinations,
				travelMode: window.google.maps.TravelMode.DRIVING,
			},
			(response, status) => {
				if (status === "OK") {
					const updatedHospitals = hospitals.map((hospital, index) => ({
						...hospital,
						distance: response.rows[0].elements[index].distance.text, // Distance in km/miles
					}))
					setHospitals(updatedHospitals)
				}
			}
		)
	}

	if (loadError) return <div>Error loading maps</div>
	if (!isLoaded || !currentPosition) return <div>Loading Map...</div>

	return (
		<div style={{ display: "flex" }}>
			{/* Sidebar for Hospital List */}
			<div
				style={{
					width: "30%",
					height: "100vh",
					overflowY: "scroll",
					padding: "10px",
					borderRight: "1px solid #ddd",
				}}>
				<h3 className="nhHeading">Nearby Hospitals</h3>
				<HospitalPreview
					hospitals={hospitals}
					onHospitalClick={(hospital) => setSelectedHospital(hospital)}
				/>
			</div>

			<GoogleMap
				mapContainerStyle={containerStyle}
				center={currentPosition}
				zoom={10}
				onLoad={onMapLoad}>
				{/* User's location marker */}
				<Marker position={currentPosition} label="You" />

				{/* Markers for each hospital */}
				{hospitals.map((hospital, index) => (
					<Marker
						key={index}
						position={{
							lat: hospital.geometry.location.lat(),
							lng: hospital.geometry.location.lng(),
						}}
						onClick={() => setSelectedHospital(hospital)}
					/>
				))}

				{/* InfoWindow that displays when a hospital marker is clicked */}
				{selectedHospital && (
					<InfoWindow
						position={{
							lat: selectedHospital.geometry.location.lat(),
							lng: selectedHospital.geometry.location.lng(),
						}}
						onCloseClick={() => setSelectedHospital(null)}>
						<div style={{ color: "black" }}>
							<h3>{selectedHospital.name}</h3>
							{selectedHospital.extraInfo ? (
								<div>
									<p>
										Estimated Wait Time:{" "}
										{selectedHospital.extraInfo.estimated_time} minutes
									</p>
									<p>
										Queued Patients:{" "}
										{selectedHospital.extraInfo.queued_patients}
									</p>
									<p>
										Time per Patient:{" "}
										{selectedHospital.extraInfo.time_per_patient} minutes
									</p>
								</div>
							) : (
								<p>No extra info available</p>
							)}
							<button>Pre-Checkin</button>
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	)
}

export default HomePage
