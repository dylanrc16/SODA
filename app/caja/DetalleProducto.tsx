"use client";

import { useState } from "react";
import type { GrupoOpciones, ItemCarrito, Opcion, Producto } from "@/lib/tipos";
import { calcularSubtotal } from "@/lib/dinero";
import { formatearColones } from "@/lib/formato";
import {
  alternarOpcion,
  gruposFaltantes,
  opcionesElegidas,
  type Seleccion,
} from "@/lib/seleccion";

type PropsDetalleProducto = {
  producto: Producto;
  grupos: GrupoOpciones[]; // solo los grupos de este producto
  opciones: Opcion[]; // solo las opciones de esos grupos
  alCerrar: () => void;
  alAgregar: (item: ItemCarrito) => void;
};

// Panel que se abre encima del catálogo para personalizar un producto.
export default function DetalleProducto({
  producto,
  grupos,
  opciones,
  alCerrar,
  alAgregar,
}: PropsDetalleProducto) {
  const [seleccion, setSeleccion] = useState<Seleccion>({});
  const [cantidad, setCantidad] = useState(1);

  // Estos valores se recalculan en cada dibujo, así el precio va en vivo.
  const item: ItemCarrito = {
    producto_id: producto.id,
    nombre: producto.nombre,
    precio_unitario: producto.precio,
    cantidad,
    opciones: opcionesElegidas(opciones, seleccion),
  };
  const subtotal = calcularSubtotal(item);
  const faltantes = gruposFaltantes(grupos, seleccion);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-detalle"
        className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-background"
      >
        <div className="flex flex-col gap-6 overflow-y-auto p-6">
          <div className="flex flex-col gap-1">
            <h2 id="titulo-detalle" className="text-2xl font-bold">
              {producto.nombre}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">{producto.descripcion}</p>
            {producto.ingredientes.length > 0 && (
              <p className="text-neutral-600 dark:text-neutral-400">
                Ingredientes: {producto.ingredientes.join(", ")}
              </p>
            )}
            <p className="text-xl font-semibold text-amber-600">
              {formatearColones(producto.precio)}
            </p>
          </div>

          {grupos.map((grupo) => {
            const elegidas = seleccion[grupo.id] ?? [];
            const grupoLleno =
              grupo.max_selecciones > 1 && elegidas.length >= grupo.max_selecciones;
            const opcionesDelGrupo = opciones.filter((opcion) => opcion.grupo_id === grupo.id);

            return (
              <section key={grupo.id} className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold">
                  {grupo.nombre}
                  <span className="ml-2 text-base font-normal text-neutral-600 dark:text-neutral-400">
                    {grupo.obligatorio ? "Obligatorio" : "Opcional"} ·{" "}
                    {grupo.max_selecciones === 1
                      ? "elegí 1"
                      : `máximo ${grupo.max_selecciones}`}
                  </span>
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {opcionesDelGrupo.map((opcion) => {
                    const estaElegida = elegidas.includes(opcion.id);
                    return (
                      <button
                        key={opcion.id}
                        type="button"
                        aria-pressed={estaElegida}
                        disabled={grupoLleno && !estaElegida}
                        onClick={() => setSeleccion(alternarOpcion(seleccion, grupo, opcion.id))}
                        className={`flex min-h-14 items-center justify-between gap-3 rounded-xl border-2 px-4 text-left text-lg disabled:opacity-40 ${
                          estaElegida
                            ? "border-amber-500 bg-amber-50 dark:bg-amber-950"
                            : "border-neutral-200 dark:border-neutral-700"
                        }`}
                      >
                        <span>{opcion.nombre}</span>
                        {opcion.precio_extra > 0 && (
                          <span className="font-semibold">
                            +{formatearColones(opcion.precio_extra)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <section className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">Cantidad</h3>
            <button
              type="button"
              aria-label="Quitar uno"
              disabled={cantidad <= 1}
              onClick={() => setCantidad(cantidad - 1)}
              className="size-14 rounded-xl bg-neutral-200 text-2xl font-bold disabled:opacity-40 dark:bg-neutral-800"
            >
              −
            </button>
            <span className="min-w-8 text-center text-2xl font-bold">{cantidad}</span>
            <button
              type="button"
              aria-label="Agregar uno"
              onClick={() => setCantidad(cantidad + 1)}
              className="size-14 rounded-xl bg-neutral-200 text-2xl font-bold dark:bg-neutral-800"
            >
              +
            </button>
          </section>
        </div>

        <div className="flex flex-col gap-3 border-t border-neutral-200 p-6 dark:border-neutral-700">
          {faltantes.length > 0 && (
            <p className="text-red-600">
              Falta elegir: {faltantes.map((grupo) => grupo.nombre).join(", ")}
            </p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={alCerrar}
              className="min-h-14 flex-1 rounded-xl bg-neutral-200 text-lg font-semibold dark:bg-neutral-800"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={faltantes.length > 0}
              onClick={() => alAgregar(item)}
              className="min-h-14 flex-[2] rounded-xl bg-amber-500 text-lg font-semibold text-white hover:bg-amber-600 disabled:opacity-40"
            >
              Agregar · {formatearColones(subtotal)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
