// import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// const mapContainerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const defaultCenter = { lat: 40.749933, lng: -73.98633 }; // Default to New York

// const GoogleMapComponent = () => {
//   const [location, setLocation] = useState(defaultCenter);
//   const [hospitals, setHospitals] = useState([]);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//           fetchNearbyHospitals(position.coords.latitude, position.coords.longitude);
//         },
//         () => {
//           console.log("Geolocation permission denied. Using default location.");
//           fetchNearbyHospitals(defaultCenter.lat, defaultCenter.lng);
//         }
//       );
//     } else {
//       console.log("Geolocation is not supported. Using default location.");
//       fetchNearbyHospitals(defaultCenter.lat, defaultCenter.lng);
//     }
//   }, []);

//   const fetchNearbyHospitals = (lat, lng) => {
//     const service = new window.google.maps.places.PlacesService(document.createElement("div"));

//     const request = {
//       location: new window.google.maps.LatLng(lat, lng),
//       radius: 5000,
//       type: "hospital",
//     };

//     service.nearbySearch(request, (results, status) => {
//       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//         setHospitals(results);
//       } else {
//         console.error("Google Places API request failed:", status);
//       }
//     });
//   };

//   return (
//     <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
//       <h2 style={{ textAlign: "center" }}>Nearby Hospitals</h2>

//       <GoogleMap mapContainerStyle={mapContainerStyle} center={location} zoom={13}>
//         {hospitals.map((hospital, index) => (
//           <Marker key={index} position={hospital.geometry.location} title={hospital.name} />
//         ))}
//       </GoogleMap>

//       <div style={{ padding: "20px" }}>
//         <h3>Hospital List:</h3>
//         <ul>
//           {hospitals.map((hospital, index) => (
//             <li key={index}>
//               <strong>{hospital.name}</strong> - {hospital.vicinity}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </LoadScript>
//   );
// };

// export default GoogleMapComponent;
