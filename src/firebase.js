import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB-6f7oRSS0EjaHsOUFfBcNCHpBdb8GMlI",
  authDomain: "evaguillen2025.firebaseapp.com",
  projectId: "evaguillen2025",
  storageBucket: "evaguillen2025.firebasestorage.app",
  messagingSenderId: "554792854129",
  appId: "1:554792854129:web:1ec6c0249dba4c9ef3b1d0"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)