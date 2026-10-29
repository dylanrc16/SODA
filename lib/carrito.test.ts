import { describe, expect, it } from "vitest";
import { agregarItem, cambiarCantidad, quitarItem, validarPedido } from "./carrito";
import type { DatosPedido, ItemCarrito, MetodoPago } from "./tipos";

const itemA: ItemCarrito = {
  producto_id: 1,
  nombre: "Producto de ejemplo A",
  precio_unitario: 2500,
  cantidad: 1,
  opciones: [],
};

const itemB: ItemCarrito = {
  producto_id: 2,
  nombre: "Producto de ejemplo B",
  precio_unitario: 3200,
  cantidad: 2,
  opciones: [],
};

const datosCompletos: DatosPedido = {
  nombre_cliente: "Cliente de ejemplo",
  metodo_pago: "efectivo",
  tipo_pedido: "comer_aqui",
};

describe("agregarItem", () => {
  it("agrega al final sin cambiar el carrito original", () => {
    const original = [itemA];
    expect(agregarItem(original, itemB)).toEqual([itemA, itemB]);
    expect(original).toEqual([itemA]);
  });

  it("el mismo producto dos veces queda en dos líneas", () => {
    expect(agregarItem([itemA], itemA)).toHaveLength(2);
  });
});

describe("cambiarCantidad", () => {
  it("cambia solo el ítem de esa posición", () => {
    const resultado = cambiarCantidad([itemA, itemB], 0, 3);
    expect(resultado[0].cantidad).toBe(3);
    expect(resultado[1]).toBe(itemB);
  });

  it("lanza error con cantidad menor que 1", () => {
    expect(() => cambiarCantidad([itemA], 0, 0)).toThrow();
  });
});

describe("quitarItem", () => {
  it("quita solo el ítem de esa posición", () => {
    expect(quitarItem([itemA, itemB], 0)).toEqual([itemB]);
  });
});

describe("validarPedido", () => {
  it("un pedido completo no tiene errores", () => {
    expect(validarPedido([itemA], datosCompletos)).toEqual([]);
  });

  it("un formulario vacío tiene los cuatro errores", () => {
    const vacio: DatosPedido = { nombre_cliente: "", metodo_pago: null, tipo_pedido: null };
    expect(validarPedido([], vacio)).toHaveLength(4);
  });

  it("un nombre con solo espacios cuenta como vacío", () => {
    expect(validarPedido([itemA], { ...datosCompletos, nombre_cliente: "   " })).toEqual([
      "Falta el nombre del cliente",
    ]);
  });

  it("rechaza una forma de pago que no existe", () => {
    // Simula un dato raro que llega del navegador.
    const datos = { ...datosCompletos, metodo_pago: "bitcoin" as MetodoPago };
    expect(validarPedido([itemA], datos)).toEqual(["Falta la forma de pago"]);
  });

  it("rechaza nombres heredados por todo objeto, como toString", () => {
    const datos = { ...datosCompletos, metodo_pago: "toString" as MetodoPago };
    expect(validarPedido([itemA], datos)).toEqual(["Falta la forma de pago"]);
  });
});
