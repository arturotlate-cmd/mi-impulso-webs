/* ===============================
   1. ESTADO GLOBAL
   =============================== */

const state = {
  products: [
    { name: 'Diseño de logo', price: 500, cat: 'servicio', desc: 'Branding básico' },
    { name: 'Playera personalizada', price: 250, cat: 'producto', desc: 'Algodón premium' }
  ]
};

/* ===============================
   2. NAVEGACIÓN DE SECCIONES
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

  // reiniciar animación
  target.classList.remove('visible');
  void target.offsetWidth;
  target.classList.add('visible');
}

/* ===============================
   3. RENDER DE PRODUCTOS
   =============================== */

function renderProducts() {
  const search = document.getElementById('search');
  const category = document.getElementById('category');
  const container = document.getElementById('products');

  if (!container) return;

  const q = search ? search.value.toLowerCase() : '';
  const c = category ? category.value : '';

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
    `;

    container.appendChild(card);
    observer.observe(card); // animación al aparecer
  });
}

/* ===============================
   4. ANIMACIONES (UNA SOLA LÓGICA)
   =============================== */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // solo una vez
      }
    });
  },
  { threshold: 0.15 }
);

// observar elementos iniciales
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ===============================
   5. LOADER (FAILSAFE)
   =============================== */

(function () {
  const loader = document.getElementById('loader');
  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';

    setTimeout(() => {
      loader.remove();
    }, 300);
  }, 1200);
})();

/* ===============================
   INIT
   =============================== */

renderProducts();









