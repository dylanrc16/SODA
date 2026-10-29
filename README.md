# Soda POS

Aplicación web de punto de venta para una soda pequeña de Costa Rica.
Funciona en celular, tablet y computadora.

## Cómo trabaja la soda

La soda usa **dos tablets** con la misma aplicación:

```
TABLET 1: CAJA  (/caja)                       TABLET 2: COCINA  (/cocina)
- Catálogo por categorías                     - Muestra los pedidos "en cocina"
- Detalle del producto + personalización      - Se actualiza sola (tiempo real)
- Carrito                                     - Botón "Listo": el pedido sale
- Nombre, forma de pago, tipo de pedido         de la pantalla
- Botón "Enviar pedido"  ───────────────────►
```

- Se cobra **al enviar el pedido**.
- Al enviar se registra:
  - **Nombre del cliente** (obligatorio).
  - **Forma de pago**: efectivo o tarjeta.
  - **Tipo de pedido**: comer aquí, para llevar, Didi o Uber Eats.
- La caja no le manda el pedido directamente a la cocina: lo **guarda en la
  base de datos** y la cocina lo recibe por tiempo real. Si la tablet de cocina
  se reinicia, no se pierde ningún pedido.

## Tecnologías

| Tecnología | Para qué |
|---|---|
| TypeScript | Lenguaje con tipos: detecta errores antes de ejecutar |
| Next.js | Framework: páginas (`/caja`, `/cocina`) y código de servidor |
| React | Construir la interfaz con componentes |
| Tailwind CSS | Estilos y diseño adaptable (celular, tablet, computadora) |
| Supabase (PostgreSQL) | Base de datos, inicio de sesión y tiempo real |
| Vercel | Publicar la aplicación (etapa final) |

## Modelo de datos (borrador)

```
categorias      (id, nombre)
productos       (id, categoria_id, nombre, descripcion, precio, ingredientes, activo)
grupos_opciones (id, producto_id, nombre, obligatorio, max_selecciones)
opciones        (id, grupo_id, nombre, precio_extra)

pedidos         (id, numero_del_dia, nombre_cliente, metodo_pago, tipo_pedido,
                 estado, total, creado_en)
pedido_items    (id, pedido_id, producto_id, nombre_producto, precio_unitario,
                 cantidad, subtotal)
pedido_item_opciones (id, pedido_item_id, nombre_opcion, precio_extra)
```

Valores fijos:

- `metodo_pago`: `efectivo` | `tarjeta`
- `tipo_pedido`: `comer_aqui` | `para_llevar` | `didi` | `uber_eats`
- `estado`: `en_cocina` → `listo`

Decisiones de diseño:

1. Los colones se guardan como **números enteros** (sin decimales).
2. Cada pedido guarda una **copia** del nombre y precio de lo vendido, para que
   un cambio de precio futuro no altere ventas pasadas.
3. El cálculo de dinero vive en **funciones puras** con pruebas automáticas.
4. El total se **recalcula en el servidor** al enviar el pedido.

## Etapas

| # | Etapa | Resultado |
|---|---|---|
| 0 | Preparación | `README.md` y `CLAUDE.md` |
| 1 | Esqueleto Next.js | Página "Soda POS" funcionando |
| 2 | Catálogo (caja) con datos de ejemplo | Tarjetas de productos, pensadas para tablet |
| 3 | Lógica de dinero + pruebas | `calcularSubtotal` y `calcularTotal` probadas |
| 4 | Detalle del producto + personalización | Opciones y extras con precio en vivo |
| 5 | Carrito + datos del pedido | Nombre, forma de pago y tipo de pedido |
| 6 | Conectar Supabase | Catálogo leído de la base de datos |
| 7 | Enviar pedido | Pedido guardado con estado `en_cocina` |
| 8 | Pantalla de cocina en tiempo real | `/cocina` se actualiza sola; botón "Listo" |
| 9 | Historial + resumen del día | Totales por efectivo, tarjeta y total |
| 10 | Administración + login | El dueño edita productos y precios |
| 11 | Pulido y publicación | Probado con dos tablets reales, publicado |
| 12 | Plus: modificar pedidos enviados | Editar un pedido que ya está en cocina |

## Fuera de la versión 1

- Control de inventario.
- Facturación electrónica (Hacienda).

## Pendiente por definir

- Precios, productos, ingredientes y opciones reales (los da el dueño).
- Didi y Uber Eats: ¿forma de pago "plataforma"? ¿mismos precios que en la soda?
