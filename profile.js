import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const db = getFirestore(getApp());

const params = new URLSearchParams(window.location.search);
const uid = params.get("uid");

const nombre = document.getElementById("nombre");
const lista = document.getElementById("lista");

if (!uid) {
  nombre.textContent = "Usuario no encontrado";
} else {
  const q = query(
    collection(db, "productos"),
    where("uid", "==", uid)
  );

  onSnapshot(q, (snap) => {
    lista.innerHTML = "";
    snap.forEach(doc => {
      const d = doc.data();
      nombre.textContent = d.user;
      const li = document.createElement("li");
      li.innerHTML = `<b>${d.titulo}</b> — $${d.precio}`;
      lista.appendChild(li);
    });
  });
