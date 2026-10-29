import type { Categoria, GrupoOpciones, Opcion, Producto } from "./tipos";

// DATOS DE EJEMPLO: nombres, precios e ingredientes son inventados.
// Se reemplazan por los reales cuando el dueño de la soda los dé,
// y en la etapa 6 se leerán desde Supabase.

export const categorias: Categoria[] = [
  { id: 1, nombre: "Categoría de ejemplo 1" },
  { id: 2, nombre: "Categoría de ejemplo 2" },
  { id: 3, nombre: "Categoría de ejemplo 3" },
];

export const productos: Producto[] = [
  {
    id: 1,
    categoria_id: 1,
    nombre: "Producto de ejemplo A",
    descripcion: "Descripción de ejemplo",
    precio: 2500,
    ingredientes: ["Ingrediente de ejemplo 1", "Ingrediente de ejemplo 2"],
    activo: true,
  },
  {
    id: 2,
    categoria_id: 1,
    nombre: "Producto de ejemplo B",
    descripcion: "Descripción de ejemplo",
    precio: 3200,
    ingredientes: ["Ingrediente de ejemplo 1"],
    activo: true,
  },
  {
    id: 3,
    categoria_id: 1,
    nombre: "Producto de ejemplo C",
    descripcion: "Descripción de ejemplo",
    precio: 2800,
    ingredientes: ["Ingrediente de ejemplo 3"],
    activo: true,
  },
  {
    id: 4,
    categoria_id: 2,
    nombre: "Producto de ejemplo D",
    descripcion: "Descripción de ejemplo",
    precio: 1800,
    ingredientes: ["Ingrediente de ejemplo 2"],
    activo: true,
  },
  {
    id: 5,
    categoria_id: 2,
    nombre: "Producto de ejemplo E",
    descripcion: "Descripción de ejemplo",
    precio: 4500,
    ingredientes: ["Ingrediente de ejemplo 1", "Ingrediente de ejemplo 4"],
    activo: true,
  },
  {
    // Inactivo a propósito: sirve para comprobar que la caja no lo muestra.
    id: 6,
    categoria_id: 2,
    nombre: "Producto de ejemplo F (inactivo)",
    descripcion: "Descripción de ejemplo",
    precio: 2000,
    ingredientes: [],
    activo: false,
  },
  {
    id: 7,
    categoria_id: 3,
    nombre: "Producto de ejemplo G",
    descripcion: "Descripción de ejemplo",
    precio: 1000,
    ingredientes: [],
    activo: true,
  },
  {
    id: 8,
    categoria_id: 3,
    nombre: "Producto de ejemplo H",
    descripcion: "Descripción de ejemplo",
    precio: 1500,
    ingredientes: [],
    activo: true,
  },
];

// Grupos de opciones de ejemplo. Los productos que no aparecen aquí
// no tienen opciones.
export const gruposOpciones: GrupoOpciones[] = [
  // Producto de ejemplo A
  { id: 1, producto_id: 1, nombre: "Grupo de ejemplo 1", obligatorio: true, max_selecciones: 1 },
  { id: 2, producto_id: 1, nombre: "Extras de ejemplo", obligatorio: false, max_selecciones: 2 },
  // Producto de ejemplo D
  { id: 3, producto_id: 4, nombre: "Grupo de ejemplo 2", obligatorio: true, max_selecciones: 1 },
];

export const opciones: Opcion[] = [
  { id: 1, grupo_id: 1, nombre: "Opción de ejemplo 1", precio_extra: 0 },
  { id: 2, grupo_id: 1, nombre: "Opción de ejemplo 2", precio_extra: 0 },
  { id: 3, grupo_id: 2, nombre: "Extra de ejemplo 1", precio_extra: 500 },
  { id: 4, grupo_id: 2, nombre: "Extra de ejemplo 2", precio_extra: 300 },
  { id: 5, grupo_id: 2, nombre: "Extra de ejemplo 3", precio_extra: 200 },
  { id: 6, grupo_id: 3, nombre: "Opción de ejemplo 3", precio_extra: 0 },
  { id: 7, grupo_id: 3, nombre: "Opción de ejemplo 4", precio_extra: 400 },
];
