"use client";

import { useState } from "react";
import type { Categoria, GrupoOpciones, ItemCarrito, Opcion, Producto } from "@/lib/tipos";
import { formatearColones } from "@/lib/formato";
import DetalleProducto from "./DetalleProducto";

type PropsCatalogo = {
  categorias: Categoria[];
  productos: Producto[];
  gruposOpciones: GrupoOpciones[];
  opciones: Opcion[];
};

// Catálogo de la caja: pestañas de categorías arriba y tarjetas de productos abajo.
// Es un Client Component porque guarda estado (la categoría elegida) y responde a toques.
export default function Catalogo({
  categorias,
  productos,
  gruposOpciones,
  opciones,
}: PropsCatalogo) {
  // Estado: qué categoría está elegida. Empieza con la primera.
  const [categoriaElegida, setCategoriaElegida] = useState(categorias[0]?.id);
  // Estado: qué producto tiene el detalle abierto (null = ninguno).
  const [productoAbierto, setProductoAbierto] = useState<Producto | null>(null);

  // Grupos y opciones solo del producto abierto.
  const gruposDelProducto = gruposOpciones.filter(
    (grupo) => grupo.producto_id === productoAbierto?.id,
  );
  const opcionesDelProducto = opciones.filter((opcion) =>
    gruposDelProducto.some((grupo) => grupo.id === opcion.grupo_id),
  );

  // En la etapa 5 el ítem se guardará en el carrito; por ahora solo cierra.
  function agregarAlCarrito(item: ItemCarrito) {
    void item;
    setProductoAbierto(null);
  }

  // Filtro: solo los productos activos de la categoría elegida.
  const productosVisibles = productos.filter(
    (producto) => producto.activo && producto.categoria_id === categoriaElegida,
  );

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex gap-3 overflow-x-auto pb-1">
        {categorias.map((categoria) => {
          const estaElegida = categoria.id === categoriaElegida;
          return (
            <button
              key={categoria.id}
              type="button"
              onClick={() => setCategoriaElegida(categoria.id)}
              className={`min-h-14 shrink-0 rounded-xl px-6 text-lg font-semibold ${
                estaElegida
                  ? "bg-amber-500 text-white"
                  : "bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              {categoria.nombre}
            </button>
          );
        })}
      </nav>

      {productosVisibles.length === 0 ? (
        <p className="text-lg">No hay productos en esta categoría.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {productosVisibles.map((producto) => (
            <li key={producto.id}>
              <button
                type="button"
                onClick={() => setProductoAbierto(producto)}
                className="flex h-full min-h-36 w-full flex-col justify-between gap-3 rounded-xl border-2 border-neutral-200 p-4 text-left hover:border-amber-500 dark:border-neutral-700"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-xl font-semibold">{producto.nombre}</span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {producto.descripcion}
                  </span>
                </span>
                <span className="text-2xl font-bold text-amber-600">
                  {formatearColones(producto.precio)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {productoAbierto && (
        <DetalleProducto
          producto={productoAbierto}
          grupos={gruposDelProducto}
          opciones={opcionesDelProducto}
          alCerrar={() => setProductoAbierto(null)}
          alAgregar={agregarAlCarrito}
        />
      )}
    </div>
  );
}
