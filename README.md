# 🏥 Hospital Locator

## 📌 Project Overview

Hospital Locator is a web application that helps users find nearby hospitals, sign up/login with authentication, and manage their health records.

## 🚀 Features

- 🗺️ **Google Maps API Integration** – Shows nearby hospitals.
- 🔐 **User Authentication** – Sign up, login, and logout with Firebase Authentication.
- 🏥 **Health Form** – Users can enter their medical details (name, age, health card number, previous medical history, injuries, etc.).
- 📄 **Dashboard** – Users can view their health details.
- 📦 **MongoDB (Optional)** – Future support for storing user data.

## 🛠️ Technologies Used

- **Frontend:** React.js, Firebase, Google Maps API
- **Backend:** Firebase Firestore (Optional: Express.js + MongoDB)
- **Authentication:** Firebase Authentication
- **Version Control:** Git & GitHub

## 📑 Installation & Setup

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/jModi4899/hospital-locator.git
cd hospital-locator
```

### 2️⃣ **Install Dependencies**

```sh
npm install
```

### 3️⃣ **Set Up Firebase**

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Firestore Database and Authentication.
3. Get Firebase Config from `Project Settings` and update `firebaseConfig.js`:
   ```js
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```

### 4️⃣ **Start the Development Server**

```sh
npm start
```

The app will run at `http://localhost:3000`

## 📌 How to Use

1. **Sign Up/Login** – Create an account or log in.
2. **Fill Health Form** – Enter personal health details.
3. **View Nearby Hospitals** – Hospitals are displayed on the map.
4. **Access Dashboard** – View and manage your health details.
5. **Logout** – Securely log out of the system.

## 🛠️ Contributing

1. **Fork the Repository**
2. **Create a Feature Branch** (`git checkout -b feature-name`)
3. **Commit Your Changes** (`git commit -m "Added new feature"`)
4. **Push to GitHub** (`git push origin feature-name`)
5. **Open a Pull Request**

## 📄 License

This project is open-source and available under the **MIT License**.

---

🚀 **Developed by [Jimit Modi](https://github.com/jModi4899)** – Happy Coding! 🎉
