import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChYTcy5S9-gR2EVwS_ict8CRw6xKPA4X0",
  authDomain: "hospital-locator-50806.firebaseapp.com",
  projectId: "hospital-locator-50806",
  storageBucket: "hospital-locator-50806.appspot.com", // ✅ Fix `firebasestorage.app` issue
  messagingSenderId: "987126164686",
  appId: "1:987126164686:web:7eda814fbe6af52d5db49f",
  measurementId: "G-ZLFD93YFQT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { auth, db }; // ✅ Export auth & db for authentication and Firestore
export default app;