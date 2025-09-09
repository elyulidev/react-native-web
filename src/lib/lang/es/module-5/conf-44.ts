import type { CurriculumTopic } from "../../../../types/types";

export const conference44: CurriculumTopic = {
	id: "conf-44",
	title: "Conf. 44: Componentes Reusables y Patrones",
	content: [
		{ type: "heading", text: "Componentes Reusables y Patrones de Diseño" },
		{
			type: "paragraph",
			text: "Crear componentes reusables es más que simplemente evitar la duplicación de código. Se trata de construir un sistema de diseño consistente y predecible que acelera el desarrollo y mejora la calidad de la aplicación. En esta sesión, nos centraremos en cómo diseñar componentes de UI verdaderamente reusables.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. La Anatomía de un Buen Componente Reusable" },
		{
			type: "list",
			items: [
				"**Única Responsabilidad:** Un componente `Button` debe ser solo un botón. No debe contener lógica de negocio sobre qué pasa cuando se hace clic, solo debe *informar* que fue presionado.",
				"**API de Props Clara:** Las propiedades (`props`) de un componente son su API pública. Deben ser claras, predecibles y bien tipadas. Usa nombres como `variant`, `size`, `title`, `onPress`.",
				"**Estilización Flexible:** El componente debe tener estilos base, pero permitir personalizaciones. Por ejemplo, aceptar una prop `style` o `className` para sobrescribir o añadir estilos.",
				'**Composición sobre Configuración:** Prefiere usar la prop `children` para pasar contenido complejo en lugar de crear muchas props para cada pequeña variación. Un componente `<Card>{children}</Card>` es más flexible que un `<Card title="..." content="..." footer="..." />`.',
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Práctica: Creando un Componente `<Button>` Reusable",
		},
		{
			type: "paragraph",
			text: "Vamos a construir un componente de botón que pueda tener diferentes variantes (primario, secundario) y tamaños, y que sea completamente reutilizable en nuestra aplicación.",
		},
		{ type: "paragraph", text: "Crea un archivo `components/ui/Button.tsx`." },
		{
			type: "code",
			language: "tsx",
			code: `
import React from 'react';
import { Pressable, Text, PressableProps } from 'react-native';

// 1. Definir las props
interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  className?: string; // Para personalización externa
}

// 2. Mapear variantes y tamaños a clases de NativeWind
const baseClasses = 'justify-center items-center rounded-lg font-bold';

const variantClasses = {
  primary: 'bg-primary-500 active:bg-primary-600',
  secondary: 'bg-slate-700 active:bg-slate-800',
  destructive: 'bg-red-600 active:bg-red-700',
};

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
};

const textVariantClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    destructive: 'text-white',
};

// 3. Crear el componente
const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
  return (
    <Pressable
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${className}\`}
      {...props}
    >
      <Text className={\`\${textVariantClasses[variant]} font-bold \${size === 'sm' ? 'text-sm' : 'text-base'}\`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
`,
		},
		{
			type: "paragraph",
			text: "Ahora, en cualquier parte de tu app, puedes usarlo así:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
<Button title="Acción Principal" variant="primary" size="lg" onPress={handleSave} />
<Button title="Cancelar" variant="secondary" onPress={handleCancel} />
<Button title="Eliminar" variant="destructive" className="mt-4" onPress={handleDelete} />
`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Patrón de Composición: Creando un `<Card>` Genérico",
		},
		{
			type: "paragraph",
			text: "Un componente de tarjeta es un contenedor común. En lugar de forzar una estructura de título/contenido, lo haremos flexible usando `children`.",
		},
		{ type: "paragraph", text: "Crea `components/ui/Card.tsx`." },
		{
			type: "code",
			language: "tsx",
			code: `
import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <View
      className={\`bg-slate-800 rounded-lg p-4 border border-slate-700 \${className}\`}
      {...props}
    >
      {children}
    </View>
  );
};

export default Card;
`,
		},
		{
			type: "paragraph",
			text: "Este `Card` ahora puede contener cualquier cosa, dándole una flexibilidad increíble:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// Uso simple
<Card>
  <Text>Este es un contenido simple.</Text>
</Card>

// Uso complejo, como en nuestro proyecto de inmobiliaria
<Card className="mb-4">
    <Image source={{ uri: property.imageUrl! }} className="w-full h-48 rounded-t-lg" />
    <View className="p-4">
        <Text className="text-white text-xl font-bold">{property.title}</Text>
        {/* ... más contenido ... */}
        <Button title="Ver Detalles" className="mt-4" />
    </View>
</Card>
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: 'Este patrón, donde un componente se usa para "envolver" a otros, se conoce como composición y es uno de los conceptos más fundamentales y poderosos de React.',
		},
	],
};
