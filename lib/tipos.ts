// Tipos del catálogo. Siguen el modelo de datos del README.
// Un "type" describe la forma que debe tener un objeto, como el molde de una clase.

export type Categoria = {
  id: number;
  nombre: string;
};

export type Producto = {
  id: number;
  categoria_id: number; // a qué categoría pertenece
  nombre: string;
  descripcion: string;
  precio: number; // colones, siempre entero (2500 = ₡2 500)
  ingredientes: string[];
  activo: boolean; // si es false, no se muestra en la caja
};
