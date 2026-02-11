import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./firebase.js";

const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");

const provider = new GoogleAuthProvider();

btnLogin?.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch {
    alert("Error al iniciar sesión");
  }
});

btnLogout?.addEventListener("click", async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, (user) => {
  window.usuario = user;
  if (btnLogin && btnLogout) {
    btnLogin.style.display = user ? "none" : "inline-block";
    btnLogout.style.display = user ? "inline-block" : "none";
  }
});




