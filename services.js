import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const db = getFirestore(getApp());

const btn = document.getElementById("btnPublicarServicio");
const lista = document.getElementById("servicios");

if (btn && lista) {
  btn.onclick = async () => {
    if (!window.usuario) {
      alert("Inicia sesión");
      return;
    }

    const titulo = document.getElementById("servTitulo").value;
    const precio = document.getElementById("servPrecio").value;
    const descripcion = document.getElementById("servDescripcion").value;

    if (!titulo || !precio) return;

    await addDoc(collection(db, "services"), {
      titulo,
      precio,
      descripcion,
      uid: window.usuario.uid,
      user: window.usuario.displayName,
      fecha: new Date()
    });
  };

  onSnapshot(collection(db, "services"), (snap) => {
    lista.innerHTML = "";
    snap.forEach(doc => {
      const d = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `<b>${d.titulo}</b> — $${d.precio}`;
      lista.appendChild(li);
    });
  });
} else {
  console.warn("Servicios: elementos HTML no encontrados");
}



