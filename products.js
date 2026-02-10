import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const db = getFirestore(getApp());

const btn = document.getElementById("btnPublicarProducto");
const lista = document.getElementById("productos");

if (!btn || !lista) {
  console.warn("Productos: elementos HTML no encontrados");
} else {

  // PUBLICAR PRODUCTO
  btn.onclick = async () => {
    if (!window.usuario) {
      alert("Inicia sesión");
      return;
    }

    const titulo = document.getElementById("prodTitulo")?.value;
    const precio = document.getElementById("prodPrecio")?.value;
    const descripcion = document.getElementById("prodDescripcion")?.value || "";

    if (!titulo || !precio) {
      alert("Faltan datos");
      return;
    }

    try {
      await addDoc(collection(db, "productos"), {
        titulo,
        precio,
        descripcion,
        uid: window.usuario.uid,
        user: window.usuario.displayName,
        fecha: new Date()
      });

      alert("Producto publicado ✅");
    } catch (e) {
      console.error("Error al publicar:", e);
      alert("No se pudo publicar ❌");
    }
  };

  // LISTAR PRODUCTOS
  const productosRef = collection(db, "productos");

  onSnapshot(productosRef, (snap) => {
    lista.innerHTML = "";

    snap.forEach(doc => {
      const d = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `<b>${d.titulo}</b> — $${d.precio}`;
      lista.appendChild(li);
    });
  });
}





