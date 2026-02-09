import { auth, db, onUserReady } from "./app.js";
import { collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const lista = document.getElementById("misProductos");

onUserReady((user) => {
  document.getElementById("nombre").textContent = user.displayName;
  document.getElementById("email").textContent = user.email;

  const q = query(collection(db, "products"), where("uid", "==", user.uid));

  onSnapshot(q, snap => {
    lista.innerHTML = "";
    snap.forEach(d => {
      const li = document.createElement("li");
      li.textContent = d.data().titulo;
      lista.appendChild(li);
    });
  });
});