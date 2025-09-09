import type { CurriculumTopic } from "../../../../types/types";

export const conference14: CurriculumTopic = {
	id: "conf-14",
	title: "Conf. 14: Hooks Personalizados",
	content: [
		{ type: "heading", text: "Hooks Personalizados y Reutilización de Lógica" },
		{
			type: "paragraph",
			text: "Los Hooks Personalizados son una de las características más poderosas de React. Nos permiten extraer la lógica de estado de un componente para que pueda ser reutilizada de forma independiente. Si te encuentras escribiendo la misma lógica de estado en varios componentes (como manejar la carga de datos, suscripciones, etc.), es el momento perfecto para crear un Hook Personalizado.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Principios Fundamentales" },
		{
			type: "list",
			items: [
				"**Nomenclatura:** Un Hook Personalizado es una función de JavaScript cuyo nombre comienza con `use`. Por ejemplo, `useTheme`, `useFetchData`, `useDebounce`.",
				"**Composición:** Pueden llamar a otros Hooks dentro de ellos (ej. `useState`, `useEffect`, `useContext`).",
				"**No comparten estado:** Cada vez que usas un Hook Personalizado en un componente, obtienes un estado completamente nuevo e independiente. Los hooks reutilizan la *lógica*, no el *estado*.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Ejemplo Práctico 1: `useToggle`" },
		{
			type: "paragraph",
			text: "Un caso de uso muy común es tener un estado booleano que se alterna (como para un modal o un menú desplegable). En lugar de escribir `const [isOpen, setIsOpen] = useState(false);` y la función `toggle` cada vez, podemos crear un hook para ello.",
		},
		{
			type: "paragraph",
			text: "Crea una carpeta `hooks` en la raíz de tu proyecto y dentro, un archivo `useToggle.ts`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// hooks/useToggle.ts
import { useState, useCallback } from 'react';

export const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);

  return [state, toggle];
};
`,
		},
		{
			type: "paragraph",
			text: "Ahora, en cualquier componente, podemos usarlo de forma mucho más limpia:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { View, Text, Button } from 'react-native';
import { useToggle } from '../hooks/useToggle';

const MenuComponent = () => {
  const [isOpen, toggleMenu] = useToggle(false);

  return (
    <View>
      <Button title={isOpen ? "Cerrar Menú" : "Abrir Menú"} onPress={toggleMenu} />
      {isOpen && <Text>Contenido del menú...</Text>}
    </View>
  );
};

export default MenuComponent;
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Ejemplo Práctico 2: `useDebounce`" },
		{
			type: "paragraph",
			text: 'En una barra de búsqueda, no queremos hacer una petición a la API con cada letra que el usuario escribe. Queremos esperar a que el usuario termine de escribir. El "debouncing" es la técnica perfecta para esto, y podemos encapsularla en un hook.',
		},
		{
			type: "code",
			language: "typescript",
			code: `
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Configura un temporizador para actualizar el valor debounced después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Función de limpieza: se ejecuta si el valor cambia antes de que termine el temporizador.
    // Esto cancela el temporizador anterior y reinicia el conteo.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Solo se vuelve a ejecutar si el valor o el delay cambian

  return debouncedValue;
}
`,
		},
		{
			type: "paragraph",
			text: "Así lo usaríamos en un componente de búsqueda:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import { useDebounce } from '../hooks/useDebounce';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms de delay

  useEffect(() => {
    // Este efecto solo se ejecutará cuando debouncedSearchTerm cambie,
    // es decir, 500ms después de que el usuario haya dejado de escribir.
    if (debouncedSearchTerm) {
      console.log(\`Buscando en la API: \${debouncedSearchTerm}\`);
      // Aquí harías tu llamada a la API
    }
  }, [debouncedSearchTerm]);

  return (
    <View>
      <TextInput
        placeholder="Buscar..."
        onChangeText={setSearchTerm}
        value={searchTerm}
        className="border p-2 rounded-md"
      />
      <Text className="mt-2">Buscando por: {searchTerm}</Text>
      <Text>Término debounced: {debouncedSearchTerm}</Text>
    </View>
  );
};
export default SearchComponent;
`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			id: "async-storage",
			text: "4. Un Vistazo al Almacenamiento Local: AsyncStorage",
		},
		{
			type: "paragraph",
			text: "Antes de nuestra tarea práctica, necesitamos una forma de guardar datos en el dispositivo del usuario. Para datos simples, como las preferencias del usuario o un token de sesión, `AsyncStorage` es la herramienta perfecta. Es un sistema de almacenamiento de clave-valor, asíncrono y persistente.",
		},
		{
			type: "list",
			items: [
				"**Asíncrono:** Todas sus operaciones (`setItem`, `getItem`) devuelven Promesas, por lo que deben usarse con `async/await`.",
				"**Clave-Valor:** Guardas un valor asociado a una clave única.",
				"**Solo Strings:** ¡Muy importante! `AsyncStorage` solo puede guardar valores de tipo string. Para guardar objetos o arrays, primero debes convertirlos a un string JSON usando `JSON.stringify()`, y para leerlos, debes parsearlos de vuelta con `JSON.parse()`.",
			],
		},
		{
			type: "code",
			language: "javascript",
			code: `
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Guardar datos ---
const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // error guardando
    console.error("Error guardando en AsyncStorage", e);
  }
};

// --- Leer datos ---
const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error leyendo
    console.error("Error leyendo de AsyncStorage", e);
  }
};

// --- Ejemplo de uso ---
const profile = { name: 'Juan', theme: 'dark' };
await storeData('userProfile', profile);

const loadedProfile = await getData('userProfile');
console.log(loadedProfile.name); // 'Juan'
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Con este conocimiento sobre `AsyncStorage`, ahora tienes todo lo necesario para abordar la siguiente tarea práctica.",
		},

		{
			type: "subtitle",
			text: "5. Tarea Práctica: Crear un Hook `usePersistentState`",
		},
		{
			type: "paragraph",
			text: "Ahora vamos a crear un hook que actúe como `useState` pero que además guarde el valor en el almacenamiento local del dispositivo usando `AsyncStorage`. Esto es increíblemente útil para recordar preferencias del usuario, como el tema de la aplicación.",
		},
		{
			type: "assignment",
			assignmentId: "conf-14-persistent-state-hook",
			description: [
				"**Requisitos:**",
				"1. Tu hook debe llamarse `usePersistentState`.",
				"2. Debe aceptar una clave (`key`) y un valor inicial (`initialValue`).",
				"3. Debe devolver un array con el estado actual y una función para actualizarlo, igual que `useState`.",
				"4. Al iniciarse, debe intentar leer el valor desde `AsyncStorage` usando la clave. Si no encuentra nada, debe usar el `initialValue`.",
				"5. Cada vez que el estado cambie, debe guardar automáticamente el nuevo valor en `AsyncStorage`.",
			],
			code: `
// hooks/usePersistentState.js (Tu solución aquí)
// Necesitarás importar 'useState', 'useEffect' y 'AsyncStorage'
// Consejo: AsyncStorage es asíncrono, así que la carga inicial debe hacerse en un useEffect.

// --- Cómo usarlo (para probar tu hook) ---
import { View, Text, Button } from 'react-native';
import { usePersistentState } from './hooks/usePersistentState'; // Ajusta la ruta

export default function CounterComponent() {
  // Usamos el hook para un contador que sobrevive a los reinicios de la app
  const [count, setCount] = usePersistentState('counter', 0);

  return (
    <View className="items-center">
      <Text className="text-2xl">Contador: {count}</Text>
      <Button title="Incrementar" onPress={() => setCount(count + 1)} />
    </View>
  );
}
`,
		},
	],
};
