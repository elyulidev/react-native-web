import type { CurriculumTopic } from "../../../../types/types";

export const conference41: CurriculumTopic = {
	id: "conf-41",
	title: "Conf. 41: Mini Proyecto Inmobiliaria I",
	content: [
		{ type: "heading", text: "Mini Proyecto: App de Inmobiliaria (Parte 1)" },
		{
			type: "paragraph",
			text: "En este proyecto de dos partes, construiremos una aplicación de listado de propiedades inmobiliarias. Toda la información se gestionará localmente usando SQLite y Drizzle ORM. En esta primera parte, nos centraremos en la configuración, el modelo de datos, y la creación de la pantalla principal que muestra y filtra las propiedades.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 1: Configuración del Proyecto" },
		{
			type: "paragraph",
			text: "Crea un nuevo proyecto Expo e instala todas las dependencias que hemos aprendido a usar.",
		},
		{
			type: "code",
			language: "bash",
			code: `
# 1. Crear el proyecto
npx create-expo-app@latest real-estate-app --template blank-ts
cd real-estate-app

# 2. Instalar Drizzle y SQLite
npx expo install expo-sqlite
npm install drizzle-orm
npm install -D drizzle-kit

# 3. Instalar NativeWind
npm install nativewind
npm install --dev tailwindcss

# 4. Instalar dependencias adicionales
npm install @expo/vector-icons
`,
		},
		{
			type: "paragraph",
			text: "Sigue los pasos de las conferencias anteriores para configurar Drizzle (`drizzle.config.ts`, `package.json scripts`), NativeWind (`tailwind.config.js`, `babel.config.js`, `global.css`), y la importación de CSS en `app/_layout.tsx`.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Paso 2: Definir el Esquema de la Base de Datos",
		},
		{
			type: "paragraph",
			text: "Crea el archivo `db/schema.ts` para definir la tabla de propiedades.",
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
  imageUrl: text('image_url'), // Almacenaremos la URI del archivo local
  price: real('price').notNull(),
  bedrooms: integer('bedrooms').notNull().default(1),
  bathrooms: integer('bathrooms').notNull().default(1),
  type: text('type', { enum: ['Casa', 'Apartamento', 'Terreno'] }).default('Casa'),
});

export type Property = typeof properties.$inferSelect;
`,
		},
		{ type: "paragraph", text: "Ahora, genera la migración:" },
		{ type: "code", language: "bash", code: "npm run generate" },
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 3: Seeding con Datos de Prueba" },
		{
			type: "paragraph",
			text: "Crea un archivo `db/seed.ts` para poblar la base de datos con algunas propiedades de ejemplo. Esto es crucial para poder desarrollar la UI sin tener que añadir datos manualmente.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/seed.ts
import { db } from './';
import { properties } from './schema';

const sampleProperties = [
    { title: 'Villa Moderna con Piscina', address: '123 Calle Sol, Miami', price: 1200000, bedrooms: 4, bathrooms: 3, type: 'Casa', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811' },
    { title: 'Apartamento Céntrico', address: '456 Av. Principal, Nueva York', price: 750000, bedrooms: 2, bathrooms: 2, type: 'Apartamento', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2' },
    { title: 'Terreno con Vistas al Mar', address: '789 Camino Costa, Malibú', price: 2500000, bedrooms: 0, bathrooms: 0, type: 'Terreno', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750' },
];

export async function seed() {
    console.log('Seeding database...');
    await db.delete(properties); // Limpiar datos antiguos
    await db.insert(properties).values(sampleProperties);
    console.log('Seeding complete!');
}
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "Para las imágenes, usaremos URLs de Unsplash por simplicidad. En la segunda parte, las reemplazaremos con imágenes del sistema de archivos local.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Paso 4: Construir la Pantalla de Listado (`app/index.tsx`)",
		},
		{
			type: "paragraph",
			text: "Esta pantalla mostrará los filtros y la lista de propiedades.",
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
// Importa tu componente de tarjeta de propiedad
// import PropertyCard from '../components/PropertyCard';
// import { seed } from '../db/seed'; // Para un botón de seeding

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
            console.error("Error al cargar propiedades:", e);
        } finally {
            setLoading(false);
        }
    }, [activeFilters]);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    // Aquí iría la UI con los filtros y la FlatList
    // que renderiza los componentes <PropertyCard />
    return (
        <SafeAreaView className="flex-1 bg-slate-900">
            <Text className="text-white text-2xl p-4">Propiedades</Text>
            {/* UI de Filtros aquí */}
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
			text: "En la siguiente conferencia, construiremos el componente `PropertyCard`, la pantalla de detalles y el formulario para añadir nuevas propiedades.",
		},
	],
};
