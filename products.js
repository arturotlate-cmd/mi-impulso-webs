import { auth, db, onUserReady } from "./app.js";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const lista = document.getElementById("productos");
const btnPublicar = document.getElementById("btnPublicar");

let usuario = null;

onUserReady((user) => {
  usuario = user;
});

// PUBLICAR PRODUCTO
btnPublicar?.addEventListener("click", async () => {
  if (!usuario) return alert("Inicia sesión");

  const titulo = document.getElementById("titulo").value;
  const precio = document.getElementById("precio").value;
  const descripcion = document.getElementById("descripcion").value;

  await addDoc(collection(db, "products"), {
    titulo,
    precio,
    descripcion,
    uid: usuario.uid,
    vendedor: usuario.displayName,
    fecha: serverTimestamp()
  });

  alert("Producto publicado");
});

// LISTAR PRODUCTOS
const q = query(collection(db, "products"), orderBy("fecha", "desc"));

onSnapshot(q, (snap) => {
  lista.innerHTML = "";

  snap.forEach(doc => {
    const p = doc.data();
    const li = document.createElement("li");

    li.innerHTML = `
      <b>${p.titulo}</b><br>
      $${p.precio}<br>
      <small>${p.vendedor}</small><br>
      <a href="producto.html?id=${doc.id}">Ver producto</a>
    `;

    lista.appendChild(li);
  });
});