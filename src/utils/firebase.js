// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCWFTDFej3Luo3N3siniBCqqzYyR_fQr6U",
  authDomain: "netflix-gpt-917eb.firebaseapp.com",
  projectId: "netflix-gpt-917eb",
  storageBucket: "netflix-gpt-917eb.appspot.com",
  messagingSenderId: "431528776262",
  appId: "1:431528776262:web:5e9dec84440c71d9707047",
  measurementId: "G-47VEP292T6"
};

// const firebaseConfig =  {
//   apiKey: "<api-key>",
//   authDomain: "<the-domain-that-serves-your-app>",
//   databaseURL: "<database-url>",
//   projectId: "<project-id>",
//   appId: "<app-id>"
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();