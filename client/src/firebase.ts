import { FirebaseApp, getApp, getApps, initializeApp, } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let app: FirebaseApp;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_ID
};
export function initialize() {
  // Initialize Firebase
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getDatabase() {
  const db = getFirestore(app);
  return db;
}