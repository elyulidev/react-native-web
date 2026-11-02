import type { CurriculumTopic } from "../../../../types/types";

export const conference14: CurriculumTopic = {
	id: "conf-14",
	title: "Conf. 14: Almacenamiento Local",
	content: [
		{ type: "heading", text: "Almacenamiento Local: Datos que Sobreviven al Cierre de la App" },
		{
			type: "paragraph",
			text: "Hasta acá guardaste estado en memoria con `useState` y lo compartiste entre pantallas con Context. Pero todo eso tiene la misma vida que el proceso: cerrás la app y desaparece. El almacenamiento local es la capa que escribe en el disco del dispositivo para que los datos sigan ahí en el próximo arranque.",
		},
		{
			type: "paragraph",
			text: "Esta conferencia no va sobre una librería: va sobre **elegir** la librería correcta. Primero el mapa de opciones que existen, después la que conviene por defecto, y al final la implementás en un hook real.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Qué es (y qué no es) el almacenamiento local" },
		{
			type: "list",
			items: [
				"**Vive en el dispositivo:** cada app corre en su propio sandbox. Otra app no puede leer tus datos, y vos no podés leer los de ella.",
				"**Persiste:** sobrevive a cerrar la app, a reiniciar el teléfono y, en general, a las actualizaciones.",
				"**No se sincroniza solo:** si el usuario cambia de teléfono o reinstala, en la mayoría de los casos esos datos se pierden. Lo que no podés perder va al backend.",
				"**Es rápido y funciona offline:** por eso es el lugar natural para preferencias, caché de respuestas y borradores.",
			],
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Regla mental: el almacenamiento local es una caché y un lugar para preferencias. La fuente de verdad de los datos del usuario vive en tu servidor. Si tu app no puede reconstruir su estado después de una reinstalación, el problema no es la librería de storage: te falta backend.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. El mapa: qué librerías existen" },
		{
			type: "paragraph",
			text: "En React Native no existe el `localStorage` del navegador. Hay varias librerías y cada una resuelve un problema distinto. Estas son las que te vas a cruzar en proyectos reales:",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "RectangleStackIcon",
					title: "AsyncStorage",
					text: "Clave-valor asíncrono y sin cifrar. La opción por defecto para preferencias. Funciona en Expo Go.",
				},
				{
					icon: "DocumentTextIcon",
					title: "expo-sqlite / kv-store",
					text: "La misma API de AsyncStorage, pero guardando sobre SQLite. Sin dependencia extra y con variante síncrona.",
				},
				{
					icon: "KeyIcon",
					title: "expo-secure-store",
					text: "Clave-valor cifrado en Keychain (iOS) y Keystore (Android). Solo para secretos: tokens y credenciales.",
				},
				{
					icon: "BoltIcon",
					title: "react-native-mmkv",
					text: "El más rápido: síncrono y del orden de 30 veces más veloz que AsyncStorage. Necesita development build.",
				},
			],
		},
		{
			type: "paragraph",
			text: "Y cuando el dato no es simplemente una clave con un valor:",
		},
		{
			type: "list",
			items: [
				"**expo-sqlite:** una base SQLite completa en el dispositivo. La elegís cuando necesitás consultar, filtrar, ordenar o relacionar tablas. Es la base del módulo 3 con Drizzle.",
				"**expo-file-system:** archivos en el disco: imágenes descargadas, PDFs, JSON grandes. La API actual trabaja con `File`, `Directory` y `Paths`; la vieja API de `documentDirectory` y `copyAsync` está deprecada.",
				"**Capas sobre SQLite (Drizzle, Knex):** cuando querés escribir consultas en TypeScript en lugar de SQL a mano, o manejar migraciones ordenadas.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Cómo elegir en treinta segundos" },
		{
			type: "list",
			items: [
				"¿Es un secreto (token de sesión, contraseña, clave de API)? → `expo-secure-store`.",
				"¿Es una preferencia o un dato chico que nunca consultás con filtros (tema, idioma, onboarding visto)? → `AsyncStorage`.",
				"¿Necesitás consultar, filtrar o relacionar registros? → `expo-sqlite` (+ Drizzle).",
				"¿Es un archivo (imagen, PDF, video)? → `expo-file-system`.",
				"¿Necesitás escribir muchísimo y rápido desde el hilo de JavaScript? → `react-native-mmkv`.",
			],
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Elegir mal no siempre rompe la app en el momento. Elegir AsyncStorage para un token sí rompe la seguridad, y lo vamos a ver en la sección 5.",
		},
		{ type: "divider" },

		{ type: "subtitle", id: "async-storage", text: "4. AsyncStorage: la opción por defecto" },
		{
			type: "paragraph",
			text: "De todas las opciones, **AsyncStorage** es la más popular y la más fácil de empezar: se instala en un comando, funciona en Expo Go sin configuración nativa y su API es tan estándar que las demás librerías la imitan. Si tu dato es chico y no es un secreto, empezá acá.",
		},
		{
			type: "code",
			language: "bash",
			code: `bun expo install @react-native-async-storage/async-storage`,
		},
		{
			type: "list",
			items: [
				"**Asíncrono:** `setItem` y `getItem` devuelven Promises, así que se usan con `async/await`.",
				"**Clave-valor:** guardás un valor asociado a una clave única. No hay tablas ni consultas.",
				"**Solo strings:** es la restricción que más sorprende. Para guardar objetos o arrays los serializás con `JSON.stringify()` y los reconstruís con `JSON.parse()`.",
				"**removeItem no falla:** si la clave no existe, no hace nada. `getItem` devuelve `null` cuando no hay valor.",
			],
		},
		{
			type: "code",
			language: "typescript",
			code: `
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'app:theme';

// --- Guardar un string ---
await AsyncStorage.setItem(THEME_KEY, 'dark');

// --- Leer: devuelve null si la clave no existe ---
const theme = await AsyncStorage.getItem(THEME_KEY);
console.log(theme); // 'dark'

// --- Borrar ---
await AsyncStorage.removeItem(THEME_KEY);
`,
		},
		{
			type: "paragraph",
			text: "Para datos que no son strings, serializás en la frontera y deserializás al leer. Un objeto de perfil queda así:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
const PROFILE_KEY = 'app:profile';

async function saveProfile(profile) {
  // AsyncStorage solo guarda strings: el objeto viaja como JSON
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

async function loadProfile() {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  // null cuando nunca se guardó nada
  return raw ? JSON.parse(raw) : null;
}
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Nombrá las claves con un prefijo (app:theme, app:profile). La función getAllKeys() te devuelve todas las claves del dispositivo, incluidas las de librerías de terceros, y el prefijo es lo que te permite distinguir las tuyas y limpiarlas sin tocar las ajenas.",
		},
		{
			type: "paragraph",
			text: "Guardar puede fallar (disco lleno, permisos, datos corruptos de una versión anterior). `AsyncStorage` no es un lugar donde dejar escapar una excepción sin atrapar:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
async function saveTheme(theme) {
  try {
    await AsyncStorage.setItem('app:theme', theme);
  } catch (error) {
    // La app sigue funcionando: el tema simplemente no se recordará
    console.warn('No se pudo guardar el tema', error);
  }
}
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "En Android, el backend de AsyncStorage es SQLite con un tamaño máximo de 6 MB por defecto. Si necesitás más, se amplía con la propiedad AsyncStorage_db_size_in_MB en android/gradle.properties, lo que implica un development build. Es otra señal de que los datos grandes no pertenecen acá.",
		},
		{
			type: "callout",
			alertType: "info",
			text: "Con expo install en SDK 57 y SDK 58 obtenés la v2.2.0, que es la que usa el curso. La v3 (publicada en 2026) introdujo scoped storages con createAsyncStorage('user'); el import por defecto sigue funcionando igual. Si instalás con npm install vas a recibir la v3, y esa es la diferencia que vas a notar.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "5. El límite que importa: los secretos" },
		{
			type: "paragraph",
			text: "AsyncStorage **no cifra nada**. En un dispositivo con root o en un backup mal protegido, un token guardado ahí se lee como texto plano. Los secretos van a `expo-secure-store`, que los cifra usando el Keychain de iOS y el Keystore de Android.",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Nunca guardes en AsyncStorage un token de sesión, una contraseña ni una clave de API. Y tampoco uses SecureStore para todo: está pensado para valores chicos, no para cachés de listas.",
		},
		{
			type: "code",
			language: "bash",
			code: `bun expo install expo-secure-store`,
		},
		{
			type: "code",
			language: "typescript",
			code: `
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'session:token';

// Misma forma de clave-valor, pero cifrada por el sistema operativo
await SecureStore.setItemAsync(TOKEN_KEY, token);

const token = await SecureStore.getItemAsync(TOKEN_KEY);

await SecureStore.deleteItemAsync(TOKEN_KEY);
`,
		},
		{
			type: "list",
			items: [
				"**Payloads chicos:** la documentación de Expo advierte que iOS históricamente rechazaba valores de más de unos 2048 bytes. No es un lugar para JSON grandes.",
				"**Persistencia distinta según plataforma:** en iOS los datos sobreviven a la desinstalación con el mismo bundle ID (comportamiento del Keychain); en Android se borran al desinstalar.",
				"**Biometría:** con `requireAuthentication: true` el valor se libera solo después de Face ID o huella. Si el usuario cambia sus biometrías, el valor se invalida y deja de poder leerse.",
				"**No disponible en web:** `expo-secure-store` soporta Android, iOS y tvOS. Si tu app también corre en navegador, necesitás otro camino para esa plataforma.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "6. El atajo moderno: expo-sqlite/kv-store" },
		{
			type: "paragraph",
			text: "Si en tu proyecto ya usás `expo-sqlite` (por ejemplo, porque el módulo 3 trae Drizzle), Expo ofrece un almacén clave-valor **compatible con la API de AsyncStorage** y sin dependencia extra. La migración es literalmente cambiar el import:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// Antes
import AsyncStorage from '@react-native-async-storage/async-storage';

// Después: misma API, backend SQLite, cero dependencias nuevas
import Storage from 'expo-sqlite/kv-store';

await Storage.setItem('app:theme', 'dark');
const theme = await Storage.getItem('app:theme');
`,
		},
		{
			type: "list",
			items: [
				"**Sin instalar nada:** `expo-sqlite` forma parte del SDK, así que el almacén viene incluido.",
				"**Síncrono y asíncrono:** además de las versiones con `await`, expone `getItemSync` y `setItemSync` para lecturas inmediatas.",
				"**Mismos métodos:** `getItem`, `setItem`, `removeItem`, `getAllKeys` y `clear` funcionan igual que en AsyncStorage.",
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Para el curso seguimos con AsyncStorage porque es la que vas a encontrar en la mayoría de los proyectos y tutoriales, y porque su API es el denominador común. Sabiendo una, la otra es un cambio de import.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "7. Tarea Práctica: un hook usePersistentState" },
		{
			type: "paragraph",
			text: "Vamos a envolver `useState` con AsyncStorage para obtener un estado que sobrevive al cierre de la app. Es el patrón que usan las apps reales para recordar preferencias, y te obliga a lidiar con lo más delicado del almacenamiento asíncrono: la carga inicial.",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Ojo con el bug clásico: si guardás en un useEffect que corre antes de que termine la lectura, la primera escritura pisa el valor guardado con el initialValue. Solución: un flag de hidratación que bloquee las escrituras hasta que la carga terminó.",
		},
		{
			type: "assignment",
			assignmentId: "conf-14-persistent-state-hook",
			description: [
				"Requisitos:",
				"1. Tu hook debe llamarse usePersistentState y vivir en hooks/usePersistentState.ts.",
				"2. Debe aceptar una clave (key) y un valor inicial (initialValue), y ser genérico: usePersistentState<T>(key: string, initialValue: T).",
				"3. Debe devolver la misma tupla que useState: [value, setValue].",
				"4. Al montarse, debe leer el valor guardado con AsyncStorage.getItem y parsearlo con JSON.parse. Si no hay nada, usa el initialValue.",
				"5. Debe guardar automáticamente cada cambio con AsyncStorage.setItem y JSON.stringify, pero recién después de la carga inicial.",
				"6. Si la lectura o la escritura fallan, la app no puede romperse: capturá el error, loguealo y seguí con el valor actual.",
			],
			code: `
// hooks/usePersistentState.ts (Tu solución acá)
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Requisitos:
// 1. Recibí una key y un initialValue.
// 2. Devolvé la tupla [value, setValue].
// 3. Cargá el valor guardado una sola vez al montar.
// 4. Guardá cada cambio, pero no antes de terminar la carga.
// 5. Si algo falla, no rompas la app: logueá y seguí.

// --- Cómo usarlo (para probar tu hook) ---
import { View, Text, Pressable } from 'react-native';
import { usePersistentState } from '../hooks/usePersistentState';

export default function CounterScreen() {
  // El contador sobrevive a cerrar y volver a abrir la app
  const [count, setCount] = usePersistentState<number>('counter', 0);

  return (
    <View className="items-center gap-4 p-6">
      <Text className="text-2xl">Contador: {count}</Text>
      <Pressable
        className="rounded-xl bg-primary-600 px-4 py-2"
        onPress={() => setCount(count + 1)}
      >
        <Text className="text-white">Incrementar</Text>
      </Pressable>
    </View>
  );
}
`,
		},
		{
			type: "paragraph",
			text: "Probá el resultado a mano: incrementá el contador, cerrá la app por completo y volvé a abrirla. Después cambiá el `initialValue` y confirmá que el contador **no** se reinicia, porque el valor guardado tiene prioridad.",
		},
	],
};
