import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBMcGQz03hgQSN4lcAAPauURFv_WgN1IUk",
  authDomain: "fir-test-6babe.firebaseapp.com",
  projectId: "fir-test-6babe",
  storageBucket: "fir-test-6babe.appspot.com",
  messagingSenderId: "1079578348225",
  appId: "1:1079578348225:web:67de79888bb668b6212240"
};

const fire = initializeApp(firebaseConfig);

export default fire;

export const db = getFirestore();