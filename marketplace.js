// marketplace.js
export function initMarketplace(config) {
  const btn = document.getElementById(config.btnId);
  const list = document.getElementById(config.listId);

  if (!btn || !list) return;

  btn.addEventListener("click", async () => {
    if (!window.usuario) {
      alert("Debes iniciar sesión para publicar");
      return;
    }

    const data = {};

    for (const f of config.fields) {
      const el = document.getElementById(f.id);
      if (!el || !el.value.trim()) {
        alert(`Por favor completa: ${f.label}`);
        return;
      }
      data[f.key] = el.value.trim();
    }

    try {
      await config.addDocFn(data);
      alert("Publicado con éxito!");
    } catch (e) {
      console.error("Error al publicar:", e);
      alert("No se pudo publicar ❌");
    }
  });

  config.onSnapshotFn(list);
}







