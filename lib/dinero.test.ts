import { describe, expect, it } from "vitest";
import { calcularSubtotal, calcularTotal } from "./dinero";
import type { ItemCarrito } from "./tipos";

// Crea un ítem de ejemplo; cada prueba cambia solo lo que necesita.
function crearItem(cambios: Partial<ItemCarrito> = {}): ItemCarrito {
  return {
    producto_id: 1,
    nombre: "Producto de ejemplo A",
    precio_unitario: 2500,
    cantidad: 1,
    opciones: [],
    ...cambios,
  };
}

describe("calcularSubtotal", () => {
  it("sin opciones, es el precio unitario", () => {
    expect(calcularSubtotal(crearItem())).toBe(2500);
  });

  it("suma un extra al precio", () => {
    const item = crearItem({
      opciones: [{ nombre: "Extra de ejemplo 1", precio_extra: 500 }],
    });
    expect(calcularSubtotal(item)).toBe(3000);
  });

  it("suma varios extras, incluidos los que no cuestan", () => {
    const item = crearItem({
      opciones: [
        { nombre: "Extra de ejemplo 1", precio_extra: 500 },
        { nombre: "Opción de ejemplo sin costo", precio_extra: 0 },
        { nombre: "Extra de ejemplo 2", precio_extra: 300 },
      ],
    });
    expect(calcularSubtotal(item)).toBe(3300);
  });

  it("multiplica precio con extras por la cantidad", () => {
    const item = crearItem({
      cantidad: 2,
      opciones: [{ nombre: "Extra de ejemplo 1", precio_extra: 500 }],
    });
    expect(calcularSubtotal(item)).toBe(6000);
  });

  it("lanza error si la cantidad es 0", () => {
    expect(() => calcularSubtotal(crearItem({ cantidad: 0 }))).toThrow();
  });

  it("lanza error si la cantidad no es entera", () => {
    expect(() => calcularSubtotal(crearItem({ cantidad: 1.5 }))).toThrow();
  });

  it("lanza error si el precio es negativo o decimal", () => {
    expect(() => calcularSubtotal(crearItem({ precio_unitario: -100 }))).toThrow();
    expect(() => calcularSubtotal(crearItem({ precio_unitario: 2500.5 }))).toThrow();
  });

  it("lanza error si un extra tiene precio negativo", () => {
    const item = crearItem({
      opciones: [{ nombre: "Extra de ejemplo 1", precio_extra: -500 }],
    });
    expect(() => calcularSubtotal(item)).toThrow();
  });
});

describe("calcularTotal", () => {
  it("un carrito vacío da 0", () => {
    expect(calcularTotal([])).toBe(0);
  });

  it("suma los subtotales de varios ítems", () => {
    const items = [
      crearItem({ cantidad: 2 }), // 5000
      crearItem({
        producto_id: 4,
        nombre: "Producto de ejemplo D",
        precio_unitario: 1800,
        opciones: [{ nombre: "Extra de ejemplo 1", precio_extra: 200 }],
      }), // 2000
    ];
    expect(calcularTotal(items)).toBe(7000);
  });
});
