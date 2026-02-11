// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyDS6GpjjaHOfooH6d5SgPQ8PNSReRWc8pI",
  authDomain: "mi-impulso-web.firebaseapp.com",
  projectId: "mi-impulso-web"
};

/* INIT ÚNICO */
const app = initializeApp(firebaseConfig);

/* SERVICIOS */
export const auth = getAuth(app);
export const db = getFirestore(app);
