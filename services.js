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

if (!btn || !lista) {
  console.warn("Servicios: elementos HTML no encontrados");
} else {

  // PUBLICAR SERVICIO
  btn.onclick = async () => {
    if (!window.usuario) {
      alert("Inicia sesión");
      return;
    }

    const titulo = document.getElementById("servTitulo")?.value;
    const precio = document.getElementById("servPrecio")?.value;
    const descripcion = document.getElementById("servDescripcion")?.value || "";

    if (!titulo || !precio) {
      alert("Faltan datos");
      return;
    }

    try {
      await addDoc(collection(db, "servicios"), {
        titulo,
        precio,
        descripcion,
        uid: window.usuario.uid,
        user: window.usuario.displayName,
        fecha: new Date()
      });

      alert("Servicio publicado ✅");
    } catch (e) {
      console.error("Error al publicar servicio:", e);
      alert("No se pudo publicar ❌");
    }
  };

  // LISTAR SERVICIOS
  const serviciosRef = collection(db, "servicios");

  onSnapshot(serviciosRef, (snap) => {
    lista.innerHTML = "";

    snap.forEach(doc => {
      const d = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `<b>${d.titulo}</b> — $${d.precio}`;
      lista.appendChild(li);
    });
  });







