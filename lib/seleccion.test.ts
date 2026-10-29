import { describe, expect, it } from "vitest";
import { alternarOpcion, gruposFaltantes, opcionesElegidas } from "./seleccion";
import type { GrupoOpciones, Opcion } from "./tipos";

const grupoUnaOpcion: GrupoOpciones = {
  id: 1,
  producto_id: 1,
  nombre: "Grupo de ejemplo 1",
  obligatorio: true,
  max_selecciones: 1,
};

const grupoExtras: GrupoOpciones = {
  id: 2,
  producto_id: 1,
  nombre: "Extras de ejemplo",
  obligatorio: false,
  max_selecciones: 2,
};

const opciones: Opcion[] = [
  { id: 1, grupo_id: 1, nombre: "Opción de ejemplo 1", precio_extra: 0 },
  { id: 2, grupo_id: 1, nombre: "Opción de ejemplo 2", precio_extra: 0 },
  { id: 3, grupo_id: 2, nombre: "Extra de ejemplo 1", precio_extra: 500 },
  { id: 4, grupo_id: 2, nombre: "Extra de ejemplo 2", precio_extra: 300 },
];

describe("alternarOpcion", () => {
  it("marca una opción en una selección vacía", () => {
    expect(alternarOpcion({}, grupoUnaOpcion, 1)).toEqual({ 1: [1] });
  });

  it("en un grupo de una sola opción, la nueva reemplaza a la anterior", () => {
    expect(alternarOpcion({ 1: [1] }, grupoUnaOpcion, 2)).toEqual({ 1: [2] });
  });

  it("desmarca una opción que ya estaba marcada", () => {
    expect(alternarOpcion({ 2: [3, 4] }, grupoExtras, 3)).toEqual({ 2: [4] });
  });

  it("no pasa del máximo del grupo", () => {
    expect(alternarOpcion({ 2: [3, 4] }, grupoExtras, 5)).toEqual({ 2: [3, 4] });
  });

  it("no toca los otros grupos ni la selección original", () => {
    const original = { 1: [1] };
    expect(alternarOpcion(original, grupoExtras, 3)).toEqual({ 1: [1], 2: [3] });
    expect(original).toEqual({ 1: [1] });
  });
});

describe("gruposFaltantes", () => {
  it("devuelve los obligatorios sin opción elegida", () => {
    expect(gruposFaltantes([grupoUnaOpcion, grupoExtras], {})).toEqual([grupoUnaOpcion]);
  });

  it("no devuelve nada si los obligatorios están completos", () => {
    expect(gruposFaltantes([grupoUnaOpcion, grupoExtras], { 1: [2] })).toEqual([]);
  });
});

describe("opcionesElegidas", () => {
  it("copia nombre y precio extra de las opciones marcadas", () => {
    expect(opcionesElegidas(opciones, { 1: [2], 2: [3] })).toEqual([
      { nombre: "Opción de ejemplo 2", precio_extra: 0 },
      { nombre: "Extra de ejemplo 1", precio_extra: 500 },
    ]);
  });
});
