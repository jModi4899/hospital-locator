import React, { useState } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const HealthForm = () => {
  const [healthData, setHealthData] = useState({
    fullName: "",
    age: "",
    healthIssue: "",
    healthCardNumber: "",
    previousMedicalHistory: "",
    previousInjuries: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ✅ Input Change Handler
  const handleChange = (e) => {
    setHealthData({ ...healthData, [e.target.name]: e.target.value });
  };

  // ✅ Validation Function
  const validateForm = () => {
    let newErrors = {};
    
    if (!healthData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }
    if (!healthData.age || isNaN(healthData.age) || healthData.age <= 0) {
      newErrors.age = "Valid age is required.";
    }
    if (!healthData.healthIssue.trim()) {
      newErrors.healthIssue = "Health Issue is required.";
    }
    if (!healthData.healthCardNumber.trim() || healthData.healthCardNumber.length < 6) {
      newErrors.healthCardNumber = "Health Card Number must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ If no errors, return true
  };

  // ✅ Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    const user = auth.currentUser;
    if (!user) {
      alert("Error: User not authenticated.");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email || "N/A",
        fullName: healthData.fullName,
        age: healthData.age,
        healthIssue: healthData.healthIssue,
        healthCardNumber: healthData.healthCardNumber,
        previousMedicalHistory: healthData.previousMedicalHistory,
        previousInjuries: healthData.previousInjuries,
      });

      alert("✅ Health Info Saved Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Firestore Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Complete Your Health Info</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={healthData.fullName}
          onChange={handleChange}
        />
        <br />
        {errors.fullName && <p style={{ color: "red" }}>{errors.fullName}</p>}

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={healthData.age}
          onChange={handleChange}
        />
        <br />
        {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}

        <input
          type="text"
          name="healthIssue"
          placeholder="Current Health Issue"
          value={healthData.healthIssue}
          onChange={handleChange}
        />
        <br />
        {errors.healthIssue && <p style={{ color: "red" }}>{errors.healthIssue}</p>}

        <input
          type="text"
          name="healthCardNumber"
          placeholder="Health Card Number"
          value={healthData.healthCardNumber}
          onChange={handleChange}
        />
        <br />
        {errors.healthCardNumber && <p style={{ color: "red" }}>{errors.healthCardNumber}</p>}

        <textarea
          name="previousMedicalHistory"
          placeholder="Previous Medical History (optional)"
          value={healthData.previousMedicalHistory}
          onChange={handleChange}
        />
        <br />

        <textarea
          name="previousInjuries"
          placeholder="Previous Injuries (optional)"
          value={healthData.previousInjuries}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HealthForm;