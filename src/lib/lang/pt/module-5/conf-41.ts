import type { CurriculumTopic } from "../../../../types/types";

export const conference41: CurriculumTopic = {
	id: "conf-41",
	title: "Conf. 41: Mini Projeto de Imobiliária I",
	content: [
		{ type: "heading", text: "Mini Projeto: App de Imobiliária (Parte 1)" },
		{
			type: "paragraph",
			text: "Neste projeto de duas partes, construiremos uma aplicação de listagem de propriedades imobiliárias. Toda a informação será gerida localmente usando SQLite e Drizzle ORM. Nesta primeira parte, focaremos na configuração, no modelo de dados, e na criação do ecrã principal que exibe e filtra as propriedades.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 1: Configuração do Projeto" },
		{
			type: "paragraph",
			text: "Crie um novo projeto Expo e instale todas as dependências que aprendemos a usar.",
		},
		{
			type: "code",
			language: "bash",
			code: `
# 1. Criar o projeto
npx create-expo-app@latest real-estate-app --template blank-ts
cd real-estate-app

# 2. Instalar Drizzle e SQLite
npx expo install expo-sqlite
npm install drizzle-orm
npm install -D drizzle-kit

# 3. Instalar NativeWind
npm install nativewind
npm install --dev tailwindcss

# 4. Instalar dependências adicionais
npm install @expo/vector-icons
`,
		},
		{
			type: "paragraph",
			text: "Siga os passos das conferências anteriores para configurar o Drizzle (`drizzle.config.ts`, `package.json scripts`), o NativeWind (`tailwind.config.js`, `babel.config.js`, `global.css`), e a importação de CSS no `app/_layout.tsx`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 2: Definir o Esquema da Base de Dados" },
		{
			type: "paragraph",
			text: "Crie o ficheiro `db/schema.ts` para definir a tabela de propriedades.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/schema.ts
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const properties = sqliteTable('properties', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  address: text('address').notNull(),
  imageUrl: text('image_url'), // Armazenaremos o URI do ficheiro local
  price: real('price').notNull(),
  bedrooms: integer('bedrooms').notNull().default(1),
  bathrooms: integer('bathrooms').notNull().default(1),
  type: text('type', { enum: ['Casa', 'Apartamento', 'Terreno'] }).default('Casa'),
});

export type Property = typeof properties.$inferSelect;
`,
		},
		{ type: "paragraph", text: "Agora, gere a migração:" },
		{ type: "code", language: "bash", code: "npm run generate" },
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 3: Seeding com Dados de Teste" },
		{
			type: "paragraph",
			text: "Crie um ficheiro `db/seed.ts` para popular a base de dados com algumas propriedades de exemplo. Isto é crucial para poder desenvolver a UI sem ter de adicionar dados manualmente.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/seed.ts
import { db } from './';
import { properties } from './schema';

const sampleProperties = [
    { title: 'Moradia Moderna com Piscina', address: '123 Rua do Sol, Miami', price: 1200000, bedrooms: 4, bathrooms: 3, type: 'Casa', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811' },
    { title: 'Apartamento no Centro', address: '456 Av. Principal, Nova Iorque', price: 750000, bedrooms: 2, bathrooms: 2, type: 'Apartamento', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2' },
    { title: 'Terreno com Vista para o Mar', address: '789 Caminho da Costa, Malibu', price: 2500000, bedrooms: 0, bathrooms: 0, type: 'Terreno', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750' },
];

export async function seed() {
    console.log('A semear a base de dados...');
    await db.delete(properties); // Limpar dados antigos
    await db.insert(properties).values(sampleProperties);
    console.log('Sementeira completa!');
}
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "Para as imagens, usaremos URLs do Unsplash por simplicidade. Na segunda parte, iremos substituí-las por imagens do sistema de ficheiros local.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Passo 4: Construir o Ecrã de Listagem (`app/index.tsx`)",
		},
		{
			type: "paragraph",
			text: "Este ecrã mostrará os filtros e a lista de propriedades.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Pressable, SafeAreaView, ActivityIndicator } from 'react-native';
import { db } from '../db';
import { properties, Property } from '../db/schema';
import { sql } from 'drizzle-orm';
// Importe o seu componente de cartão de propriedade
// import PropertyCard from '../components/PropertyCard';
// import { seed } from '../db/seed'; // Para um botão de seeding

const FILTERS = {
    type: ['Casa', 'Apartamento', 'Terreno'],
    bedrooms: [1, 2, 3, 4, 5],
};

export default function HomeScreen() {
    const [props, setProps] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilters, setActiveFilters] = useState({ type: null, bedrooms: null });

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        try {
            let query = db.select().from(properties).$dynamic();
            const conditions = [];
            if (activeFilters.type) {
                conditions.push(sql\`type = \${activeFilters.type}\`);
            }
            if (activeFilters.bedrooms) {
                conditions.push(sql\`bedrooms >= \${activeFilters.bedrooms}\`);
            }
            if (conditions.length > 0) {
                query = query.where(sql.join(conditions, sql\` AND \`));
            }
            const result = await query;
            setProps(result);
        } catch (e) {
            console.error("Erro ao carregar propriedades:", e);
        } finally {
            setLoading(false);
        }
    }, [activeFilters]);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    // Aqui iria a UI com os filtros e a FlatList
    // que renderiza os componentes <PropertyCard />
    return (
        <SafeAreaView className="flex-1 bg-slate-900">
            <Text className="text-white text-2xl p-4">Propriedades</Text>
            {/* UI de Filtros aqui */}
            {loading ? <ActivityIndicator /> : (
                <FlatList
                    data={props}
                    // renderItem={({ item }) => <PropertyCard property={item} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </SafeAreaView>
    );
}
`,
		},
		{
			type: "paragraph",
			text: "Na próxima conferência, construiremos o componente `PropertyCard`, o ecrã de detalhes e o formulário para adicionar novas propriedades.",
		},
	],
};
