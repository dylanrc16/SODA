import type { GrupoOpciones, Opcion, OpcionElegida } from "./tipos";

// Lo que se ha elegido de cada grupo: { idDelGrupo: [idsDeOpciones] }.
// Ejemplo: { 1: [2], 2: [3, 4] }.
export type Seleccion = Record<number, number[]>;

// Marca o desmarca una opción respetando las reglas del grupo.
// No cambia la selección recibida: devuelve una nueva (React lo necesita
// para saber que algo cambió).
export function alternarOpcion(
  seleccion: Seleccion,
  grupo: GrupoOpciones,
  opcionId: number,
): Seleccion {
  const elegidas = seleccion[grupo.id] ?? [];

  let nuevas: number[];
  if (elegidas.includes(opcionId)) {
    // Ya estaba marcada: se desmarca.
    nuevas = elegidas.filter((id) => id !== opcionId);
  } else if (grupo.max_selecciones === 1) {
    // Grupo de una sola opción: la nueva reemplaza a la anterior.
    nuevas = [opcionId];
  } else if (elegidas.length >= grupo.max_selecciones) {
    // Grupo lleno: no se marca nada más.
    return seleccion;
  } else {
    nuevas = [...elegidas, opcionId];
  }

  return { ...seleccion, [grupo.id]: nuevas };
}

// Grupos obligatorios que todavía no tienen ninguna opción elegida.
export function gruposFaltantes(
  grupos: GrupoOpciones[],
  seleccion: Seleccion,
): GrupoOpciones[] {
  return grupos.filter(
    (grupo) => grupo.obligatorio && (seleccion[grupo.id] ?? []).length === 0,
  );
}

// Convierte la selección en la lista de opciones que guarda el carrito,
// con copia del nombre y del precio extra.
export function opcionesElegidas(
  opciones: Opcion[],
  seleccion: Seleccion,
): OpcionElegida[] {
  return opciones
    .filter((opcion) => (seleccion[opcion.grupo_id] ?? []).includes(opcion.id))
    .map((opcion) => ({ nombre: opcion.nombre, precio_extra: opcion.precio_extra }));
}
