import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const db = getFirestore(getApp());

const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

const lista = document.getElementById("mensajes");
const input = document.getElementById("msg");
const btn = document.getElementById("enviar");

const ref = collection(db, "chats", productId, "messages");
const q = query(ref, orderBy("fecha"));

onSnapshot(q, snap => {
  lista.innerHTML = "";
  snap.forEach(doc => {
    const d = doc.data();
    const li = document.createElement("li");
    li.textContent = `${d.user}: ${d.texto}`;
    lista.appendChild(li);
  });
});

btn.onclick = async () => {
  if (!window.usuario) return alert("Inicia sesión");

  await addDoc(ref, {
    texto: input.value,
    user: window.usuario.displayName,
    uid: window.usuario.uid,
    fecha: new Date()
  });

  input.value = "";
};
