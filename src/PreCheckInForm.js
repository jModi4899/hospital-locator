import React, { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Check-in successful!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", fontFamily: "Arial, sans-serif", backgroundColor: "#f0f8ff" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#003366" }}>NEW PATIENT PRE-REGISTRATION FORM</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Patient Demographics */}
        <h3 style={{ color: "#003366" }}>Patient Information</h3>
        <table style={{ width: "100%", marginBottom: "20px", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td><label style={{ color: "#003366" }}>First & Last Name:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} required />
              </span></td>
            </tr>
            <tr>
              <td><label style={{ color: "#003366" }}>Health Card Number:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="number" name="healthcardnumber" value={formData.healthcardnumber} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} required />
              </span></td>
            </tr>
            <tr>
              <td><label style={{ color: "#003366" }}>Date of Birth:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} required />
              </span></td>
            </tr>
            <tr>
              <td><label style={{ color: "#003366" }}>Address:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%"}}>
                <input type="text" name="address" value={formData.address} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} required />
              </span></td>
            </tr>
            <tr>
              <td><label style={{ color: "#003366" }}>City:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="text" name="city" value={formData.city} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} required />
              </span></td>
              </tr><tr>
              <td><label style={{ color: "#003366" }}>State:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="text" name="state" value={formData.state} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} required />
              </span></td>
            </tr>
            <tr>
              <td><label style={{ color: "#003366" }}>Postal Code:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} required />
              </span></td>
            </tr>
            <tr>
              <td><label style={{ color: "#003366" }}>Home Phone:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="tel" name="homePhone" value={formData.homePhone} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} required />
              </span></td>
              </tr>
              <tr>
              <td><label style={{ color: "#003366" }}>Cell Phone:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="tel" name="cellPhone" value={formData.cellPhone} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} required />
              </span></td>
            </tr>
            <tr>
              <td><label style={{ color: "#003366" }}>Email:</label></td>
              <td colSpan="3"><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} required />
              </span></td>
            </tr>
            <tr>
              <td><label style={{ color: "#003366" }}>How did you hear about us?</label></td>
              <td colSpan="3"><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="text" name="referralSource" value={formData.referralSource} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} />
              </span></td>
            </tr>
          </tbody>
        </table>

        {/* Emergency Contact */}
        <h3 style={{ color: "#003366" }}>Emergency Contact</h3>
        <table style={{ width: "100%", marginBottom: "20px", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td><label style={{ color: "#003366" }}>Contact Name:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="text" name="emergencyContact1Name" value={formData.emergencyContact1} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} required />
              </span></td>
              <td><label style={{ color: "#003366" }}>Phone:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="tel" name="emergencyContact1Phone" value={formData.emergencyContact1Phone} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} required />
              </span></td>
              <td><label style={{ color: "#003366" }}>Relationship:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="text" name="emergencyContact1Relation" value={formData.emergencyContact1Relation} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} required />
              </span></td>
            </tr>
            <tr>
              <td><label style={{ color: "#003366" }}>Contact Name:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="text" name="emergencyContact2Name" value={formData.emergencyContact2} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} />
              </span></td>
              <td><label style={{ color: "#003366" }}>Phone:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="tel" name="emergencyContact2Phone" value={formData.emergencyContact2Phone} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} />
              </span></td>
              <td><label style={{ color: "#003366" }}>Relationship:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="text" name="emergencyContact2Relation" value={formData.emergencyContact2Relation} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} />
              </span></td>
            </tr>
          </tbody>
        </table>

        {/* Primary Insurance */}
        <h3 style={{ color: "#003366" }}>Personal Insurance</h3>
        <table style={{ width: "100%", marginBottom: "20px", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td><label style={{ color: "#003366" }}>Insurance Company Name:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="text" name="primaryInsuranceName" value={formData.primaryInsuranceName} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} />
              </span></td>
              <td><label style={{ color: "#003366" }}>Date of Birth:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="date" name="primaryInsuranceDOB" value={formData.primaryInsuranceDOB} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} />
              </span></td>
            </tr>
            <tr>
              <td><label style={{ color: "#003366" }}>Insurance Number:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="text" name="primaryInsuranceSSN" value={formData.primaryInsuranceSSN} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} />
              </span></td>
            </tr>
          </tbody>
        </table>

        {/* Secondary Insurance */}
        <h3 style={{ color: "#003366" }}>Group Insurance(Optional)</h3>
        <table style={{ width: "100%", marginBottom: "20px", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td><label style={{ color: "#003366" }}>Subscriber Name:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="text" name="secondaryInsuranceName" value={formData.secondaryInsuranceName} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} />
              </span></td>
              <td><label style={{ color: "#003366" }}>Date of Birth:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="date" name="secondaryInsuranceDOB" value={formData.secondaryInsuranceDOB} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} />
              </span></td>
            </tr>
            <tr>
              <td><label style={{ color: "#003366" }}>SSN:</label></td>
              <td><span style={{ borderBottom: "1px solid #003366", padding: "5px", display: "inline-block", width: "100%" }}>
                <input type="text" name="secondaryInsuranceSSN" value={formData.secondaryInsuranceSSN} onChange={handleChange} style={{ backgroundColor: "transparent", border: "none", width: "100%" }} />
              </span></td>
            </tr>
          </tbody>
        </table>

        {/* Disclaimer */}
        <h3 style={{ color: "#003366" }}>Disclaimer</h3>
        <p style={{ color: "#003366" }}>
          I authorize the hospital to submit claims to my insurance carrier and release any necessary medical information.
        </p>
        <div>
          <input 
          type="checkbox"
          name="agreement"
          checked={formData.agreement}
          onChange={handleChange}
          style={{marginRight: "10px"}}
          />
          <label style={{color:"#003366"}}> I agree to the terms and conditions</label>
        </div>

        {/* Submit Button */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button type="submit" style={{ backgroundColor: "#003366", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default PreCheckInForm;