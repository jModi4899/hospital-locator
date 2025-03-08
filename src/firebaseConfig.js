import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore for storing user info

const firebaseConfig = {
  apiKey: "AIzaSyChYTcy5S9-gR2EVwS_ict8CRw6xKPA4X0",
  authDomain: "hospital-locator-50806.firebaseapp.com",
  projectId: "hospital-locator-50806",
  storageBucket: "hospital-locator-50806.appspot.com",
  messagingSenderId: "987126164686",
  appId: "1:987126164686:web:7eda814fbe6af52d5db49f",
  measurementId: "G-ZLFD93YFQT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // ✅ Export Firestore database

export default app;