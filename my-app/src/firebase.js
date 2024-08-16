import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD81l18V2x8VB-r1qlJDPFNYOgdImm10nE",
  authDomain: "pibicfernando.firebaseapp.com",
  projectId: "pibicfernando",
  storageBucket: "pibicfernando.appspot.com",
  messagingSenderId: "479829929436",
  appId: "1:479829929436:web:a9257f620c67ef599d3319",
  measurementId: "G-JCBY893KYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const realtimeDB = getDatabase(app);

export { realtimeDB };
