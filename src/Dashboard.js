import React, { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserInfo(userSnap.data());
      } else {
        navigate("/health-form"); // Redirect if health data is missing
      }
    };

    checkUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Dashboard</h2>
      {userInfo ? (
        <>
          <p><strong>Full Name:</strong> {userInfo.fullName}</p>
          <p><strong>Age:</strong> {userInfo.age}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Health Issue:</strong> {userInfo.healthIssue}</p>
          <p><strong>Health Card Number:</strong> {userInfo.healthCardNumber}</p>
          <p><strong>Previous Medical History:</strong> {userInfo.previousMedicalHistory || "None"}</p>
          <p><strong>Previous Injuries:</strong> {userInfo.previousInjuries || "None"}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleLogout} style={{ backgroundColor: "red", color: "white" }}>Logout</button>
    </div>
  );
};

export default Dashboard;