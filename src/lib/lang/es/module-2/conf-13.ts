import type { CurriculumTopic } from "../../../../types/types";

export const conference13: CurriculumTopic = {
	id: "conf-13",
	title: "Conf. 13: Estado Local y Context API",
	content: [
		{ type: "heading", text: "Gestión de Estado: Local vs. Global" },
		{
			type: "paragraph",
			text: "La gestión del estado es fundamental en cualquier aplicación React Native para controlar la interfaz de usuario y los datos. Esta conferencia explorará cómo manejar el estado a nivel de componente con `useState` y `useEffect`, y cómo escalar la gestión del estado a nivel global en toda la aplicación utilizando la API de Contexto de React.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Uso Avanzado de useState y useEffect" },
		{
			type: "paragraph",
			text: "Estos dos hooks son la base para manejar el estado y los efectos secundarios dentro de un componente.",
		},

		{ type: "paragraph", text: "**`useState` para el Estado Local:**" },
		{
			type: "paragraph",
			text: '`useState` nos permite añadir una "variable de estado" a nuestros componentes. Es perfecto para datos que solo le importan a un componente específico.',
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';

const DataFetcher = () => {
  // Estado para la entrada del usuario
  const [query, setQuery] = useState('');

  // Estados para manejar la carga y errores de una API
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = () => {
    setLoading(true);
    setError(null);
    // Simular una llamada a API
    setTimeout(() => {
      if (query.toLowerCase() === 'error') {
        setError('No se pudieron cargar los datos.');
        setData(null);
      } else {
        setData(\`Datos para: \${query}\`);
        setError(null);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <View className="p-4 border border-slate-300 rounded-lg w-full">
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Escribe 'error' para simular un fallo"
        className="border p-2 rounded-md mb-2"
      />
      <Button title="Buscar Datos" onPress={handleFetch} disabled={loading} />

      {loading && <ActivityIndicator size="large" className="mt-4" />}
      {error && <Text className="text-red-500 mt-4">{error}</Text>}
      {data && <Text className="text-green-600 mt-4">{data}</Text>}
    </View>
  );
};

export default DataFetcher;
`,
		},
		{ type: "paragraph", text: "**`useEffect` para Efectos Secundarios:**" },
		{
			type: "paragraph",
			text: "`useEffect` nos permite ejecutar código que interactúa con el mundo exterior: peticiones a APIs, suscripciones, etc. Se ejecuta después de que el componente se renderiza.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Este código se ejecuta una vez, cuando el componente se monta.
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Función de limpieza: se ejecuta cuando el componente se desmonta.
    // Es crucial para evitar fugas de memoria.
    return () => clearInterval(intervalId);
  }, []); // El array de dependencias vacío [] significa "ejecutar solo una vez".

  return (
    <View>
      <Text>Temporizador: {seconds} segundos</Text>
    </View>
  );
};

export default Timer;
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Introducción al Context API" },
		{
			type: "paragraph",
			text: 'A medida que una aplicación crece, a menudo necesitamos compartir datos entre componentes que están muy separados en el árbol de componentes. Pasar props a través de muchos niveles, conocido como **"prop drilling"**, se vuelve engorroso.',
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/prop-drilling.png",
			caption:
				'"Prop drilling": El componente padre pasa props a través de un componente intermedio para llegar al nieto.',
		},
		{
			type: "paragraph",
			text: 'La Context API de React resuelve este problema creando un "túnel" de datos al que cualquier componente descendiente puede suscribirse, sin necesidad de pasar props manualmente.',
		},
		{
			type: "list",
			items: [
				"**Ideal para:** Información del usuario autenticado, tema (modo claro/oscuro), preferencias de idioma.",
				"**Alternativas:** Para estados más complejos o que se actualizan muy frecuentemente, librerías como Zustand o Redux pueden ofrecer mejor rendimiento y herramientas de desarrollo.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Tutorial: Creando un Proveedor de Tema" },
		{
			type: "paragraph",
			text: "Vamos a construir un sistema de temas (claro/oscuro) usando Context. Es un ejemplo perfecto de estado global.",
		},

		{ type: "paragraph", text: "**Paso 1: Crear el Contexto**" },
		{
			type: "paragraph",
			text: 'Primero, creamos un archivo para nuestro contexto, por ejemplo, `contexts/ThemeContext.tsx`. Aquí definimos la "forma" de nuestro estado y creamos el contexto.',
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { createContext, useContext, useState } from 'react';

// 1. Definir los tipos para nuestro contexto
type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 2. Crear el Contexto con un valor por defecto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Crear el Proveedor (un componente que contendrá nuestra lógica)
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Crear un hook personalizado para usar el contexto fácilmente
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};
`,
		},

		{
			type: "paragraph",
			text: "**Paso 2: Envolver la Aplicación con el Proveedor**",
		},
		{
			type: "paragraph",
			text: "Para que toda la aplicación tenga acceso al contexto, envolvemos nuestro layout raíz (`app/_layout.tsx`) con el `ThemeProvider`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/_layout.tsx
import { Stack } from 'expo-router';
import { ThemeProvider } from '../contexts/ThemeContext'; // Ajusta la ruta

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </ThemeProvider>
  );
}`,
		},

		{
			type: "paragraph",
			text: "**Paso 3: Consumir el Contexto en un Componente**",
		},
		{
			type: "paragraph",
			text: "Ahora, cualquier componente puede acceder al tema y a la función para cambiarlo usando nuestro hook `useTheme`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { View, Text, Button } from 'react-native';
import { useTheme } from '../contexts/ThemeContext'; // Ajusta la ruta

const ThemedComponent = () => {
  const { theme, toggleTheme } = useTheme();

  const isDarkMode = theme === 'dark';
  const containerClass = isDarkMode ? 'bg-slate-900' : 'bg-white';
  const textClass = isDarkMode ? 'text-white' : 'text-black';

  return (
    <View className={'flex-1 items-center justify-center ' + containerClass}>
      <Text className={'text-2xl mb-4 ' + textClass}>
        El tema actual es: {theme}
      </Text>
      <Button title="Cambiar Tema" onPress={toggleTheme} />
    </View>
  );
};

export default ThemedComponent;
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Ventajas y Desventajas del Context API" },
		{
			type: "twoColumn",
			columns: [
				{
					title: "✅ Ventajas",
					content: [
						"**Evita el Prop Drilling:** Su principal beneficio, simplifica el paso de datos.",
						"**Nativo de React:** No necesitas librerías externas para estado global simple.",
						"**Fácil de Aprender:** La API es pequeña y conceptualmente sencilla.",
						"**Centralización:** Organiza el estado global en un lugar lógico.",
					],
				},
				{
					title: "❌ Desventajas",
					content: [
						"**Rendimiento:** Cuando el valor del contexto cambia, **todos** los componentes que lo consumen se vuelven a renderizar, incluso si no usan la parte del estado que cambió. Esto puede ser un problema en apps grandes.",
						"**Complejidad:** Para lógica de estado muy compleja, puede volverse difícil de manejar en comparación con soluciones como Redux que tienen patrones más estrictos.",
						"**Acoplamiento:** Los componentes que consumen el contexto se acoplan a su estructura.",
					],
				},
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "La clave es usar la herramienta correcta para el trabajo. `useState` para estado local, y `Context API` para estado global que no cambia con demasiada frecuencia. Si el rendimiento se convierte en un problema, explora alternativas como Zustand.",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question: "¿Qué problema principal resuelve la Context API de React?",
					options: [
						"La gestión de efectos secundarios.",
						"El 'prop drilling' (pasar props a través de muchos niveles).",
						"La renderización de listas largas.",
						"La estilización de componentes.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"En `useEffect(() => { ... }, [])`, ¿qué significa el array de dependencias vacío `[]`?",
					options: [
						"El efecto se ejecuta en cada renderizado.",
						"El efecto se ejecuta solo una vez, cuando el componente se monta.",
						"El efecto nunca se ejecuta.",
						"El efecto se ejecuta cuando el componente se desmonta.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Cuál es la principal desventaja de rendimiento de la Context API?",
					options: [
						"Es lento para inicializar.",
						"Consume mucha memoria.",
						"Provoca que todos los componentes consumidores se re-rendericen cuando el valor del contexto cambia.",
						"No se puede usar con `React.memo`.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Para hacer que un valor de contexto esté disponible para toda tu aplicación, ¿qué debes hacer?",
					options: [
						"Exportar el contexto y usarlo directamente en cada componente.",
						"Envolver el componente raíz de tu aplicación (como el layout) con el componente Proveedor del contexto.",
						"Llamar a una función `provideContext()` en tu archivo principal.",
						"Configurarlo en el archivo `app.json`.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
