import { FirebaseApp, getApp, getApps, initializeApp, } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { ref, onUnmounted } from 'vue';
import { collection } from "firebase/firestore"
import { query, orderBy, limit } from "firebase/firestore";  

let app: FirebaseApp;
import { onSnapshot } from "firebase/firestore";


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



export  function useChat() {
  const firestore = getDatabase()
const chats:any = ref([]);
const q = query(collection(firestore, "chats"), orderBy("createdAt","desc"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  chats.value = [];
  querySnapshot.forEach((doc) => {
      chats.value.push({ id: doc.id, ...doc.data() });
  });
  console.log("Current cities in CA: ", chats.value);
});
onUnmounted(unsubscribe)
console.log("Whhatt ius gpig on l ", chats.value);
  const createChat = text => {
    // if (!isLogin.value) return
    // const { photoURL, uid, displayName } = user.value
    // messagesCollection.add({
    //   userName: displayName,
    //   userId: uid,
    //   userPhotoURL: photoURL,
    //   text: filter.clean(text),
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp()
    // })
  }


  return { chats, createChat }
}

export  function useMessage(chatId) {
 
  const firestore = getDatabase()
// const messagesCollection = firestore.collection('messages')
// const messagesQuery = await (await (getDocs(query(collection(firestore, "chats"), orderBy("createdAt","desc"))))).forEach((doc:any) => ({ id: doc.id, ...doc.data() }));
const messages:any = ref([]);
if(chatId){
const q = query(collection(firestore, "chats", chatId, "messages"), orderBy("createdAt","desc"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  messages.value = [];
  querySnapshot.forEach((doc) => {
    messages.value.push({ id: doc.id, ...doc.data() });
  });
  console.log("The messagesssssssssssssssss: ", messages.value);
});
onUnmounted(unsubscribe)
}
console.log("Whhatt ius gpig on l ", messages.value);
  const sendMessage = text => {
    // if (!isLogin.value) return
    // const { photoURL, uid, displayName } = user.value
    // messagesCollection.add({
    //   userName: displayName,
    //   userId: uid,
    //   userPhotoURL: photoURL,
    //   text: filter.clean(text),
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp()
    // })
  }


  return { messages, sendMessage }

}