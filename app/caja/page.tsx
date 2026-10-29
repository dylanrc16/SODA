import Link from "next/link";

// Pantalla de la tablet de caja ("/caja").
// En la etapa 2 aquí aparecerá el catálogo de productos.
export default function Caja() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <Link href="/" className="text-lg underline">
        ← Inicio
      </Link>
      <h1 className="text-3xl font-bold">Caja</h1>
      <p className="text-lg">Aquí irá el catálogo de productos.</p>
    </main>
  );
}
