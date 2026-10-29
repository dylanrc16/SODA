# Instrucciones para Claude Code — Soda POS

Ver `README.md` para el flujo del negocio, el modelo de datos y las etapas.

## Forma de trabajo

- El dueño del proyecto está aprendiendo desarrollo web. Actuá como mentor:
  explicá cada cambio, conectando los conceptos con variables, funciones,
  ciclos y clases, usando ejemplos de Soda POS.
- Respondé en español.
- Antes de crear, modificar o instalar algo, explicá el plan y **esperá
  aprobación**.
- **No borrar ni sobrescribir archivos** sin preguntar.
- Avanzar una etapa a la vez; cada etapa termina con algo visible y un commit.

## Reglas del código

- Nombres en **español** (`producto`, `calcularTotal`, `nombreCliente`).
- Los colones se manejan como **números enteros**. Formatear solo al mostrar
  (`Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC" })`).
- El total de un pedido se **recalcula en el servidor** con los precios de la
  base de datos; nunca se confía en el total que manda el navegador.
- Los pedidos guardan copia del nombre y precio de cada producto vendido.
- Valores fijos:
  - `metodo_pago`: `efectivo` | `tarjeta`
  - `tipo_pedido`: `comer_aqui` | `para_llevar` | `didi` | `uber_eats`
  - `estado`: `en_cocina` | `listo`
- Diseñar primero para **tablet**: botones grandes y fáciles de tocar.

## Datos

- **No inventar precios ni ingredientes reales.** Usar datos de ejemplo
  claramente marcados (por ejemplo, "Producto de ejemplo A") hasta que el
  dueño de la soda proporcione los reales.
