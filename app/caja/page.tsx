import Link from "next/link";
import Catalogo from "./Catalogo";
import { categorias, productos } from "@/lib/datos-ejemplo";

// Pantalla de la tablet de caja ("/caja").
// Esta página corre en el servidor: toma los datos y se los pasa al catálogo.
// En la etapa 6 los datos vendrán de Supabase en vez de datos-ejemplo.
export default function Caja() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <Link href="/" className="text-lg underline">
        ← Inicio
      </Link>
      <h1 className="text-3xl font-bold">Caja</h1>
      <Catalogo categorias={categorias} productos={productos} />
    </main>
  );
}
