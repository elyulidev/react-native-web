import type { CurriculumTopic } from "../../../../types/types";

export const conference44: CurriculumTopic = {
	id: "conf-44",
	title: "Conf. 44: Componentes Reutilizáveis e Padrões",
	content: [
		{ type: "heading", text: "Componentes Reutilizáveis e Padrões de Design" },
		{
			type: "paragraph",
			text: "Criar componentes reutilizáveis é mais do que simplesmente evitar a duplicação de código. Trata-se de construir um sistema de design consistente e previsível que acelera o desenvolvimento e melhora a qualidade da aplicação. Nesta sessão, focaremos em como projetar componentes de UI verdadeiramente reutilizáveis.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. A Anatomia de um Bom Componente Reutilizável",
		},
		{
			type: "list",
			items: [
				"**Responsabilidade Única:** Um componente `Button` deve ser apenas um botão. Não deve conter lógica de negócio sobre o que acontece quando é clicado, deve apenas *informar* que foi pressionado.",
				"**API de Props Clara:** As propriedades (`props`) de um componente são a sua API pública. Devem ser claras, previsíveis e bem tipadas. Use nomes como `variant`, `size`, `title`, `onPress`.",
				"**Estilização Flexível:** O componente deve ter estilos base, mas permitir personalizações. Por exemplo, aceitar uma prop `style` ou `className` para sobrescrever ou adicionar estilos.",
				'**Composição sobre Configuração:** Prefira usar a prop `children` para passar conteúdo complexo em vez de criar muitas props para cada pequena variação. Um componente `<Card>{children}</Card>` é mais flexível do que um `<Card title="..." content="..." footer="..." />`.',
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Prática: Criando um Componente `<Button>` Reutilizável",
		},
		{
			type: "paragraph",
			text: "Vamos construir um componente de botão que possa ter diferentes variantes (primário, secundário) e tamanhos, e que seja completamente reutilizável na nossa aplicação.",
		},
		{ type: "paragraph", text: "Crie um ficheiro `components/ui/Button.tsx`." },
		{
			type: "code",
			language: "tsx",
			code: `
import React from 'react';
import { Pressable, Text, PressableProps } from 'react-native';

// 1. Definir as props
interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  className?: string; // Para personalização externa
}

// 2. Mapear variantes e tamanhos para classes do NativeWind
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

// 3. Criar o componente
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
			text: "Agora, em qualquer parte da sua app, pode usá-lo assim:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
<Button title="Ação Principal" variant="primary" size="lg" onPress={handleSave} />
<Button title="Cancelar" variant="secondary" onPress={handleCancel} />
<Button title="Eliminar" variant="destructive" className="mt-4" onPress={handleDelete} />
`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Padrão de Composição: Criando um `<Card>` Genérico",
		},
		{
			type: "paragraph",
			text: "Um componente de cartão é um contentor comum. Em vez de forçar uma estrutura de título/conteúdo, vamos torná-lo flexível usando `children`.",
		},
		{ type: "paragraph", text: "Crie `components/ui/Card.tsx`." },
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
			text: "Este `Card` agora pode conter qualquer coisa, dando-lhe uma flexibilidade incrível:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// Uso simples
<Card>
  <Text>Este é um conteúdo simples.</Text>
</Card>

// Uso complexo, como no nosso projeto de imobiliária
<Card className="mb-4">
    <Image source={{ uri: property.imageUrl! }} className="w-full h-48 rounded-t-lg" />
    <View className="p-4">
        <Text className="text-white text-xl font-bold">{property.title}</Text>
        {/* ... mais conteúdo ... */}
        <Button title="Ver Detalhes" className="mt-4" />
    </View>
</Card>
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: 'Este padrão, onde um componente é usado para "envolver" outros, é conhecido como composição e é um dos conceitos mais fundamentais e poderosos do React.',
		},
	],
};
