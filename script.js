/* ===============================
   ESTADO GLOBAL + BASE LOCAL
   =============================== */

const state = {
  products: JSON.parse(localStorage.getItem("products")) || [
    { name: "Diseño de logo", price: 500, cat: "servicio", desc: "Branding básico" },
    { name: "Playera personalizada", price: 250, cat: "producto", desc: "Algodón premium" }
  ]
};

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(state.products));
}

/* ===============================
   NAVEGACIÓN
   =============================== */

function showSection(id, btn) {
  ["market","sell","about"].forEach(s => {
    document.getElementById(s).classList.add("hidden");
  });

  document.querySelectorAll("nav button")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");
  document.getElementById(id).classList.remove("hidden");
}

/* ===============================
   RENDER PRODUCTOS
   =============================== */

function renderProducts() {
  const q = search.value.toLowerCase();
  const c = category.value;
  const container = document.getElementById("products");

  container.innerHTML = "";

  state.products
    .filter(p => (!q || p.name.toLowerCase().includes(q)) && (!c || p.cat === c))
    .forEach(p => {
      const card = document.createElement("div");
      card.className = "product reveal";
      card.innerHTML = `
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <p class="price">$${p.price}</p>
      `;
      container.appendChild(card);
      observer.observe(card);
    });
}

/* ===============================
   PUBLICAR PRODUCTO
   =============================== */

sellForm.addEventListener("submit", e => {
  e.preventDefault();

  const newProduct = {
    name: pName.value,
    desc: pDesc.value,
    price: Number(pPrice.value),
    cat: pCat.value
  };

  state.products.push(newProduct);
  saveProducts();
  renderProducts();
  alert("Producto publicado 🚀");

  e.target.reset();
});

/* ===============================
   BUSCADOR Y FILTRO
   =============================== */

search.oninput = renderProducts;
category.onchange = renderProducts;

/* ===============================
   ANIMACIONES
   =============================== */

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

/* ===============================
   LOADER
   =============================== */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  setTimeout(() => loader.remove(), 500);
});

/* ===============================
   INIT
   =============================== */

renderProducts();

















