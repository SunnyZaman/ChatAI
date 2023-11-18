import { FirebaseApp, getApp, getApps, initializeApp, } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { ref, onUnmounted } from 'vue';
import { collection } from "firebase/firestore"
import { query, orderBy } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

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

export function useChat() {
  const firestore = getDatabase()
  const chats: any = ref([]);
  const q = query(collection(firestore, "chats"), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    chats.value = [];
    querySnapshot.forEach((doc) => {
      chats.value.push({ id: doc.id, ...doc.data() });
    });
  });
  onUnmounted(unsubscribe);
  return { chats };
}