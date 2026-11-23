# Mesa para Dos

Web para calificar en pareja restaurantes y cafeterías de Medellín, con una segunda sección, **Recetario L&S**, para los platos que cocinamos.

- **Mesa para Dos:** lugares con varias cocinas, zona, precio y ubicación en el mapa; hasta 3 evaluaciones por persona (sabor, servicio, ambiente, precio-calidad); fotos con portada elegible; mapa con zoom (Leaflet + OpenStreetMap); ranking con filtros por cocina, zona, precio y evaluación.
- **Recetario L&S:** recetas con preparación escrita y/o en audio, cocinas, facilidad, precio aproximado para 2 platos, fotos, evaluaciones y ranking.
- **Invitados:** la opción "Otro" permite que amigos califiquen con su nombre, sin poder crear ni editar.
- Modo claro y oscuro, responsive.

- **Frontend:** un solo `index.html`, sin compilación.
- **Datos:** Upstash Redis (lugares, reseñas y fotos guardados como hashes `mesa:*`).
- **Fotos y audios:** Vercel Blob. El navegador reduce las fotos a 1600 px; los audios se graban a 48 kbps (máximo 8 minutos, 4 MB).
- **Acceso:** una clave compartida (`APP_PIN`) y un selector de quién está calificando.
- El test de CI que antes vivía aquí sigue disponible en [`/test-ci/`](test-ci/).

## Publicar en Vercel (una sola vez)

1. En [vercel.com/new](https://vercel.com/new), importa el repositorio `test-ci-pareja`. No cambies nada en *Build settings* y despliega.
2. En el proyecto, ve a **Storage → Create Database → Upstash (Redis)**, elige el plan gratis y conéctalo al proyecto. Vercel agrega solo `KV_REST_API_URL` y `KV_REST_API_TOKEN`.
3. En **Storage → Create → Blob**, crea un store y conéctalo al proyecto. Vercel agrega solo `BLOB_READ_WRITE_TOKEN`.
4. En **Settings → Environment Variables**, agrega:
   - `APP_PIN`: la clave que les va a pedir la web. Compártela solo con tu pareja.
   - `PEOPLE`: `Sebas,Laura` (o los nombres que quieran, separados por coma).
5. Ve a **Deployments** y haz **Redeploy** del último despliegue para que tome las variables.

La primera vez que se abre la web se cargan 7 lugares y 2 recetas de ejemplo. Se borran con el botón **Borrar ejemplos**. Para no cargarlos, agrega `SEED=off` antes del primer ingreso.

Cada `git push` a `main` vuelve a publicar la web automáticamente.

## Probar en tu computador

```bash
npm install
APP_PIN=1234 npm run dev
```

Abre <http://localhost:3000>. Sin las variables de Upstash y Blob, todo se guarda en memoria mientras el servidor esté encendido.

## GitHub Pages

Si activas GitHub Pages, la web abre en **modo demostración**: se ve completa con los ejemplos, pero no guarda cambios, porque Pages no puede ejecutar la carpeta `api/`. Para usarla de verdad, usa la dirección de Vercel.

## Estructura

```
index.html        la web completa (estilo editorial crema/negro, modo oscuro)
api/data.js       GET: todos los datos · POST: crear, actualizar o borrar
api/upload.js     POST: sube una foto o un audio a Vercel Blob
lib/              almacenamiento, fotos, clave y datos de ejemplo
img/              foto del ejemplo de Ciro BBQ
scripts/dev.mjs   servidor local
test-ci/          el test de CI en pareja
```
