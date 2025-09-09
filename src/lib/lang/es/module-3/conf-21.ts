import type { CurriculumTopic } from "../../../../types/types";

export const conference21: CurriculumTopic = {
	id: "conf-21",
	title: "Conf. 21: Migraciones",
	content: [
		{ type: "heading", text: "Generación y Aplicación de Migraciones" },
		{
			type: "paragraph",
			text: "Objetivo: Comprender el concepto de migraciones de base de datos, aprender a generar archivos de migración con Drizzle Kit a partir de cambios en el esquema y aplicar estas migraciones de forma segura en la aplicación.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. ¿Qué son las Migraciones?" },
		{
			type: "paragraph",
			text: "Imagina que tu aplicación ya está en producción y necesitas añadir una nueva columna a tu tabla de usuarios. No puedes simplemente borrar la base de datos y empezar de nuevo, ¡perderías todos los datos de los usuarios! Aquí es donde entran las migraciones.",
		},
		{
			type: "paragraph",
			text: "Una migración es un archivo (generalmente SQL) que contiene las instrucciones para actualizar el esquema de una base de datos de una versión a otra de forma segura, sin perder datos. Drizzle Kit automatiza la creación de estos archivos por nosotros.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Generando Migraciones con `drizzle-kit generate`",
		},
		{
			type: "paragraph",
			text: "Cada vez que realices un cambio en tu archivo `db/schema.ts` (añadir una tabla, modificar una columna, etc.), debes generar una nueva migración. Para ello, usamos el script npm que creamos anteriormente.",
		},
		{ type: "code", language: "bash", code: "npm run generate" },
		{ type: "paragraph", text: "Este comando hará dos cosas:" },
		{
			type: "list",
			items: [
				"Comparará el estado actual de tu `schema.ts` con el último estado conocido (guardado en la carpeta `drizzle`).",
				"Generará un nuevo archivo `.sql` dentro de la carpeta `drizzle` con las sentencias SQL necesarias para aplicar los cambios. Por ejemplo, `ALTER TABLE users ADD COLUMN...`.",
			],
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Es una buena práctica revisar el archivo SQL generado para asegurarte de que los cambios son los que esperas antes de aplicarlos.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Aplicando Migraciones en Tiempo de Ejecución en Expo",
		},
		{
			type: "paragraph",
			text: "A diferencia del desarrollo web donde podrías aplicar migraciones desde la línea de comandos, en una aplicación móvil, la base de datos de cada usuario está en su propio dispositivo. Por lo tanto, debemos aplicar las migraciones cuando la aplicación se inicia.",
		},
		{
			type: "paragraph",
			text: "Drizzle ORM para Expo proporciona un hook personalizado, `useMigrations`, que se encarga de esto de forma automática y segura.",
		},
		{
			type: "paragraph",
			text: "Primero, necesitamos configurar `babel` y `metro` para que puedan importar archivos `.sql`.",
		},
		{
			type: "code",
			language: "javascript",
			code: `
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('sql'); // Añadir esta línea
module.exports = config;

// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [["inline-import", { "extensions": [".sql"] }]] // Añadir esta línea
  };
};
`,
		},
		{
			type: "paragraph",
			text: "Luego, en el componente raíz de nuestra aplicación (como `App.tsx` o el layout raíz), usamos el hook:",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations'; // Importa el objeto de migraciones
import { db } from './db'; // Tu instancia de base de datos Drizzle
import { Text, View } from 'react-native';

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View>
        <Text>Error de migración: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Aplicando migraciones...</Text>
      </View>
    );
  }

  return (
    // El resto de tu aplicación, que ahora tiene la certeza
    // de que la base de datos está actualizada.
    <View>
      <Text>¡Migraciones aplicadas con éxito!</Text>
    </View>
  );
}
`,
		},
		{
			type: "list",
			items: [
				"**`useMigrations(db, migrations)`**: Este hook revisa la base de datos del usuario, comprueba qué migraciones ya se han aplicado y ejecuta solo las que faltan.",
				"**`success`**: Se vuelve `true` una vez que todas las migraciones pendientes se han aplicado correctamente.",
				"**`error`**: Contendrá un objeto de error si algo sale mal durante el proceso.",
			],
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál es el propósito principal de una migración de base de datos?",
					options: [
						"Hacer una copia de seguridad de los datos.",
						"Actualizar el esquema de la base de datos de forma segura sin perder datos.",
						"Poblar la base de datos con datos de prueba.",
						"Optimizar las consultas SQL.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Qué comando de Drizzle Kit se utiliza para crear un archivo de migración SQL basado en los cambios del esquema?",
					options: [
						"drizzle-kit push",
						"drizzle-kit apply",
						"drizzle-kit generate",
						"drizzle-kit studio",
					],
					correctAnswer: 2,
				},
				{
					question:
						"En una aplicación Expo, ¿cuándo y cómo se aplican las migraciones a la base de datos del usuario?",
					options: [
						"Manualmente por el usuario desde los ajustes.",
						"Se aplican en tiempo de ejecución al iniciar la app, usando el hook `useMigrations`.",
						"Automáticamente al compilar la app.",
						"No se aplican en producción, solo en desarrollo.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Qué devuelve el hook `useMigrations` cuando las migraciones aún se están aplicando?",
					options: [
						"`{ success: false, error: null }`",
						"`{ success: true, error: null }`",
						"`{ success: false, error: 'pending' }`",
						"No devuelve nada hasta que termina.",
					],
					correctAnswer: 0,
				},
			],
		},
	],
};
