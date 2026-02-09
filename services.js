import { db } from "./app.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const listaServicios = document.getElementById("servicios");

if (listaServicios) {
  const q = query(collection(db, "services"), orderBy("fecha", "desc"));

  onSnapshot(q, (snap) => {
    listaServicios.innerHTML = "";

    snap.forEach(doc => {
      const s = doc.data();
      const li = document.createElement("li");

      li.innerHTML = `
        <b>${s.titulo}</b><br>
        ${s.descripcion}<br>
        <small>${s.proveedor}</small>
      `;

      listaServicios.appendChild(li);
    });
  });
}