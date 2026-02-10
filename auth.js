import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* CONFIG FIREBASE */
const firebaseConfig = {
  apiKey: "AIzaSyDS6GpjjaHOfooH6d5SgPQ8PNSReRWc8pI",
  authDomain: "mi-impulso-web.firebaseapp.com",
  projectId: "mi-impulso-web"
};

/* INIT */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* UI */
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");

/* LOGIN */
btnLogin.onclick = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    console.error("Error login:", e);
  }
};

/* LOGOUT */
btnLogout.onclick = async () => {
  await signOut(auth);
};

/* SESSION */
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.usuario = user;
    btnLogin.style.display = "none";
    btnLogout.style.display = "inline-block";
    console.log("Sesión activa:", user.displayName);
  } else {
    window.usuario = null;
    btnLogin.style.display = "inline-block";
    btnLogout.style.display = "none";
    console.log("Sin sesión");
  }
});
