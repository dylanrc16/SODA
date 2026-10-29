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

// Un grupo de opciones de un producto (por ejemplo, "Extras de ejemplo").
export type GrupoOpciones = {
  id: number;
  producto_id: number;
  nombre: string;
  obligatorio: boolean; // si es true, hay que elegir al menos una opción
  max_selecciones: number; // cuántas opciones se pueden marcar a la vez
};

// Una opción dentro de un grupo.
export type Opcion = {
  id: number;
  grupo_id: number;
  nombre: string;
  precio_extra: number; // colones, entero; 0 si no cuesta más
};

// Una opción o extra que el cliente eligió (por ejemplo, "Extra de ejemplo").
export type OpcionElegida = {
  nombre: string;
  precio_extra: number; // colones, entero; 0 si no cuesta más
};

// Un producto dentro del carrito. Guarda copia del nombre y precio,
// igual que pedido_items en el modelo de datos.
export type ItemCarrito = {
  producto_id: number;
  nombre: string;
  precio_unitario: number; // colones, entero
  cantidad: number; // entero, 1 o más
  opciones: OpcionElegida[];
};
