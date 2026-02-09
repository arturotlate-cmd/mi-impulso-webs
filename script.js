/* ===============================
   FIREBASE IMPORTS
   =============================== */
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
   ESTADO GLOBAL
   =============================== */
const state = {
  products: []
};

/* ===============================
   ELEMENTOS HTML
   =============================== */
const search = document.getElementById("search");
const category = document.getElementById("category");
const productsContainer = document.getElementById("products");

const sellForm = document.getElementById("sellForm");
const pName = document.getElementById("pName");
const pDesc = document.getElementById("pDesc");
const pPrice = document.getElementById("pPrice");
const pCat = document.getElementById("pCat");

/* ===============================
   NAVEGACIÓN DE SECCIONES
   =============================== */
window.showSection = function (id, btn) {
  const sections = ["market", "sell", "about"];

  sections.forEach(s => {
    document.getElementById(s).classList.add("hidden");
  });

  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  document.getElementById(id).classList.remove("hidden");
};

/* ===============================
   CARGAR PRODUCTOS DESDE FIREBASE
   =============================== */
async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    state.products = [];

    querySnapshot.forEach(doc => {
      state.products.push(doc.data());
    });

    renderProducts();
  } catch (err) {
    console.error("❌ Error cargando productos:", err);
  }
}

/* ===============================
   PUBLICAR PRODUCTO ONLINE
   =============================== */
sellForm.addEventListener("submit", async e => {
  e.preventDefault();

  const newProduct = {
    name: pName.value,
    desc: pDesc.value,
    price: Number(pPrice.value),
    cat: pCat.value,
    date: Date.now()
  };

  try {
    await addDoc(collection(db, "products"), newProduct);
    alert("Producto publicado en Internet 🚀");

    sellForm.reset();
    loadProducts();
  } catch (err) {
    alert("❌ Error al publicar");
    console.error(err);
  }
});

/* ===============================
   RENDER PRODUCTOS
   =============================== */
function renderProducts() {
  const q = search.value.toLowerCase();
  const c = category.value;

  productsContainer.innerHTML = "";

  const filtered = state.products.filter(p =>
    (!q || p.name.toLowerCase().includes(q)) &&
    (!c || p.cat === c)
  );

  if (filtered.length === 0) {
    productsContainer.innerHTML = "<p>No hay productos todavía 😢</p>";
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product";

    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <b>$${p.price}</b>
      <small>(${p.cat})</small>
    `;

    productsContainer.appendChild(card);
  });
}

/* ===============================
   FILTROS
   =============================== */
search.addEventListener("input", renderProducts);
category.addEventListener("change", renderProducts);

/* ===============================
   LOADER
   =============================== */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

/* ===============================
   INIT
   =============================== */
loadProducts();




















