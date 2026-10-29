"use client";

import { useState } from "react";
import type {
  Categoria,
  GrupoOpciones,
  ItemCarrito,
  MetodoPago,
  Opcion,
  Producto,
  TipoPedido,
} from "@/lib/tipos";
import { agregarItem, cambiarCantidad, quitarItem, validarPedido } from "@/lib/carrito";
import Catalogo from "./Catalogo";
import Carrito from "./Carrito";

type PropsPantallaCaja = {
  categorias: Categoria[];
  productos: Producto[];
  gruposOpciones: GrupoOpciones[];
  opciones: Opcion[];
};

// Componente padre de la caja. Guarda el carrito y los datos del pedido
// porque los usan tanto el catálogo (agrega) como el carrito (muestra).
export default function PantallaCaja({
  categorias,
  productos,
  gruposOpciones,
  opciones,
}: PropsPantallaCaja) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [nombreCliente, setNombreCliente] = useState("");
  const [metodoPago, setMetodoPago] = useState<MetodoPago | null>(null);
  const [tipoPedido, setTipoPedido] = useState<TipoPedido | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const errores = validarPedido(carrito, {
    nombre_cliente: nombreCliente,
    metodo_pago: metodoPago,
    tipo_pedido: tipoPedido,
  });

  function agregar(item: ItemCarrito) {
    setCarrito(agregarItem(carrito, item));
    setAviso(null);
  }

  // En la etapa 7 aquí se guardará el pedido en la base de datos.
  function enviarPedido() {
    setAviso("Pedido de prueba: todavía no se guarda (etapa 7).");
    setCarrito([]);
    setNombreCliente("");
    setMetodoPago(null);
    setTipoPedido(null);
  }

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
      <Catalogo
        categorias={categorias}
        productos={productos}
        gruposOpciones={gruposOpciones}
        opciones={opciones}
        alAgregar={agregar}
      />
      <aside className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
        <Carrito
          carrito={carrito}
          nombreCliente={nombreCliente}
          metodoPago={metodoPago}
          tipoPedido={tipoPedido}
          errores={errores}
          aviso={aviso}
          alCambiarCantidad={(posicion, cantidad) =>
            setCarrito(cambiarCantidad(carrito, posicion, cantidad))
          }
          alQuitar={(posicion) => setCarrito(quitarItem(carrito, posicion))}
          alCambiarNombre={setNombreCliente}
          alElegirMetodoPago={setMetodoPago}
          alElegirTipoPedido={setTipoPedido}
          alEnviar={enviarPedido}
        />
      </aside>
    </div>
  );
}
