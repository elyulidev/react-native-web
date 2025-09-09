import type { CurriculumTopic } from "../../../../types/types";

export const conference27: CurriculumTopic = {
	id: "conf-27",
	title: "Conf. 27: Consumo de APIs",
	content: [
		{ type: "heading", text: "Consumo de APIs Externas con Fetch" },
		{
			type: "paragraph",
			text: "La mayoría de las aplicaciones móviles modernas son dinámicas, lo que significa que obtienen datos de un servidor a través de Internet. Aprender a consumir APIs (Interfaces de Programación de Aplicaciones) es una habilidad fundamental. En esta conferencia, nos centraremos en `fetch`, la API del navegador incorporada para realizar peticiones de red.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Realizando Peticiones HTTP con `fetch`" },
		{
			type: "paragraph",
			text: "`fetch` es una función basada en promesas que nos permite hacer peticiones HTTP. Su uso más simple es hacer una petición GET a un endpoint.",
		},
		{
			type: "code",
			language: "javascript",
			code: `
async function getRecipes() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');

    if (!response.ok) {
      // Si la respuesta no es exitosa (ej. 404, 500), lanzamos un error.
      throw new Error(\`Error HTTP: \${response.status}\`);
    }

    const data = await response.json(); // Parsea la respuesta JSON a un objeto JS
    console.log(data.meals[0]);
  } catch (error) {
    console.error('No se pudieron obtener las recetas:', error);
  }
}
`,
		},
		{
			type: "list",
			items: [
				"**`async/await`**: Usamos esta sintaxis para manejar el código asíncrono de una manera más legible.",
				"**`fetch(URL)`**: Realiza la petición GET. Devuelve una promesa que se resuelve en un objeto `Response`.",
				"**`response.ok`**: Es una propiedad booleana que es `true` si el código de estado HTTP está en el rango 200-299.",
				"**`response.json()`**: Es un método del objeto `Response` que también devuelve una promesa. Se resuelve con el resultado de parsear el cuerpo del texto de la respuesta como JSON.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Manejo y Transformación de Datos JSON" },
		{
			type: "paragraph",
			text: "JSON (JavaScript Object Notation) es el formato estándar para intercambiar datos en la web. Cuando recibimos una respuesta de una API, generalmente viene como un string JSON. El método `response.json()` hace el trabajo pesado de convertir este string en un objeto o array de JavaScript con el que podemos trabajar.",
		},
		{
			type: "paragraph",
			text: "Es una buena práctica crear interfaces de TypeScript para la data que esperamos recibir. Esto nos da autocompletado y seguridad de tipos.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
interface Meal {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
}

async function getTypedRecipes(): Promise<Meal[] | null> {
  try {
    const response = await fetch('...');
    if (!response.ok) throw new Error('Error de red');

    // Tipamos la respuesta esperada
    const data: { meals: Meal[] } = await response.json();

    return data.meals;
  } catch (error) {
    console.error(error);
    return null;
  }
}
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Realizando Peticiones POST" },
		{
			type: "paragraph",
			text: "Para enviar datos a un servidor (como al crear un nuevo recurso), usamos una petición POST. `fetch` acepta un segundo argumento, un objeto de configuración, para especificar el método, las cabeceras y el cuerpo de la petición.",
		},
		{
			type: "code",
			language: "javascript",
			code: `
async function createPost(title, body) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST', // 1. Especificar el método
      headers: {
        'Content-Type': 'application/json', // 2. Indicar que enviamos JSON
      },
      body: JSON.stringify({ // 3. Convertir nuestro objeto JS a un string JSON
        title: title,
        body: body,
        userId: 1,
      }),
    });

    if (!response.ok) throw new Error(\`Error: \${response.status}\`);

    const createdPost = await response.json();
    console.log('Post creado:', createdPost);
  } catch (error) {
    console.error('Error al crear el post:', error);
  }
}
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Gestión Segura de Claves API" },
		{
			type: "paragraph",
			text: "Muchas APIs requieren una clave (API Key) para autenticar las peticiones. Es **extremadamente importante** no escribir estas claves directamente en tu código fuente (`hardcoding`), ya que si subes tu código a un repositorio público, cualquiera podría robarlas.",
		},
		{
			type: "paragraph",
			text: "La solución es usar **variables de entorno**. Creamos un archivo `.env` en la raíz de nuestro proyecto (que **nunca** debe ser subido a Git) y almacenamos nuestras claves allí.",
		},
		{
			type: "code",
			language: "bash",
			code: `
# .env
# Añade este archivo a tu .gitignore
MEALDB_API_KEY="tu_clave_aqui"
`,
		},
		{
			type: "paragraph",
			text: "Expo puede cargar estas variables de entorno en tu aplicación si las prefijas con `EXPO_PUBLIC_`. Luego, puedes acceder a ellas en tu código a través de `process.env`.",
		},
		{
			type: "code",
			language: "javascript",
			code: `
// En tu código
const apiKey = process.env.EXPO_PUBLIC_MEALDB_API_KEY;
const url = \`https://www.themealdb.com/api/json/v2/\${apiKey}/search.php?s=Arrabiata\`;
// ... usar la url en la petición fetch
`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Para que los cambios en `.env` surtan efecto, necesitas reiniciar el servidor de desarrollo de Expo.",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Qué método del objeto `Response` de `fetch` se usa para convertir una respuesta JSON en un objeto JavaScript?",
					options: [
						"`.parseJSON()`",
						"`.text()`",
						"`.json()`",
						"`.toObject()`",
					],
					correctAnswer: 2,
				},
				{
					question:
						"En una petición `fetch` para enviar datos, ¿qué propiedad del objeto de configuración se usa para especificar el método HTTP?",
					options: ["`httpMethod`", "`type`", "`action`", "`method`"],
					correctAnswer: 3,
				},
				{
					question:
						"¿Por qué es una mala práctica escribir claves de API directamente en el código?",
					options: [
						"Porque hace el código más largo.",
						"Porque puede exponer las claves si el código se hace público, creando un riesgo de seguridad.",
						"Porque las claves de API cambian con frecuencia.",
						"Porque ralentiza la compilación de la aplicación.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Cómo se accede a una variable de entorno llamada `EXPO_PUBLIC_API_URL` en el código de una aplicación Expo?",
					options: [
						"`Expo.env.API_URL`",
						"`process.env.EXPO_PUBLIC_API_URL`",
						"`environment.API_URL`",
						"`env('EXPO_PUBLIC_API_URL')`",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
