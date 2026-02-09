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
const sellForm = document.querySelector("#sell form");

/* ===============================
   NAVEGACIÓN SECCIONES
   =============================== */
function showSection(id, btn) {
  const sections = ["market", "sell", "about"];
  sections.forEach(s => document.getElementById(s)?.classList.add("hidden"));

  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  btn?.classList.add("active");

  const target = document.getElementById(id);
  if (!target) return;
  target.classList.remove("hidden");
}

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
    console.error("Error cargando productos:", err);
  }
}

/* ===============================
   PUBLICAR PRODUCTO ONLINE
   =============================== */
sellForm?.addEventListener("submit", async e => {
  e.preventDefault();

  const inputs = sellForm.querySelectorAll("input, textarea, select");

  const newProduct = {
    name: inputs[2].value,
    price: Number(inputs[3].value),
    desc: inputs[4].value,
    cat: "producto",
    date: Date.now()
  };

  try {
    await addDoc(collection(db, "products"), newProduct);
    alert("Producto publicado en Internet 🚀");

    sellForm.reset();
    loadProducts();
  } catch (err) {
    alert("Error al publicar 😢");
    console.error(err);
  }
});

/* ===============================
   RENDER PRODUCTOS
   =============================== */
function renderProducts() {
  if (!productsContainer) return;

  const q = search?.value.toLowerCase() || "";
  const c = category?.value || "";

  productsContainer.innerHTML = "";

  const filtered = state.products.filter(p =>
    (!q || p.name.toLowerCase().includes(q)) &&
    (!c || p.cat === c)
  );

  if (filtered.length === 0) {
    productsContainer.innerHTML = "<p>No hay productos aún</p>";
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product reveal";

    card.innerHTML = `
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <p class="price">$${p.price}</p>
    `;

    productsContainer.appendChild(card);
    observer.observe(card);
  });
}

/* ===============================
   FILTROS
   =============================== */
search?.addEventListener("input", renderProducts);
category?.addEventListener("change", renderProducts);

/* ===============================
   ANIMACIÓN SCROLL REVEAL
   =============================== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ===============================
   LOADER
   =============================== */
(function () {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => loader.remove(), 300);
  }, 1200);
})();

/* ===============================
   INIT
   =============================== */
loadProducts();


















