import Link from "next/link";

// Página de inicio ("/"): cada tablet elige aquí su pantalla.
export default function Inicio() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 p-6">
      <h1 className="text-4xl font-bold">Soda POS</h1>

      <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
        <Link
          href="/caja"
          className="flex-1 rounded-xl bg-amber-500 py-8 text-center text-2xl font-semibold text-white hover:bg-amber-600"
        >
          Caja
        </Link>
        <Link
          href="/cocina"
          className="flex-1 rounded-xl bg-emerald-600 py-8 text-center text-2xl font-semibold text-white hover:bg-emerald-700"
        >
          Cocina
        </Link>
      </div>
    </main>
  );
}
