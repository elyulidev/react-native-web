import type { CurriculumTopic } from "../../../../types/types";

export const conference8: CurriculumTopic = {
	id: "conf-8",
	title: "Conf. 8: Mini Proyecto UI",
	content: [
		{ type: "heading", text: "Mini Proyecto: Creando una Tarjeta de Película" },
		{
			type: "paragraph",
			text: "¡Es hora de poner en práctica todo lo que hemos aprendido en el Módulo 1! En este mini proyecto, construiremos un componente de UI reutilizable y visualmente atractivo: una tarjeta de película. Este ejercicio consolidará tus conocimientos sobre componentes, layout con Flexbox, estilización con NativeWind y gestión de assets.",
		},
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/conf-8/movie-card.webp"
					: "/conf8/movie-card.webp",
			caption: "El componente `MovieCard` que construiremos.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 1: Preparación del Componente y Assets" },
		{
			type: "paragraph",
			text: "Primero, creemos el archivo para nuestro nuevo componente. Dentro de tu proyecto, crea una carpeta `components` (si aún no existe) y dentro de ella, un nuevo archivo llamado `MovieCard.tsx`.",
		},
		{
			type: "paragraph",
			text: "Copia el siguiente código base en tu nuevo archivo. Este será nuestro punto de partida.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para la película
const movieData = {
  posterUrl: 'https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/movie-poster-interstellar.jpg',
  title: 'Interstellar',
  year: '2014',
  genre: 'Ciencia Ficción',
  rating: '8.6',
};

const MovieCard = () => {
  // Aquí construiremos nuestro componente
  return (
    <View>
      <Text>Tarjeta de Película</Text>
    </View>
  );
};

export default MovieCard;
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "Para la imagen del póster, usaremos una URL. En un proyecto real, podrías obtener estos datos de una API o de tus assets locales.",
		},

		{ type: "divider" },

		{
			type: "subtitle",
			text: "Paso 2: Estructura Principal y Estilo del Contenedor",
		},
		{
			type: "paragraph",
			text: "Vamos a empezar por el contenedor principal. Queremos que tenga un fondo oscuro, esquinas redondeadas y una sombra para que parezca una tarjeta. Usaremos NativeWind para esto.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// ... (importaciones y datos)

const MovieCard = () => {
  return (
    // Contenedor principal de la tarjeta
    <View className="bg-slate-800 rounded-2xl overflow-hidden w-full max-w-xs shadow-lg">
      {/* Aquí irán la imagen y los detalles */}
    </View>
  );
};

export default MovieCard;
`,
		},
		{
			type: "list",
			items: [
				"**`bg-slate-800`**: Establece un color de fondo gris oscuro.",
				"**`rounded-2xl`**: Aplica un radio de borde grande para esquinas suaves.",
				"**`overflow-hidden`**: Asegura que la imagen que pongamos dentro también tenga las esquinas redondeadas.",
				"**`w-full max-w-xs`**: Hace que la tarjeta ocupe todo el ancho disponible hasta un máximo de `xs` (extra small).",
				"**`shadow-lg`**: Añade una sombra pronunciada (más visible en iOS).",
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Paso 3: Añadir la Imagen del Póster" },
		{
			type: "paragraph",
			text: "Ahora, añadamos la imagen del póster dentro de nuestro contenedor. Haremos que ocupe todo el ancho de la tarjeta y le daremos una altura fija.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// ...

const MovieCard = () => {
  return (
    <View className="bg-slate-800 rounded-2xl overflow-hidden w-full max-w-xs shadow-lg">
      <Image
        source={{ uri: movieData.posterUrl }}
        className="w-full h-96"
      />
      {/* Contenedor para los detalles de la película */}
    </View>
  );
};

// ...
`,
		},
		{
			type: "list",
			items: [
				"**`source={{ uri: movieData.posterUrl }}`**: Carga la imagen desde la URL que definimos.",
				"**`w-full h-96`**: La imagen ocupará el 100% del ancho del contenedor y tendrá una altura de 96 unidades (384px por defecto).",
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Paso 4: Añadir los Detalles de la Película" },
		{
			type: "paragraph",
			text: "Debajo de la imagen, crearemos una sección con el título, el género y la calificación. Usaremos un `<View>` con padding y flexbox para organizar el contenido.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// ...

const MovieCard = () => {
  return (
    <View className="bg-slate-800 rounded-2xl overflow-hidden w-full max-w-xs shadow-lg">
      <Image
        source={{ uri: movieData.posterUrl }}
        className="w-full h-96"
      />
      {/* Contenedor para los detalles */}
      <View className="p-4">
        <Text className="text-white text-2xl font-bold mb-1">{movieData.title}</Text>
        <Text className="text-slate-400 text-base mb-3">{movieData.year} · {movieData.genre}</Text>

        {/* Contenedor para la calificación */}
        <View className="flex-row items-center gap-2">
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text className="text-white text-lg font-semibold">{movieData.rating}</Text>
        </View>
      </View>
    </View>
  );
};
// ...
`,
		},
		{
			type: "list",
			items: [
				"**`p-4`**: Añade padding alrededor de la sección de detalles.",
				"**`text-white`, `text-slate-400`**: Aplica colores para el texto, creando jerarquía visual.",
				"**`text-2xl`, `text-base`, `font-bold`**: Controla el tamaño y el peso de la fuente.",
				"**`mb-1`, `mb-3`**: Añade margen inferior para espaciar los elementos.",
				"**`flex-row items-center gap-2`**: Crea un layout horizontal para la calificación, alinea los elementos verticalmente al centro y añade un pequeño espacio entre el ícono y el texto.",
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Paso 5: Añadir un Botón de Acción" },
		{
			type: "paragraph",
			text: 'Para completar nuestra tarjeta, añadiremos un botón "Ver Detalles". Usaremos el componente `<Pressable>` para que sea interactivo y lo estilizaremos para que se destaque.',
		},
		{
			type: "code",
			language: "jsx",
			code: `
// ... (dentro del View con p-4, después de la calificación)

        {/* ... (código de la calificación) */}

        <Pressable className="bg-primary-500 rounded-lg py-3 mt-4">
          <Text className="text-white font-bold text-center text-lg">Ver Detalles</Text>
        </Pressable>
`,
		},
		{
			type: "list",
			items: [
				"**`bg-primary-500`**: Usa el color primario definido en nuestro tema para el fondo.",
				"**`rounded-lg py-3 mt-4`**: Da forma al botón con esquinas redondeadas, padding vertical y un margen superior para separarlo del contenido anterior.",
				"**`text-white font-bold text-center text-lg`**: Estiliza el texto del botón para que sea legible y claro.",
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Paso 6: Código Final y Uso del Componente" },
		{
			type: "paragraph",
			text: "¡Felicidades! Has construido un componente complejo y reutilizable. Aquí está el código completo para `MovieCard.tsx`:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const movieData = {
  posterUrl: 'https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/movie-poster-interstellar.jpg',
  title: 'Interstellar',
  year: '2014',
  genre: 'Ciencia Ficción',
  rating: '8.6',
};

const MovieCard = () => {
  return (
    <View className="bg-slate-800 rounded-2xl overflow-hidden w-full max-w-xs shadow-lg">
      <Image
        source={{ uri: movieData.posterUrl }}
        className="w-full h-96"
      />
      <View className="p-4">
        <Text className="text-white text-2xl font-bold mb-1">{movieData.title}</Text>
        <Text className="text-slate-400 text-base mb-3">{movieData.year} · {movieData.genre}</Text>

        <View className="flex-row items-center gap-2">
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text className="text-white text-lg font-semibold">{movieData.rating}</Text>
        </View>

        <Pressable className="bg-primary-500 rounded-lg py-3 mt-4">
          <Text className="text-white font-bold text-center text-lg">Ver Detalles</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MovieCard;
`,
		},
		{
			type: "paragraph",
			text: "Para verlo en acción, importa y usa tu nuevo componente en tu pantalla principal (por ejemplo, `app/index.tsx`):",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { View } from 'react-native';
import MovieCard from '../components/MovieCard'; // Ajusta la ruta si es necesario

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900 p-4">
      <MovieCard />
    </View>
  );
}
`,
		},
		{
			type: "paragraph",
			text: "Este mini proyecto demuestra cómo combinar diferentes componentes y utilidades de estilo para crear interfaces de usuario pulidas y profesionales. ¡Excelente trabajo!",
		},
	],
};
