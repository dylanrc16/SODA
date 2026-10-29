import type { ItemCarrito } from "./tipos";

// Cálculos de dinero. Son funciones puras: no leen ni cambian nada fuera
// de sus parámetros. El servidor las usa para recalcular el total de un
// pedido, así que si llega un dato inválido lanzan un error en vez de
// devolver un monto equivocado.

function validarColones(monto: number, descripcion: string): void {
  if (!Number.isInteger(monto) || monto < 0) {
    throw new Error(`${descripcion} debe ser un entero de 0 o más: ${monto}`);
  }
}

// (precio unitario + suma de extras) × cantidad
export function calcularSubtotal(item: ItemCarrito): number {
  if (!Number.isInteger(item.cantidad) || item.cantidad < 1) {
    throw new Error(`La cantidad debe ser un entero de 1 o más: ${item.cantidad}`);
  }
  validarColones(item.precio_unitario, "El precio unitario");

  let precioConExtras = item.precio_unitario;
  for (const opcion of item.opciones) {
    validarColones(opcion.precio_extra, `El precio extra de "${opcion.nombre}"`);
    precioConExtras += opcion.precio_extra;
  }

  return precioConExtras * item.cantidad;
}

// Suma de los subtotales de todos los ítems. Un carrito vacío da 0.
export function calcularTotal(items: ItemCarrito[]): number {
  let total = 0;
  for (const item of items) {
    total += calcularSubtotal(item);
  }
  return total;
}
