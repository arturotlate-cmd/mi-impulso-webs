import { getFirestore, collection, addDoc, onSnapshot } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const db = getFirestore(getApp());

const btn = document.getElementById("btnPublicarServicio");
const lista = document.getElementById("servicios");

btn.onclick = async () => {
  if (!window.usuario) {
    alert("Inicia sesión primero");
    return;
  }

  const titulo = document.getElementById("servTitulo").value.trim();
  const precio = document.getElementById("servPrecio").value;
  const descripcion = document.getElementById("servDescripcion").value.trim();

  if (!titulo || !precio) return;

  await addDoc(collection(db, "services"), {
    titulo,
    precio,
    descripcion,
    uid: window.usuario.uid,
    autor: window.usuario.displayName,
    fecha: new Date()
  });

  document.getElementById("servTitulo").value = "";
  document.getElementById("servPrecio").value = "";
  document.getElementById("servDescripcion").value = "";
};

/* LISTAR SERVICIOS */
onSnapshot(collection(db, "services"), (snap) => {
  lista.innerHTML = "";
  snap.forEach(doc => {
    const s = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${s.titulo}</strong><br>
      $${s.precio}<br>
      <small>${s.autor}</small>
    `;
    lista.appendChild(li);
  });
});

