import React from "react";
import GoogleMapComponent from "./GoogleMapComponent";

const HomePage = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "20px" }}>Find Nearby Hospitals</h1>
      <GoogleMapComponent/>
    </div>
  );
};

export default HomePage;
