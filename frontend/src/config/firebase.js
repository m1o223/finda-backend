import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD_QwKWOzhkl64WzZXz3KAyFlwOkQUhFng",
  authDomain: "bluemindai-da4a5.firebaseapp.com",
  projectId: "bluemindai-da4a5",
  storageBucket: "bluemindai-da4a5.firebasestorage.app",
  messagingSenderId: "1088520990126",
  appId: "1:1088520990126:web:6a5e986aabb61e97f4ac3f",
  measurementId: "G-0TT1JXDCBK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const messaging = getMessaging(app);
