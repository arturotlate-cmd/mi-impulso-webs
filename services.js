import { auth, db, onUserReady } from "./app.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let usuario = null;
onUserReady(u => usuario = u);

document.getElementById("btnServicio")?.addEventListener("click", async () => {
  if (!usuario) return alert("Inicia sesión");

  await addDoc(collection(db, "services"), {
    titulo: tituloServicio.value,
    descripcion: descripcionServicio.value,
    precio: precioServicio.value,
    proveedor: usuario.displayName,
    uid: usuario.uid,
    disponible: true,
    fecha: serverTimestamp()
  });

  alert("Servicio publicado");
});
