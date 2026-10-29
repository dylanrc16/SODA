import Link from "next/link";

// Pantalla de la tablet de cocina ("/cocina").
// En la etapa 8 aquí aparecerán los pedidos en tiempo real.
export default function Cocina() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <Link href="/" className="text-lg underline">
        ← Inicio
      </Link>
      <h1 className="text-3xl font-bold">Cocina</h1>
      <p className="text-lg">Aquí aparecerán los pedidos en cocina.</p>
    </main>
  );
}
