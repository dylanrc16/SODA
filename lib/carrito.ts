import {
  etiquetasMetodoPago,
  etiquetasTipoPedido,
  type DatosPedido,
  type ItemCarrito,
} from "./tipos";

// Funciones del carrito. Igual que alternarOpcion, nunca cambian el
// carrito recibido: devuelven uno nuevo para que React note el cambio.

export function agregarItem(carrito: ItemCarrito[], item: ItemCarrito): ItemCarrito[] {
  return [...carrito, item];
}

// "posicion" es el índice del ítem en el carrito (0 = el primero).
export function cambiarCantidad(
  carrito: ItemCarrito[],
  posicion: number,
  cantidad: number,
): ItemCarrito[] {
  if (!Number.isInteger(cantidad) || cantidad < 1) {
    throw new Error(`La cantidad debe ser un entero de 1 o más: ${cantidad}`);
  }
  return carrito.map((item, i) => (i === posicion ? { ...item, cantidad } : item));
}

export function quitarItem(carrito: ItemCarrito[], posicion: number): ItemCarrito[] {
  return carrito.filter((_, i) => i !== posicion);
}

// Revisa si el pedido se puede enviar. Devuelve la lista de lo que falta;
// si está vacía, el pedido es válido. También revisa que los valores sean
// de los permitidos, porque el servidor la usará con datos que llegan
// del navegador.
export function validarPedido(carrito: ItemCarrito[], datos: DatosPedido): string[] {
  const errores: string[] = [];

  if (carrito.length === 0) {
    errores.push("Falta agregar productos");
  }
  if (datos.nombre_cliente.trim() === "") {
    errores.push("Falta el nombre del cliente");
  }
  // Object.hasOwn y no "in": "in" también acepta cosas como "toString",
  // que todo objeto hereda.
  if (datos.metodo_pago === null || !Object.hasOwn(etiquetasMetodoPago, datos.metodo_pago)) {
    errores.push("Falta la forma de pago");
  }
  if (datos.tipo_pedido === null || !Object.hasOwn(etiquetasTipoPedido, datos.tipo_pedido)) {
    errores.push("Falta el tipo de pedido");
  }

  return errores;
}
