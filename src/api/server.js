require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Hospital Schema
const hospitalSchema = new mongoose.Schema({
  place_id: String,
  name: String,
  address: String,
  phone: String,
  estTimePerPatient: Number,
  queuedPatients: Number,
  latitude: Number,
  longitude: Number,
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

// API: Get Hospital Info by place_id
app.get("/api/getHospitalInfo", async (req, res) => {
  const { place_id } = req.query;

  if (!place_id) {
    return res.status(400).json({ message: "Missing place_id parameter" });
  }

  try {
    // Check MongoDB first
    let hospital = await Hospital.findOne({ place_id });

    if (!hospital) {
      console.log("Fetching from Google Places API...");

      // Fetch from Google Places API
      const googleApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
      
      const response = await axios.get(googleApiUrl);
      const data = response.data.result;

      if (!data) {
        return res.status(404).json({ message: "Hospital not found in Google Places" });
      }

      // Create hospital object from Google data
      hospital = new Hospital({
        place_id: String,
        name: String,
        location: { lat: Number, lng: Number },
        queued_patients: Number,
        avg_wait_time: Number,
      });

      // Save to MongoDB
      await hospital.save();
    }

    // Calculate estimated wait time
    const hospitalData = {
      ...hospital.toObject(),
      estimatedTime: hospital.estTimePerPatient * hospital.queuedPatients,
    };

    res.json(hospitalData);
  } catch (err) {
    console.error("Error fetching hospital info:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
