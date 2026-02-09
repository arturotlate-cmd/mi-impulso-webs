/* ===============================
   1. ESTADO GLOBAL
   =============================== */

const state = {
  products: JSON.parse(localStorage.getItem("products")) || [
    { name: 'Diseño de logo', price: 500, cat: 'servicio', desc: 'Branding básico' },
    { name: 'Playera personalizada', price: 250, cat: 'producto', desc: 'Algodón premium' }
  ]
};

/* ===============================
   2. NAVEGACIÓN
   =============================== */

function showSection(id, btn) {
  const sections = ['market', 'sell', 'about'];

  sections.forEach(s => {
    const el = document.getElementById(s);
    if (el) el.classList.add('hidden');
  });

  document.querySelectorAll('nav button')
    .forEach(b => b.classList.remove('active'));

  if (btn) btn.classList.add('active');

  const target = document.getElementById(id);
  if (!target) return;

  target.classList.remove('hidden');
  target.classList.remove('visible');
  void target.offsetWidth;
  target.classList.add('visible');
}

/* ===============================
   3. RENDER PRODUCTOS
   =============================== */

function renderProducts() {
  const search = document.getElementById('search');
  const category = document.getElementById('category');
  const container = document.getElementById('products');
  if (!container) return;

  const q = search?.value.toLowerCase() || '';
  const c = category?.value || '';

  const filtered = state.products.filter(p =>
    (!q || p.name.toLowerCase().includes(q)) &&
    (!c || p.cat === c)
  );

  container.innerHTML = '';

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product reveal';

    card.innerHTML = `
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <p class="price">$${p.price}</p>
      <small>${p.cat}</small>
    `;

    container.appendChild(card);
    observer.observe(card);
  });
}

/* ===============================
   4. BUSCADOR EN TIEMPO REAL
   =============================== */

document.getElementById("search")?.addEventListener("input", renderProducts);
document.getElementById("category")?.addEventListener("change", renderProducts);

/* ===============================
   5. FORMULARIO VENDER
   =============================== */

const form = document.getElementById("sellForm");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(form);

    const newProduct = {
      name: data.get("producto"),
      price: data.get("precio"),
      cat: "producto",
      desc: data.get("descripcion")
    };

    state.products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(state.products));

    alert("Producto agregado al marketplace 😎");
    form.reset();
    showSection("market");
    renderProducts();
  });
}

/* ===============================
   6. ANIMACIONES SCROLL
   =============================== */

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ===============================
   7. LOADER
   =============================== */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  loader.style.opacity = "0";
  setTimeout(() => loader.remove(), 500);
});

/* ===============================
   INIT
   =============================== */

renderProducts();















