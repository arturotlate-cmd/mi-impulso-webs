/* ===============================
   1. ESTADO GLOBAL
   =============================== */

const state = {
  products: [
    { name: 'Diseño de logo', price: 500, cat: 'servicio', desc: 'Branding básico' },
    { name: 'Playera personalizada', price: 250, cat: 'producto', desc: 'Algodón premium' },
    { name: 'Consultoría financiera', price: 3000, cat: 'servicio', desc: 'Asesoría avanzada' },
    { name: 'Taza personalizada', price: 200, cat: 'producto', desc: 'Cerámica premium' }
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
   3. ANIMACIONES (IntersectionObserver)
   =============================== */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

/* ===============================
   4. RENDER DE PRODUCTOS CON SKELETONS
   =============================== */

function renderProducts() {
  const search = document.getElementById('search');
  const category = document.getElementById('category');
  const container = document.getElementById('products');
  if (!container) return;

  const q = search ? search.value.toLowerCase() : '';
  const c = category ? category.value : '';

  // FILTRAR DATOS
  const filtered = state.products.filter(p =>
    (!q || p.name.toLowerCase().includes(q)) &&
    (!c || p.cat === c)
  );

  // LIMPIAR CONTENEDOR
  container.innerHTML = '';

  // === CREAR SKELETONS TEMPORALES ===
  const skeletonCount = Math.max(filtered.length, 3); // al menos 3 skeletons
  for (let i = 0; i < skeletonCount; i++) {
    const skel = document.createElement('div');
    skel.className = 'product skeleton-card';
    skel.innerHTML = `
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-btn"></div>
    `;
    container.appendChild(skel);
  }

  // SIMULA LA CARGA DE DATOS (1.2s)
  setTimeout(() => {
    container.innerHTML = ''; // eliminar skeletons

    if (filtered.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = "No se encontraron productos.";
      container.appendChild(empty);
      return;
    }

    // RENDERIZAR PRODUCTOS REALES
    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product reveal real-content';
      card.innerHTML = `
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <p class="price">$${p.price}</p>
        <button class="primary">Comprar</button>
      `;
      container.appendChild(card);
      observer.observe(card); // animación al aparecer
    });
  }, 1200);
}

/* ===============================
   5. LOADER INICIAL (pantalla completa)
   =============================== */

(function () {
  const loader = document.getElementById('loader');
  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';

    setTimeout(() => loader.remove(), 400);
  }, 1200);
})();

/* ===============================
   6. INICIALIZACIÓN
   =============================== */

window.addEventListener('DOMContentLoaded', () => {
  renderProducts(); // renderiza productos al cargar

  // observar elementos iniciales (hero, cards, etc.)
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // eventos de búsqueda y filtro
  const search = document.getElementById('search');
  const category = document.getElementById('category');
  if (search) search.addEventListener('input', renderProducts);
  if (category) category.addEventListener('change', renderProducts);
});











