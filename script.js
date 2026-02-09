/* ================= STATE ================= */

const state = {
  products: JSON.parse(localStorage.getItem("products")) || [
    { name: "Pastelería Sofía", price: 120, cat: "producto", desc: "Pasteles caseros" },
    { name: "Clases de matemáticas", price: 80, cat: "servicio", desc: "Online y presencial" },
    { name: "Diseño web", price: 1500, cat: "servicio", desc: "Sitios profesionales" }
  ]
};

/* ================= NAV ================= */

function showSection(id, btn) {
  ["market", "sell", "about"].forEach(s => {
    document.getElementById(s)?.classList.add("hidden");
  });

  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const target = document.getElementById(id);
  if (!target) return;

  target.classList.remove("hidden");
  target.classList.add("visible");
}

/* ================= RENDER ================= */

function renderProducts() {
  const search = document.getElementById("search")?.value.toLowerCase() || "";
  const cat = document.getElementById("category")?.value || "";
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  state.products
    .filter(p => (!search || p.name.toLowerCase().includes(search)) && (!cat || p.cat === cat))
    .forEach(p => {
      const div = document.createElement("div");
      div.className = "product reveal";
      div.innerHTML = `
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <p class="price">$${p.price}</p>
        <small>${p.cat}</small>
      `;
      container.appendChild(div);
      observer.observe(div);
    });
}

/* ================= BUSCADOR ================= */

document.getElementById("search")?.addEventListener("input", renderProducts);
document.getElementById("category")?.addEventListener("change", renderProducts);

/* ================= FORM ================= */

document.getElementById("sellForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.target);

  const product = {
    name: data.get("producto"),
    price: data.get("precio"),
    cat: "producto",
    desc: data.get("descripcion")
  };

  state.products.push(product);
  localStorage.setItem("products", JSON.stringify(state.products));

  alert("Publicado correctamente 🚀");
  e.target.reset();
  showSection("market");
  renderProducts();
});

/* ================= ANIMACIONES ================= */

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ================= LOADER ================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;
  loader.style.opacity = 0;
  setTimeout(() => loader.remove(), 500);
});

/* ================= GUARDAR ================= */

window.addEventListener("beforeunload", () => {
  localStorage.setItem("products", JSON.stringify(state.products));
});

/* INIT */
renderProducts();
















