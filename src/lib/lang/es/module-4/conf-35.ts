import type { CurriculumTopic } from "../../../../types/types";

export const conference35: CurriculumTopic = {
	id: "conf-35",
	title: "Conf. 35: Búsqueda y Filtrado",
	content: [
		{ type: "heading", text: "Búsqueda y Filtrado Dinámico" },
		{
			type: "paragraph",
			text: 'Combinar una búsqueda por texto con filtros por categorías es una característica poderosa en muchas aplicaciones, desde e-commerce hasta apps de recetas. Permite a los usuarios acotar los resultados de manera precisa. En esta conferencia, aprenderemos cómo gestionar el estado de múltiples filtros y combinarlos con una búsqueda "debounced".',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Gestión del Estado para Múltiples Filtros" },
		{
			type: "paragraph",
			text: "Primero, necesitamos una forma de almacenar qué filtros están activos. Usaremos `useState` para gestionar tanto el término de búsqueda como la categoría seleccionada.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { useState, useEffect } from 'react';
// ...

const CATEGORIES = ['Beef', 'Chicken', 'Dessert', 'Pasta'];

const RecipeSearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ... resto de la lógica
}
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Creación de la UI para los Filtros" },
		{
			type: "paragraph",
			text: "Podemos usar una serie de botones o un `ScrollView` horizontal para mostrar las categorías disponibles. El estilo del botón cambiará para indicar cuál está actualmente seleccionado.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// Dentro del componente RecipeSearchScreen

const handleSelectCategory = (category: string) => {
  // Si se presiona la misma categoría, se deselecciona.
  setSelectedCategory(prev => (prev === category ? null : category));
};

return (
  <View>
    {/* ... TextInput de búsqueda ... */}
    <View className="my-4">
      <Text className="font-bold mb-2">Categorías</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map(category => (
          <Pressable
            key={category}
            onPress={() => handleSelectCategory(category)}
            className={\`p-3 mr-2 rounded-full \${selectedCategory === category ? 'bg-blue-500' : 'bg-gray-200'}\`}
          >
            <Text className={\`font-semibold \${selectedCategory === category ? 'text-white' : 'text-black'}\`}>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
    {/* ... FlatList de resultados ... */}
  </View>
);
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Combinando Búsqueda y Filtros en la Lógica" },
		{
			type: "paragraph",
			text: 'Ahora, necesitamos que nuestra llamada a la API reaccione a los cambios tanto en el término de búsqueda "debounced" como en la categoría seleccionada. Podemos lograr esto haciendo que nuestro `useEffect` principal dependa de ambos valores.',
		},
		{
			type: "paragraph",
			text: "Modificaremos nuestra llamada a la API para que, si hay una categoría seleccionada, la utilice. TheMealDB nos permite filtrar por categoría.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// ... dentro del componente

const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  const fetchRecipes = async () => {
    setLoading(true);
    let url = '';

    if (selectedCategory) {
      // Si hay una categoría, filtramos por ella Y opcionalmente por el término de búsqueda
      url = \`https://www.themealdb.com/api/json/v1/1/filter.php?c=\${selectedCategory}\`;
    } else if (debouncedSearchTerm) {
      // Si no hay categoría pero sí un término de búsqueda
      url = \`https://www.themealdb.com/api/json/v1/1/search.php?s=\${debouncedSearchTerm}\`;
    } else {
      // Si no hay nada, no buscamos
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      let meals = data.meals || [];

      // Si hay categoría Y término de búsqueda, filtramos localmente los resultados de la categoría
      if (selectedCategory && debouncedSearchTerm) {
        meals = meals.filter((meal: any) =>
          meal.strMeal.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
      }

      setResults(meals);
    } catch (e) {
      setError('Error al cargar recetas.');
    } finally {
      setLoading(false);
    }
  };

  fetchRecipes();
// El efecto se dispara si el término debounced O la categoría cambian
}, [debouncedSearchTerm, selectedCategory]);
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Nota: TheMealDB no permite buscar por texto y categoría en una sola llamada. Por eso, si ambos están activos, primero filtramos por categoría (que devuelve una lista) y luego filtramos esa lista localmente por el término de búsqueda. Otras APIs podrían permitir ambos filtros en la misma petición.",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"En un `useEffect` que depende de múltiples estados como `[debouncedSearchTerm, selectedCategory]`, ¿cuándo se ejecuta la función del efecto?",
					options: [
						"Solo cuando ambos estados cambian al mismo tiempo.",
						"Cuando cualquiera de los dos estados cambia su valor.",
						"Solo cuando el componente se monta por primera vez.",
						"Cada vez que el componente se renderiza.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Para crear una lista horizontal de botones de filtro que se pueda desplazar, ¿qué componente es el más adecuado?",
					options: [
						"`<View style={{ flexDirection: 'row' }}`",
						"`FlatList` con `horizontal={true}`",
						"`ScrollView` con `horizontal={true}`",
						"Cualquiera de las anteriores funcionará igual de bien.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Si una API no permite filtrar por categoría y buscar por texto en la misma petición, ¿cuál es una estrategia válida?",
					options: [
						"Mostrar un error al usuario.",
						"Hacer dos peticiones separadas y tratar de combinarlas.",
						"Hacer la petición más restrictiva (ej. por categoría) y luego filtrar los resultados localmente con el segundo criterio.",
						"Es imposible implementar esta funcionalidad.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"En la UI de filtros, ¿cómo se puede implementar la funcionalidad de deseleccionar una categoría si se vuelve a presionar?",
					options: [
						"Usando dos botones, uno para seleccionar y otro para deseleccionar.",
						"En el manejador de eventos, comparar la categoría presionada con el estado actual y poner el estado a `null` si son iguales.",
						"Es una funcionalidad automática del componente `Pressable`.",
						"Usando un `useEffect` para resetear el estado.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
