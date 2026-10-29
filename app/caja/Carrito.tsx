"use client";

import {
  etiquetasMetodoPago,
  etiquetasTipoPedido,
  type ItemCarrito,
  type MetodoPago,
  type TipoPedido,
} from "@/lib/tipos";
import { calcularSubtotal, calcularTotal } from "@/lib/dinero";
import { formatearColones } from "@/lib/formato";

type PropsCarrito = {
  carrito: ItemCarrito[];
  nombreCliente: string;
  metodoPago: MetodoPago | null;
  tipoPedido: TipoPedido | null;
  errores: string[];
  aviso: string | null;
  alCambiarCantidad: (posicion: number, cantidad: number) => void;
  alQuitar: (posicion: number) => void;
  alCambiarNombre: (nombre: string) => void;
  alElegirMetodoPago: (metodo: MetodoPago) => void;
  alElegirTipoPedido: (tipo: TipoPedido) => void;
  alEnviar: () => void;
};

// Las listas de valores salen de las etiquetas, así no se repiten.
const metodosPago = Object.keys(etiquetasMetodoPago) as MetodoPago[];
const tiposPedido = Object.keys(etiquetasTipoPedido) as TipoPedido[];

const claseOpcion = "min-h-14 rounded-xl border-2 px-4 text-lg font-semibold";
const claseOpcionElegida = "border-amber-500 bg-amber-50 dark:bg-amber-950";
const claseOpcionNormal = "border-neutral-200 dark:border-neutral-700";

// Carrito y datos del pedido. No guarda estado propio: todo llega por
// props desde PantallaCaja, y los cambios se avisan con las funciones "al...".
export default function Carrito({
  carrito,
  nombreCliente,
  metodoPago,
  tipoPedido,
  errores,
  aviso,
  alCambiarCantidad,
  alQuitar,
  alCambiarNombre,
  alElegirMetodoPago,
  alElegirTipoPedido,
  alEnviar,
}: PropsCarrito) {
  const total = calcularTotal(carrito);

  return (
    <div className="flex flex-col gap-6 rounded-2xl border-2 border-neutral-200 p-4 dark:border-neutral-700">
      <h2 className="text-2xl font-bold">Pedido</h2>

      {aviso && (
        <p className="rounded-xl bg-emerald-100 p-3 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
          {aviso}
        </p>
      )}

      {carrito.length === 0 ? (
        <p className="text-neutral-600 dark:text-neutral-400">
          Tocá un producto para agregarlo.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {/* La posición sirve de key: las líneas no guardan estado propio. */}
          {carrito.map((item, posicion) => (
            <li
              key={posicion}
              className="flex flex-col gap-2 border-b border-neutral-200 pb-3 dark:border-neutral-700"
            >
              <div className="flex justify-between gap-3">
                <span className="text-lg font-semibold">{item.nombre}</span>
                <span className="text-lg font-semibold">
                  {formatearColones(calcularSubtotal(item))}
                </span>
              </div>
              {item.opciones.length > 0 && (
                <p className="text-neutral-600 dark:text-neutral-400">
                  {item.opciones.map((opcion) => opcion.nombre).join(", ")}
                </p>
              )}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Quitar uno"
                  disabled={item.cantidad <= 1}
                  onClick={() => alCambiarCantidad(posicion, item.cantidad - 1)}
                  className="size-12 rounded-xl bg-neutral-200 text-xl font-bold disabled:opacity-40 dark:bg-neutral-800"
                >
                  −
                </button>
                <span className="min-w-6 text-center text-xl font-bold">{item.cantidad}</span>
                <button
                  type="button"
                  aria-label="Agregar uno"
                  onClick={() => alCambiarCantidad(posicion, item.cantidad + 1)}
                  className="size-12 rounded-xl bg-neutral-200 text-xl font-bold dark:bg-neutral-800"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => alQuitar(posicion)}
                  className="ml-auto min-h-12 rounded-xl px-4 font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  Quitar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between text-2xl font-bold">
        <span>Total</span>
        <span>{formatearColones(total)}</span>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Nombre del cliente</span>
        <input
          type="text"
          value={nombreCliente}
          onChange={(evento) => alCambiarNombre(evento.target.value)}
          maxLength={40}
          autoComplete="off"
          className="min-h-14 rounded-xl border-2 border-neutral-200 bg-background px-4 text-lg dark:border-neutral-700"
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-lg font-semibold">Forma de pago</legend>
        <div className="grid grid-cols-2 gap-3">
          {metodosPago.map((metodo) => (
            <button
              key={metodo}
              type="button"
              aria-pressed={metodoPago === metodo}
              onClick={() => alElegirMetodoPago(metodo)}
              className={`${claseOpcion} ${metodoPago === metodo ? claseOpcionElegida : claseOpcionNormal}`}
            >
              {etiquetasMetodoPago[metodo]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-lg font-semibold">Tipo de pedido</legend>
        <div className="grid grid-cols-2 gap-3">
          {tiposPedido.map((tipo) => (
            <button
              key={tipo}
              type="button"
              aria-pressed={tipoPedido === tipo}
              onClick={() => alElegirTipoPedido(tipo)}
              className={`${claseOpcion} ${tipoPedido === tipo ? claseOpcionElegida : claseOpcionNormal}`}
            >
              {etiquetasTipoPedido[tipo]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        {errores.length > 0 && (
          <ul className="text-neutral-600 dark:text-neutral-400">
            {errores.map((error) => (
              <li key={error}>• {error}</li>
            ))}
          </ul>
        )}
        <button
          type="button"
          disabled={errores.length > 0}
          onClick={alEnviar}
          className="min-h-16 rounded-xl bg-amber-500 text-xl font-bold text-white hover:bg-amber-600 disabled:opacity-40"
        >
          Enviar pedido · {formatearColones(total)}
        </button>
      </div>
    </div>
  );
}
