import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { auth } from "./firebase.js";

/* PROVIDER */
const provider = new GoogleAuthProvider();

/* UI */
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");

/* LOGIN */
btnLogin?.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    console.error("Error login:", e);
    alert("No se pudo iniciar sesión");
  }
});

/* LOGOUT */
btnLogout?.addEventListener("click", async () => {
  await signOut(auth);
});

/* SESSION */
onAuthStateChanged(auth, (user) => {
  window.usuario = user || null;

  if (btnLogin && btnLogout) {
    btnLogin.style.display = user ? "none" : "inline-block";
    btnLogout.style.display = user ? "inline-block" : "none";
  }
});


