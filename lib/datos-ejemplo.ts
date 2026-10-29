import type { Categoria, Producto } from "./tipos";

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
