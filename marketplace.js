// marketplace.js
import {
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./firebase.js";

/**
 * Inicializa un módulo de marketplace
 * @param {Object} config
 */
export function initMarketplace(config) {
  const {
    collectionName,
    btnId,
    listId,
    fields
  } = config;

  const btn = document.getElementById(btnId);
  const lista = document.getElementById(listId);

  if (!btn || !lista) {
    console.warn(`Marketplace (${collectionName}): elementos no encontrados`);
    return;
  }

  /* PUBLICAR */
  btn.addEventListener("click", async () => {
    if (!window.usuario) {
      alert("Inicia sesión para publicar");
      return;
    }

    const data = {};

    for (const field of fields) {
      const input = document.getElementById(field.id);
      if (!input || !input.value.trim()) {
        alert(`Falta el campo: ${field.label}`);
        return;
      }
      data[field.name] = input.value.trim();
    }

    try {
      await addDoc(collection(db, collectionName), {
        ...data,
        uid: window.usuario.uid,
        user: window.usuario.displayName,
        fecha: new Date()
      });

      alert("Publicado correctamente ✅");
      fields.forEach(f => {
        const el = document.getElementById(f.id);
        if (el) el.value = "";
      });

    } catch (e) {
      console.error(`Error en ${collectionName}:`, e);
      alert("No se pudo publicar ❌");
    }
  });

  /* LISTAR */
  onSnapshot(collection(db, collectionName), (snap) => {
    lista.innerHTML = "";
    snap.forEach(doc => {
      const d = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `<b>${d.titulo}</b> — $${d.precio}`;
      lista.appendChild(li);
    });
  });
}
