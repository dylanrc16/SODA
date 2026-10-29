"use client";

import { useState } from "react";
import type { Categoria, Producto } from "@/lib/tipos";
import { formatearColones } from "@/lib/formato";

type PropsCatalogo = {
  categorias: Categoria[];
  productos: Producto[];
};

// Catálogo de la caja: pestañas de categorías arriba y tarjetas de productos abajo.
// Es un Client Component porque guarda estado (la categoría elegida) y responde a toques.
export default function Catalogo({ categorias, productos }: PropsCatalogo) {
  // Estado: qué categoría está elegida. Empieza con la primera.
  const [categoriaElegida, setCategoriaElegida] = useState(categorias[0]?.id);

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
              {/* En la etapa 4, tocar la tarjeta abrirá el detalle del producto. */}
              <button
                type="button"
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
    </div>
  );
}
