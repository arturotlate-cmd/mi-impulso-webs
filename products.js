import { initMarketplace } from "./marketplace.js";

document.addEventListener("DOMContentLoaded", () => {

  initMarketplace({
    collectionName: "productos",
    btnId: "btnPublicarProducto",
    listId: "productos",
    fields: [
      { id: "prodTitulo", key: "titulo" },
      { id: "prodPrecio", key: "precio" },
      { id: "prodDescripcion", key: "descripcion" }
    ]
  });

});









