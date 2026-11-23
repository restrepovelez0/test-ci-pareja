// Lugares de ejemplo que se cargan una sola vez, cuando la base de datos está vacía.
// Se pueden borrar desde la web con el botón "Borrar ejemplos".
const t = Date.UTC(2026, 10, 1);

export const seed = {
  places: [
    { id: "ej-1", nombre: "Tostadero La Loma", tipo: "cafeteria", cocinas: ["Café de especialidad"], cocina: "Café de especialidad", zona: "laureles", direccion: "Circular 4 #70", precio: 1, estado: "visitado", tags: ["Para trabajar", "Café de especialidad"], ejemplo: true, createdAt: t - 5e8 },
    { id: "ej-2", nombre: "Brasa & Leña", tipo: "restaurante", cocinas: ["Carnes", "Argentina"], cocina: "Carnes, Argentina", zona: "poblado", direccion: "Cra. 37 #8A", precio: 3, estado: "visitado", tags: ["Cita", "Terraza"], ejemplo: true, createdAt: t - 4e8 },
    { id: "ej-3", nombre: "Casa Guayaba", tipo: "restaurante", cocinas: ["Colombiana", "Tradicional"], cocina: "Colombiana, Tradicional", zona: "envigado", direccion: "Calle 38 Sur #43", precio: 2, estado: "visitado", tags: ["Para ir con amigos"], ejemplo: true, createdAt: t - 3e8 },
    { id: "ej-4", nombre: "Fonda Doña Tina", tipo: "restaurante", cocinas: ["Tradicional", "Colombiana"], cocina: "Tradicional, Colombiana", zona: "laspalmas", direccion: "Km 7 vía Las Palmas", precio: 2, estado: "visitado", tags: ["Terraza", "Pet friendly"], ejemplo: true, createdAt: t - 2e8 },
    { id: "ej-5", nombre: "Grano Fino", tipo: "cafeteria", cocinas: ["Brunch", "Panadería"], cocina: "Brunch, Panadería", zona: "poblado", direccion: "Provenza", precio: 2, estado: "por-probar", tags: ["Brunch", "Postres"], ejemplo: true, createdAt: t - 1e8 },
    { id: "ej-6", nombre: "Mar de Pacífico", tipo: "restaurante", cocinas: ["Mariscos", "Colombiana"], cocina: "Mariscos, Colombiana", zona: "belen", direccion: "Calle 30A", precio: 2, estado: "por-probar", tags: [], ejemplo: true, createdAt: t - 5e7 },
    { id: "ej-7", nombre: "Ciro BBQ", tipo: "restaurante", cocinas: ["Carnes"], cocina: "Carnes", zona: "otra", direccion: "", precio: 0, estado: "por-probar", tags: ["Para ir con amigos"], ejemplo: true, createdAt: t - 1e7 },
  ],
  reviews: [
    { id: "ej-1__ejemplo-sebas", placeId: "ej-1", by: "ejemplo-sebas", sabor: 5, servicio: 4, ambiente: 4, precio: 5, comentario: "El filtrado de Huila estaba increíble. Buen sitio para trabajar en la mañana.", pedir: "V60 y pandebono", fecha: "2026-10-12", volveria: "si" },
    { id: "ej-1__ejemplo-laura", placeId: "ej-1", by: "ejemplo-laura", sabor: 4, servicio: 4, ambiente: 5, precio: 4, comentario: "Muy tranquilo y con buena música. Pocas mesas con enchufe.", pedir: "Latte de avena", fecha: "2026-10-12", volveria: "si" },
    { id: "ej-2__ejemplo-sebas", placeId: "ej-2", by: "ejemplo-sebas", sabor: 5, servicio: 3, ambiente: 4, precio: 3, comentario: "La posta muy buena, pero esperamos 40 minutos.", pedir: "Bife de chorizo", fecha: "2026-09-20", volveria: "quizas" },
    { id: "ej-2__ejemplo-laura", placeId: "ej-2", by: "ejemplo-laura", sabor: 4, servicio: 3, ambiente: 5, precio: 3, comentario: "La terraza es lindísima para una cita.", pedir: "Provoleta", fecha: "2026-09-20", volveria: "si" },
    { id: "ej-3__ejemplo-sebas", placeId: "ej-3", by: "ejemplo-sebas", sabor: 3, servicio: 4, ambiente: 3, precio: 3, comentario: "Bien, pero nada que me haga volver.", pedir: "", fecha: "2026-11-02", volveria: "no" },
    { id: "ej-3__ejemplo-laura", placeId: "ej-3", by: "ejemplo-laura", sabor: 5, servicio: 4, ambiente: 4, precio: 4, comentario: "El ajiaco de autor es de los mejores que he probado.", pedir: "Ajiaco y postre de natas", fecha: "2026-11-02", volveria: "si" },
    { id: "ej-4__ejemplo-sebas", placeId: "ej-4", by: "ejemplo-sebas", sabor: 4, servicio: 5, ambiente: 5, precio: 4, comentario: "Frijoles como los de la casa y vista a toda la ciudad.", pedir: "Bandeja paisa para compartir", fecha: "2026-08-30", volveria: "si" },
  ],
  recipes: [
    { id: "rec-ej-1", nombre: "Ceviche clásico", cocinas: ["Peruana", "Mariscos"], cocina: "Peruana, Mariscos", facilidad: "media", precio2: 45000, preparacion: "1. Cortar 300 g de pescado blanco en cubos de 2 cm.\n2. Exprimir 8 limones y mezclar con sal, ají y ajo rallado.\n3. Bañar el pescado y dejar 5 minutos.\n4. Agregar cebolla morada en pluma y cilantro.\n5. Servir con camote y maíz.", ejemplo: true, createdAt: t - 3e8 },
    { id: "rec-ej-2", nombre: "Pasta al pesto", cocinas: ["Italiana", "Vegetariana"], cocina: "Italiana, Vegetariana", facilidad: "facil", precio2: 28000, preparacion: "1. Licuar albahaca, ajo, nueces, queso parmesano y aceite de oliva.\n2. Cocinar 200 g de pasta al dente.\n3. Mezclar con el pesto y un poco del agua de cocción.", ejemplo: true, createdAt: t - 2e8 },
  ],
  recipeReviews: [
    { id: "rec-ej-1__ejemplo-sebas", recipeId: "rec-ej-1", by: "ejemplo-sebas", sabor: 5, presentacion: 4, vale: 5, comentario: "Quedó ácido y fresco.", ajuste: "Un poco más de ají", fecha: "2026-10-20", volveria: "si" },
    { id: "rec-ej-1__ejemplo-laura", recipeId: "rec-ej-1", by: "ejemplo-laura", sabor: 4, presentacion: 5, vale: 4, comentario: "Me encantó con el camote.", ajuste: "", fecha: "2026-10-20", volveria: "si" },
    { id: "rec-ej-2__ejemplo-laura", recipeId: "rec-ej-2", by: "ejemplo-laura", sabor: 4, presentacion: 3, vale: 5, comentario: "Rápida para entre semana.", ajuste: "Tostar las nueces antes", fecha: "2026-11-05", volveria: "si" },
  ],
  photos: [
    { id: "ej-ph-1", placeId: "ej-7", by: "ejemplo-sebas", url: "/img/ciro-bbq.jpg", w: 1600, h: 1067, createdAt: t },
  ],
};
