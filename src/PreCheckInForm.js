import React, { useState } from "react";
import "./PreCheckInForm.css";

function PreCheckInForm() {
  const [formData, setFormData] = useState({
    firstlastName: "",
    healthcardnumber: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    homePhone: "",
    cellPhone: "",
    email: "",
    referralSource: "",
    emergencyContact1Name: "",
    emergencyContact1Phone: "",
    emergencyContact1Relation: "",
    emergencyContact2Name: "",
    emergencyContact2Phone: "",
    emergencyContact2Relation: "",
    personalInsuranceName: "",
    personalInsuranceDOB: "",
    personalInsuranceSSN: "",
    personalInsuranceEmployer: "",
    groupInsuranceName: "",
    groupInsuranceDOB: "",
    groupInsuranceSSN: "",
    groupInsuranceEmployer: "",
    agreement: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstlastName) newErrors.firstlastName = "Name is required";
    if (!formData.healthcardnumber) newErrors.healthcardnumber = "Health card number is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.agreement) newErrors.agreement = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Form Data Submitted:", formData);
      alert("Check-in successful!");
      // Reset form after successful submission
      setFormData({
        ...Object.keys(formData).reduce((acc, key) => {
          acc[key] = typeof formData[key] === "boolean" ? false : "";
          return acc;
        }, {})
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred during submission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pre-checkin-container">
      <div className="form-card">
        <h2 className="form-title">New Patient Pre-Registration</h2>
        
        <form onSubmit={handleSubmit}>
          <section className="form-section">
            <h3>Patient Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>First & Last Name</label>
                <input
                  type="text"
                  name="firstlastName"
                  value={formData.firstlastName}
                  onChange={handleChange}
                  className={errors.firstlastName ? "error" : ""}
                />
                {errors.firstlastName && <span className="error-message">{errors.firstlastName}</span>}
              </div>

              <div className="form-group">
                <label>Health Card Number</label>
                <input
                  type="text"
                  name="healthcardnumber"
                  value={formData.healthcardnumber}
                  onChange={handleChange}
                  className={errors.healthcardnumber ? "error" : ""}
                />
                {errors.healthcardnumber && <span className="error-message">{errors.healthcardnumber}</span>}
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={errors.dob ? "error" : ""}
                />
                {errors.dob && <span className="error-message">{errors.dob}</span>}
              </div>

              <div className="form-group full-width">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>State/Province</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Home Phone</label>
                <input
                  type="tel"
                  name="homePhone"
                  value={formData.homePhone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Cell Phone</label>
                <input
                  type="tel"
                  name="cellPhone"
                  value={formData.cellPhone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3>Emergency Contacts</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Primary Contact Name</label>
                <input
                  type="text"
                  name="emergencyContact1Name"
                  value={formData.emergencyContact1Name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="emergencyContact1Phone"
                  value={formData.emergencyContact1Phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Relationship</label>
                <input
                  type="text"
                  name="emergencyContact1Relation"
                  value={formData.emergencyContact1Relation}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Secondary Contact Name</label>
                <input
                  type="text"
                  name="emergencyContact2Name"
                  value={formData.emergencyContact2Name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="emergencyContact2Phone"
                  value={formData.emergencyContact2Phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Relationship</label>
                <input
                  type="text"
                  name="emergencyContact2Relation"
                  value={formData.emergencyContact2Relation}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3>Insurance Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Insurance Company Name</label>
                <input
                  type="text"
                  name="personalInsuranceName"
                  value={formData.personalInsuranceName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Insurance Number</label>
                <input
                  type="text"
                  name="personalInsuranceSSN"
                  value={formData.personalInsuranceSSN}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="personalInsuranceDOB"
                  value={formData.personalInsuranceDOB}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3>Terms & Conditions</h3>
            <div className="agreement-section">
              <p>
                I authorize the hospital to submit claims to my insurance carrier and release any necessary medical information.
                I understand that I am responsible for any charges not covered by my insurance.
              </p>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                  className={errors.agreement ? "error" : ""}
                />
                <label>I agree to the terms and conditions</label>
                {errors.agreement && <span className="error-message">{errors.agreement}</span>}
              </div>
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PreCheckInForm;