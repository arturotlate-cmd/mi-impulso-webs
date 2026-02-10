import { getFirestore, collection, addDoc, onSnapshot } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const db = getFirestore(getApp());

const btn = document.getElementById("btnPublicarProducto");
const lista = document.getElementById("productos");

btn.onclick = async () => {
  if (!window.usuario) {
    alert("Inicia sesión primero");
    return;
  }

  const titulo = document.getElementById("prodTitulo").value.trim();
  const precio = document.getElementById("prodPrecio").value;
  const descripcion = document.getElementById("prodDescripcion").value.trim();

  if (!titulo || !precio) return;

  await addDoc(collection(db, "products"), {
    titulo,
    precio,
    descripcion,
    uid: window.usuario.uid,
    autor: window.usuario.displayName,
    fecha: new Date()
  });

  document.getElementById("prodTitulo").value = "";
  document.getElementById("prodPrecio").value = "";
  document.getElementById("prodDescripcion").value = "";
};

/* LISTAR PRODUCTOS */
onSnapshot(collection(db, "products"), (snap) => {
  lista.innerHTML = "";
  snap.forEach(doc => {
    const p = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${p.titulo}</strong><br>
      $${p.precio}<br>
      <small>${p.autor}</small>
    `;
    lista.appendChild(li);
  });
});
