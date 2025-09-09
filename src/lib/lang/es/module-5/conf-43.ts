import type { CurriculumTopic } from "../../../../types/types";

export const conference43: CurriculumTopic = {
	id: "conf-43",
	title: "Conf. 43: UI Responsiva",
	content: [
		{ type: "heading", text: "Diseño de UI Responsiva" },
		{
			type: "paragraph",
			text: "A diferencia de la web, en el mundo móvil hay una enorme variedad de tamaños de pantalla, densidades de píxeles y orientaciones. Un diseño responsivo asegura que tu aplicación se vea y funcione bien en todos los dispositivos, desde un teléfono pequeño hasta una tableta grande.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. `Dimensions` API: Conociendo el Tamaño de la Pantalla",
		},
		{
			type: "paragraph",
			text: "La API `Dimensions` de React Native nos permite obtener el ancho y alto de la pantalla del dispositivo. Es útil para cálculos de estilo que dependen del tamaño de la pantalla.",
		},
		{
			type: "code",
			language: "javascript",
			code: `
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

console.log(\`El ancho de la ventana es \${width} y el alto es \${height}\`);

// Uso en un estilo:
// const styles = StyleSheet.create({
//   container: {
//     width: width / 2, // Ocupa la mitad del ancho de la pantalla
//   }
// });
`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "`Dimensions.get()` no se actualiza automáticamente si el usuario rota el dispositivo. Para diseños que deben cambiar con la rotación, se necesitan hooks personalizados o librerías que escuchen estos cambios.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. `PixelRatio`: Adaptándose a Diferentes Densidades",
		},
		{
			type: "paragraph",
			text: 'No todos los píxeles son iguales. Las pantallas de alta resolución (como las "Retina") tienen más píxeles físicos en el mismo espacio. `PixelRatio` nos ayuda a manejar esto para que los elementos como imágenes y bordes se vean nítidos.',
		},
		{
			type: "code",
			language: "javascript",
			code: `
import { PixelRatio, StyleSheet } from 'react-native';

const size = 50; // Tamaño base en puntos de diseño

const styles = StyleSheet.create({
  image: {
    width: PixelRatio.getPixelSizeForLayoutSize(size), // Convierte puntos a píxeles físicos
    height: PixelRatio.getPixelSizeForLayoutSize(size),
  },
  thinBorder: {
    borderWidth: 1 / PixelRatio.get(), // Crea el borde más fino posible en el dispositivo
  }
});
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Diseño Responsivo con NativeWind" },
		{
			type: "paragraph",
			text: 'NativeWind simplifica enormemente el diseño responsivo al proporcionar modificadores de "breakpoint" (puntos de quiebre), similares a los de la web. Por defecto, estos no están habilitados, pero podemos configurarlos en `tailwind.config.js`.',
		},

		{ type: "paragraph", text: "**Paso 1: Configurar Breakpoints**" },
		{
			type: "paragraph",
			text: "No hay breakpoints por defecto en NativeWind. Debemos definirlos nosotros. Un enfoque común es usar `sm`, `md`, `lg`.",
		},
		{
			type: "code",
			language: "javascript",
			code: `
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      screens: {
        'sm': '380px', // Teléfonos pequeños
        'md': '768px', // Tablets
      },
    },
  },
  // ...
};
`,
		},

		{
			type: "paragraph",
			text: "**Paso 2: Usar Modificadores en Componentes**",
		},
		{
			type: "paragraph",
			text: "Una vez configurados, podemos usar los modificadores para aplicar estilos diferentes según el ancho de la pantalla.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
<View className="bg-blue-500 p-4 md:bg-green-500">
  <Text className="text-white text-lg sm:text-xl md:text-2xl">
    Este texto cambia de tamaño!
  </Text>
</View>
`,
		},
		{
			type: "list",
			items: [
				"**`bg-blue-500`**: El fondo es azul en el tamaño más pequeño (por defecto).",
				"**`md:bg-green-500`**: Cuando el ancho de la pantalla es de 768px o más, el fondo se vuelve verde.",
				"**`text-lg sm:text-xl md:text-2xl`**: El tamaño del texto aumenta a medida que la pantalla se hace más grande.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "4. Práctica: Hacer Responsiva la Lista de Propiedades",
		},
		{
			type: "paragraph",
			text: "Vamos a aplicar estos conceptos a nuestro mini proyecto de inmobiliaria. Queremos que la `FlatList` de propiedades muestre una sola columna en teléfonos y dos columnas en tabletas.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// En la pantalla de listado de propiedades (app/index.tsx)
import { useWindowDimensions } from 'react-native';

export default function HomeScreen() {
    // ... (toda la lógica de fetch y filtros)
    const { width } = useWindowDimensions(); // Hook que se actualiza con los cambios

    const numColumns = width > 768 ? 2 : 1; // 2 columnas si es más ancho que 768px

    return (
        <SafeAreaView className="flex-1 bg-slate-900">
            {/* ... */}
            <FlatList
                data={props}
                renderItem={({ item }) => (
                    // El modificador 'md:' podría no funcionar directamente en el item
                    // si el numColumns cambia, por lo que ajustar el estilo es más fiable.
                    <View style={{ flex: 1 / numColumns, padding: 4 }}>
                        <PropertyCard property={item} />
                    </View>
                )}
                key={numColumns} // ¡Importante! Cambiar la key fuerza un re-renderizado de la lista
                numColumns={numColumns}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
}
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "El truco de `key={numColumns}` es crucial. Le dice a `FlatList` que su configuración fundamental ha cambiado, forzándola a re-renderizar su layout por completo cuando `numColumns` cambia (ej. al rotar una tableta).",
		},
	],
};
