import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.js";
import { initMarketplace } from "./marketplace.js";

initMarketplace({
  btnId: "btnPublicar",
  listId: "productos",
  fields: [
    { id: "prodTitulo", key: "titulo", label: "Título" },
    { id: "prodPrecio", key: "precio", label: "Precio" },
    { id: "prodDescripcion", key: "descripcion", label: "Descripción" }
  ],
  addDocFn: (data) => addDoc(collection(db, "productos"), data),
  onSnapshotFn: (list) => {
    const q = query(collection(db, "productos"), orderBy("fecha", "desc"));
    onSnapshot(q, (snap) => {
      list.innerHTML = "";
      snap.forEach(doc => {
        const d = doc.data();
        list.innerHTML += `
          <li class="product-item">
            <a class="product-link" href="product.html?id=${doc.id}">
              ${d.titulo} — $${d.precio}
            </a>
          </li>`;
      });
    });
  }
});










