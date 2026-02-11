import { initMarketplace } from "./marketplace.js";

initMarketplace({
  collectionName: "servicios",
  btnId: "btnPublicarServicio",
  listId: "servicios",
  fields: [
    { id: "servTitulo", name: "titulo", label: "Título" },
    { id: "servPrecio", name: "precio", label: "Precio" },
    { id: "servDescripcion", name: "descripcion", label: "Descripción" }
  ]
});









