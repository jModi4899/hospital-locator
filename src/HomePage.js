import "./App.css"
import { useEffect, useState } from "react"
import {
	GoogleMap,
	Marker,
	InfoWindow,
	useJsApiLoader,
} from "@react-google-maps/api"
import HospitalPreview from "./Components/HospitalPreview" // Import the new component

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
			const latLng = new window.google.maps.LatLng(
				currentPosition.lat,
				currentPosition.lng
			)

			const service = new window.google.maps.places.PlacesService(map)
			const request = {
				location: latLng,
				radius: 10000, // Search within 10 km
				types: ["hospital"],
				openNow: true,
				keyword: "emergency",
			}
			service.nearbySearch(request, (results, curstatus) => {
				if (
					curstatus === window.google.maps.places.PlacesServiceStatus.OK &&
					results
				) {
					results.forEach((place) => {
						if (place.place_id) {
							console.log(place.place_id)
							fetch(
								`http://localhost:5000/api/getHospitalInfo?place_id=${place.place_id}`
							)
								.then((res) => res.json())
								.then((data) => {
									console.log("extradata: " + JSON.stringify(data))
									const hospitalData = {
										...place,
										extraInfo: data.error ? null : data,
									}
									setHospitals((prev) => [...prev, hospitalData])
								})
								.catch((error) => {
									console.error("Error fetching hospital info:", error)
									setHospitals((prev) => [...prev, place])
								})
						}
					})
					calculateDistances(currentPosition, hospitals)
					const bounds = new window.google.maps.LatLngBounds()
					bounds.extend(latLng)
					results.forEach((hospital) => {
						bounds.extend(hospital.geometry.location)
					})
					map.fitBounds(bounds)
					console.log(results)
				} else {
					console.error("NearBy hospitals Not found", curstatus)
				}
			})
		}
	}, [currentPosition, map, hasSearched, hospitals])

	const calculateDistances = (origin, hospitals) => {
		console.log("in the Distance calculation Function")
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
					console.log("updatedHospitals")
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
				<h3>Nearby Hospitals</h3>
				{/* Use the HospitalPreview component */}
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
										{selectedHospital.extraInfo.avg_wait_time} minutes
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
