import { initMarketplace } from "./marketplace.js";

initMarketplace({
  collectionName: "productos",
  btnId: "btnPublicarProducto",
  listId: "productos",
  fields: [
    { id: "prodTitulo", name: "titulo", label: "Título" },
    { id: "prodPrecio", name: "precio", label: "Precio" },
    { id: "prodDescripcion", name: "descripcion", label: "Descripción" }
  ]
});







