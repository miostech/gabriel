import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkWG-Q9ettoUkLwN_FAJYkL2EDTGd4aHw",
  authDomain: "wedding-site-f9c38.firebaseapp.com",
  projectId: "wedding-site-f9c38",
  storageBucket: "wedding-site-f9c38.appspot.com",
  messagingSenderId: "144948941422",
  appId: "1:144948941422:web:6c71e33f4782193d74cc7f",
  measurementId: "G-XXNR4NR8P9"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
