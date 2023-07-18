// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJdZ4VPEUjF-vgJ_uhrIFwk7Kc_XNk-1o",
  authDomain: "ecommerceshop-43692.firebaseapp.com",
  projectId: "ecommerceshop-43692",
  storageBucket: "ecommerceshop-43692.appspot.com",
  messagingSenderId: "925337700728",
  appId: "1:925337700728:web:f38f6c77b6bde0e7a9e08d"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)
export default app