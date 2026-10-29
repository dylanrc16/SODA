// Se crea una sola vez y se reutiliza en cada llamada.
const formatoColones = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",
  maximumFractionDigits: 0,
});

// Función pura: recibe un entero (2500) y devuelve texto ("₡2 500").
// El número nunca cambia; solo se formatea al mostrarlo.
export function formatearColones(monto: number): string {
  return formatoColones.format(monto);
}
