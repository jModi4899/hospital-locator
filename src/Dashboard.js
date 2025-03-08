import React, { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Dashboard</h2>
      {user && <p>Welcome, {user.email}!</p>}
      <Logout />
    </div>
  );
};

export default Dashboard;