import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgPFfwZwjuVFa6kABTCvlvIufUHAhuSUY",
  authDomain: "netflix-71e26.firebaseapp.com",
  projectId: "netflix-71e26",
  storageBucket: "netflix-71e26.appspot.com",
  messagingSenderId: "222618845824",
  appId: "1:222618845824:web:6710fccb9693bd516f1c65",
  measurementId: "G-C1X25DHSEC",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
