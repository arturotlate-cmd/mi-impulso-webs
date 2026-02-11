import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.js";

const params = new URLSearchParams(location.search);
const productId = params.get("product");

if (!productId) {
  document.body.innerHTML = "<p>Chat inválido</p>";
} else {
  const ref = collection(db, "chats", productId, "messages");
  const q = query(ref, orderBy("fecha"));

  onSnapshot(q, snap => {
    document.getElementById("mensajes").innerHTML = "";
    snap.forEach(doc => {
      const d = doc.data();
      document.getElementById("mensajes").innerHTML += `
        <li><b>${d.user}:</b> ${d.texto}</li>`;
    });
  });

  document.getElementById("enviar").addEventListener("click", async () => {
    if (!window.usuario) {
      alert("Inicia sesión para enviar");
      return;
    }
    const txt = document.getElementById("msg").value.trim();
    if (!txt) return;
    await addDoc(ref, {
      texto: txt,
      user: window.usuario.displayName,
      uid: window.usuario.uid,
      fecha: new Date()
    });
    document.getElementById("msg").value = "";
  });
}







