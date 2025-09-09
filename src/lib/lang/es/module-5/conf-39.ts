import type { CurriculumTopic } from "../../../../types/types";

export const conference39: CurriculumTopic = {
	id: "conf-39",
	title: "Conf. 39: Depuración y Manejo de Errores",
	content: [
		{ type: "heading", text: "Depuración y Manejo de Errores" },
		{
			type: "paragraph",
			text: "Incluso el código mejor escrito puede tener errores. Aprender a depurar eficazmente y a manejar errores de forma elegante es lo que diferencia a un desarrollador junior de uno senior. En esta sesión, exploraremos las herramientas de Expo y un patrón crucial: los Error Boundaries.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Herramientas de Depuración en Expo" },
		{
			type: "paragraph",
			text: "Expo proporciona un menú de desarrollo muy potente que puedes abrir agitando tu dispositivo físico o presionando `Shift+M` en el simulador de iOS y `Cmd+M` (o `Ctrl+M` en Windows/Linux) en el emulador de Android.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "CodeBracketIcon",
					title: "Abrir Depurador de JavaScript",
					text: "Abre las herramientas de desarrollo de Chrome, permitiéndote usar la consola, poner puntos de interrupción (breakpoints) y analizar el rendimiento.",
				},
				{
					icon: "RectangleGroupIcon",
					title: "Mostrar Inspector de Elementos",
					text: "Te permite tocar cualquier elemento de la UI en tu app y ver sus estilos, similar al inspector de elementos del navegador.",
				},
				{
					icon: "ArrowPathIcon",
					title: "Recargar App / Recarga Rápida",
					text: "Reinicia tu aplicación. La Recarga Rápida (Fast Refresh) intenta recargar solo los archivos que cambiaste, manteniendo el estado.",
				},
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "El uso de `console.log()` es tu primera línea de defensa. Úsalo generosamente para rastrear el flujo de tu aplicación y el valor de las variables en puntos clave.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. El Problema: Un Error en un Componente Rompe Todo",
		},
		{
			type: "paragraph",
			text: "Por defecto, un error de renderizado en un componente de React (por ejemplo, intentar acceder a una propiedad de un objeto nulo) hará que todo el árbol de componentes se desmonte, mostrando una pantalla roja de error en desarrollo o simplemente cerrando la aplicación en producción. Esto es una experiencia de usuario terrible.",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/error-boundary-concept.png",
			caption:
				"Sin un Error Boundary, un error en un componente pequeño puede hacer que toda la aplicación falle.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. La Solución: Error Boundaries" },
		{
			type: "paragraph",
			text: "Un Error Boundary (Límite de Error) es un componente especial de React que **atrapa errores** de JavaScript en sus componentes hijos, registra esos errores y muestra una **UI de respaldo** en lugar del árbol de componentes que falló.",
		},
		{
			type: "paragraph",
			text: "A diferencia de otros componentes, los Error Boundaries deben ser **componentes de clase**.",
		},

		{
			type: "paragraph",
			text: "**Paso 1: Crear el Componente `ErrorBoundary`**",
		},
		{
			type: "paragraph",
			text: "Crea un archivo `components/ErrorBoundary.tsx`.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, Button } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Actualiza el estado para que el siguiente renderizado muestre la UI de respaldo.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Aquí podrías registrar el error en un servicio externo
    console.error("Error Atrapado por ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI de respaldo que desees
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 10 }}>
            Oops, algo salió mal.
          </Text>
          <Text style={{ color: 'gray', textAlign: 'center', marginBottom: 20 }}>
            Nuestro equipo ha sido notificado. Por favor, intenta reiniciar la aplicación.
          </Text>
          {/* En una app real, podrías añadir un botón para reiniciar la app */}
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
`,
		},
		{ type: "paragraph", text: "**Paso 2: Envolver tu Aplicación**" },
		{
			type: "paragraph",
			text: "Ahora, puedes usar tu `ErrorBoundary` para envolver partes de tu aplicación. Un buen lugar para empezar es en tu layout raíz (`app/_layout.tsx`) para atrapar cualquier error de navegación o de las pantallas principales.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { Stack } from 'expo-router';
import ErrorBoundary from '../components/ErrorBoundary'; // Ajusta la ruta

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <Stack>
        <Stack.Screen name="index" />
        {/* ... otras pantallas */}
      </Stack>
    </ErrorBoundary>
  );
}`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "También puedes colocar Error Boundaries en lugares más específicos, como alrededor de un widget complejo que podría fallar, permitiendo que el resto de la aplicación siga funcionando.",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál es el comportamiento por defecto de React en producción si ocurre un error de renderizado en un componente?",
					options: [
						"Muestra un mensaje de advertencia en la consola.",
						"Ignora el error y continúa.",
						"Desmonta todo el árbol de componentes, probablemente cerrando la app.",
						"Muestra una UI de respaldo genérica.",
					],
					correctAnswer: 2,
				},
				{
					question: "Un Error Boundary debe ser implementado como...",
					options: [
						"Un hook personalizado.",
						"Un componente funcional usando `useState` y `useEffect`.",
						"Un componente de clase con los métodos `getDerivedStateFromError` y/o `componentDidCatch`.",
						"Una configuración en `app.json`.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"¿Qué método del ciclo de vida de un Error Boundary se usa para renderizar una UI de respaldo después de que se ha lanzado un error?",
					options: [
						"`componentDidCatch`",
						"`renderError`",
						"`getDerivedStateFromError`",
						"`componentDidUpdate`",
					],
					correctAnswer: 2,
				},
				{
					question:
						"¿Para qué sirve el método `componentDidCatch` en un Error Boundary?",
					options: [
						"Para actualizar el estado y mostrar la UI de respaldo.",
						"Para registrar la información del error (ej. enviarla a un servicio de monitoreo).",
						"Para prevenir que el error ocurra.",
						"Para reiniciar la aplicación.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
