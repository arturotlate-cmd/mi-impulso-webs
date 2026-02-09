import { auth, db, onUserReady } from "./app.js";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(location.search);
const productId = params.get("id");

const lista = document.getElementById("lista");
const input = document.getElementById("mensaje");
const btn = document.getElementById("btnEnviar");

let usuario = null;

onUserReady((user) => {
  usuario = user;
  input.disabled = !user;
});

// INFO PRODUCTO
const productoRef = doc(db, "products", productId);
const productoSnap = await getDoc(productoRef);

document.getElementById("tituloProducto").textContent = productoSnap.data().titulo;
document.getElementById("descripcionProducto").textContent = productoSnap.data().descripcion;

// ENVIAR
btn.addEventListener("click", async () => {
  if (!usuario) return;

  await addDoc(collection(db, "chats"), {
    productId,
    texto: input.value,
    uid: usuario.uid,
    user: usuario.displayName,
    fecha: serverTimestamp()
  });

  input.value = "";
});

// LEER CHAT
const q = query(
  collection(db, "chats"),
  where("productId", "==", productId),
  orderBy("fecha")
);

onSnapshot(q, snap => {
  lista.innerHTML = "";
  snap.forEach(d => {
    const m = d.data();
    const li = document.createElement("li");
    li.className = m.uid === usuario?.uid ? "mio" : "otro";
    li.textContent = `${m.user}: ${m.texto}`;
    lista.appendChild(li);
  });
});