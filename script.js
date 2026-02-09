/* ===============================
   RENDER DE PRODUCTOS CON SKELETONS REALISTAS
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

  // === CREAR SKELETONS REALISTAS ===
  const skeletonCount = Math.max(filtered.length, 3);
  for (let i = 0; i < skeletonCount; i++) {
    const skel = document.createElement('div');
    skel.className = 'product skeleton-card';

    // tamaños aleatorios para simular variación
    const titleWidth = 40 + Math.floor(Math.random() * 40); // 40% a 80%
    const textWidth1 = 50 + Math.floor(Math.random() * 50); // 50% a 100%
    const textWidth2 = 40 + Math.floor(Math.random() * 60); // 40% a 100%
    const btnWidth = 30 + Math.floor(Math.random() * 40); // 30% a 70%

    skel.innerHTML = `
      <div class="skeleton skeleton-title" style="width:${titleWidth}%"></div>
      <div class="skeleton skeleton-text" style="width:${textWidth1}%"></div>
      <div class="skeleton skeleton-text" style="width:${textWidth2}%"></div>
      <div class="skeleton skeleton-btn" style="width:${btnWidth}%"></div>
    `;
    container.appendChild(skel);
  }

  // SIMULA LA CARGA DE DATOS
  setTimeout(() => {
    container.innerHTML = '';

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
      observer.observe(card);
    });
  }, 1200);
}













