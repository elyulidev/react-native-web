import type { CurriculumTopic } from "../../../../types/types";

export const conference28: CurriculumTopic = {
	id: "conf-28",
	title: "Conf. 28: Manejo de Estados API",
	content: [
		{ type: "heading", text: "Manejo de Estados de Carga, Errores y Datos" },
		{
			type: "paragraph",
			text: 'Cuando realizamos una petición a una API, esta no se resuelve instantáneamente. Pasa por varios estados: está "cargando", puede "fallar" o puede "tener éxito". Gestionar y reflejar estos estados en la interfaz de usuario es crucial para una buena experiencia de usuario (UX).',
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. El Patrón de Tres Estados: `loading`, `error`, `data`",
		},
		{
			type: "paragraph",
			text: "Para cada petición de red, necesitamos manejar al menos tres piezas de estado en nuestro componente:",
		},
		{
			type: "list",
			items: [
				"**`loading` (booleano):** Es `true` mientras la petición está en curso. Lo usamos para mostrar un indicador de carga (spinner) y, a menudo, para deshabilitar botones y evitar peticiones duplicadas.",
				"**`error` (string o null):** Almacena un mensaje de error si la petición falla. Si es `null`, no hay error.",
				"**`data` (any o null):** Almacena los datos exitosos de la API. Inicialmente es `null`.",
			],
		},
		{
			type: "paragraph",
			text: "Implementemos este patrón en un componente de React Native que busca una receta.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';

// Suponiendo que tenemos una interfaz para la receta
interface Recipe {
  idMeal: string;
  strMeal: string;
}

const RecipeFetcher = () => {
  const [data, setData] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      if (!response.ok) {
        throw new Error('No se pudo conectar con el servidor.');
      }
      const jsonResponse = await response.json();
      setData(jsonResponse.meals[0]);
    } catch (e: any) {
      setError(e.message || 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Buscar Receta Aleatoria" onPress={handleFetch} disabled={loading} />

      {/* Renderizado Condicional basado en el estado */}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.feedback} />}
      {error && <Text style={[styles.feedback, styles.errorText]}>{error}</Text>}
      {data && (
        <View style={styles.feedback}>
          <Text style={styles.title}>Receta Encontrada:</Text>
          <Text>{data.strMeal}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', padding: 20 },
    feedback: { marginTop: 20, alignItems: 'center' },
    errorText: { color: 'red' },
    title: { fontWeight: 'bold', fontSize: 18, marginBottom: 5 }
});

export default RecipeFetcher;
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Mejorando la Experiencia del Usuario (UX)" },
		{
			type: "paragraph",
			text: "El código anterior funciona, pero podemos mejorar significativamente la experiencia del usuario con pequeños ajustes.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "ActivityIndicator",
					title: "Indicadores de Carga Claros",
					text: 'Usar un `ActivityIndicator` (spinner) es fundamental. Le dice al usuario: "La aplicación está trabajando, por favor espera". Sin esto, la app podría parecer bloqueada o que no responde.',
				},
				{
					icon: "ChatBubbleBottomCenterTextIcon",
					title: "Mensajes de Error Amigables",
					text: 'Evita mostrar errores técnicos como "Failed to fetch". En su lugar, muestra mensajes que el usuario pueda entender, como "No se pudo conectar. Revisa tu conexión a internet e inténtalo de nuevo".',
				},
				{
					icon: "RectangleStackIcon",
					title: "Estados Vacíos (Empty States)",
					text: 'Si una búsqueda no devuelve resultados, no dejes la pantalla en blanco. Muestra un mensaje como "No se encontraron recetas para tu búsqueda" y, si es posible, una sugerencia para intentarlo de nuevo.',
				},
				{
					icon: "PowerIcon",
					title: "Deshabilitar Controles",
					text: "Mientras `loading` es `true`, deshabilita los botones que inician la petición para prevenir que el usuario haga clic varias veces y envíe múltiples peticiones idénticas.",
				},
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Encapsulando la Lógica en un Hook Personalizado",
		},
		{
			type: "paragraph",
			text: "El patrón de `loading`, `error` y `data` es tan común que podemos extraerlo a un hook personalizado, `useApi`, para reutilizarlo en toda nuestra aplicación y mantener nuestros componentes más limpios.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { useState, useCallback } from 'react';

export const useApi = <T>(apiFunc: (...args: any[]) => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (...args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc(...args);
      setData(result);
      return result;
    } catch (e: any) {
      setError(e.message || 'Error inesperado');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return { data, loading, error, request };
};

// --- Cómo usarlo en un componente ---
// const api = {
//   getRecipes: () => fetch(...).then(res => res.json())
// };
// const { data, loading, error, request: fetchRecipes } = useApi(api.getRecipes);
// useEffect(() => { fetchRecipes(); }, []);
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "Este es un ejemplo simplificado. Librerías como React Query o SWR llevan esta idea mucho más lejos, manejando caché, reintentos y mucho más de forma automática.",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Al hacer una llamada a una API, ¿cuál de los siguientes NO es uno de los tres estados principales a manejar?",
					options: ["loading", "error", "data", "cached"],
					correctAnswer: 3,
				},
				{
					question:
						"¿Qué componente de React Native se usa comúnmente para mostrar un indicador de carga?",
					options: [
						"<LoadingSpinner />",
						"<ProgressView />",
						"<ActivityIndicator />",
						"<Spinner />",
					],
					correctAnswer: 2,
				},
				{
					question:
						"¿Por qué es una buena práctica deshabilitar un botón de 'Enviar' mientras una petición de red está en curso?",
					options: [
						"Para mejorar la seguridad de la aplicación.",
						"Para evitar que el usuario envíe peticiones duplicadas accidentalmente.",
						"Para ahorrar batería en el dispositivo.",
						"Porque es un requisito de las tiendas de aplicaciones.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"En el patrón de `loading, error, data`, ¿cuál es el propósito del bloque `finally` en una estructura `try/catch/finally`?",
					options: [
						"Para ejecutar código solo si la petición tuvo éxito.",
						"Para capturar y manejar el error.",
						"Para ejecutar código sin importar si la petición tuvo éxito o falló, ideal para `setLoading(false)`.",
						"Para reiniciar el estado a sus valores iniciales.",
					],
					correctAnswer: 2,
				},
			],
		},
	],
};
