import type { CurriculumTopic } from "../../../../types/types";

export const conference42: CurriculumTopic = {
	id: "conf-42",
	title: "Conf. 42: Mini Proyecto Inmobiliaria II",
	content: [
		{ type: "heading", text: "Mini Proyecto: App de Inmobiliaria (Parte 2)" },
		{
			type: "paragraph",
			text: "Continuamos con nuestra aplicación de inmobiliaria. En esta parte, construiremos el componente `PropertyCard` reutilizable, la pantalla de detalles de la propiedad, y el formulario para añadir nuevas propiedades, incluyendo la selección de imágenes desde el dispositivo.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 5: Crear el Componente `PropertyCard`" },
		{
			type: "paragraph",
			text: "Crea un archivo `components/PropertyCard.tsx`. Este componente mostrará un resumen de una propiedad y será el elemento que se renderizará en nuestra `FlatList`.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// components/PropertyCard.tsx
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Property } from '../db/schema';

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={\`/property/\${property.id}\`} asChild>
      <Pressable className="bg-slate-800 rounded-lg overflow-hidden mb-4">
        <Image source={{ uri: property.imageUrl! }} className="w-full h-48" />
        <View className="p-4">
          <Text className="text-white text-xl font-bold">{property.title}</Text>
          <Text className="text-slate-400 text-sm mt-1">{property.address}</Text>
          <View className="flex-row justify-between items-center mt-4">
            <Text className="text-primary-400 text-lg font-bold">
              $\{(property.price / 1000).toFixed(0)}k
            </Text>
            <Text className="text-slate-300">
              {property.bedrooms} hab · {property.bathrooms} baños
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
`,
		},
		{
			type: "paragraph",
			text: "No olvides importar y usar este componente en el `renderItem` de la `FlatList` en `app/index.tsx`.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Paso 6: Crear la Pantalla de Detalles (`app/property/[id].tsx`)",
		},
		{
			type: "paragraph",
			text: "Esta pantalla mostrará toda la información de una propiedad específica.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// app/property/[id].tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { db } from '../../db';
import { properties, Property } from '../../db/schema';
import { eq } from 'drizzle-orm';

export default function PropertyDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [property, setProperty] = useState<Property | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            const result = await db.select().from(properties).where(eq(properties.id, parseInt(id)));
            if (result.length > 0) {
                setProperty(result[0]);
            }
        };
        fetchProperty();
    }, [id]);

    if (!property) return <ActivityIndicator />;

    return (
        <ScrollView className="flex-1 bg-slate-900">
            <Stack.Screen options={{ title: property.title }} />
            <Image source={{ uri: property.imageUrl! }} className="w-full h-64" />
            <View className="p-4">
                <Text className="text-white text-3xl font-bold">{property.title}</Text>
                {/* ... más detalles de la propiedad ... */}
                <Link href={\`/add-property?editId=\${id}\`} asChild>
                    <Pressable className="bg-yellow-500 p-3 rounded-lg mt-4">
                        <Text className="text-center font-bold">Editar</Text>
                    </Pressable>
                </Link>
            </View>
        </ScrollView>
    );
}
`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Paso 7: Crear el Formulario de Añadir/Editar Propiedad",
		},
		{
			type: "paragraph",
			text: "Crea la pantalla `app/add-property.tsx`. Este formulario servirá tanto para crear nuevas propiedades como para editar las existentes.",
		},
		{
			type: "paragraph",
			text: "Instala las dependencias necesarias para la selección de imágenes:",
		},
		{
			type: "code",
			language: "bash",
			code: "npx expo install expo-image-picker expo-file-system",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// app/add-property.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { db } from '../db';
import { properties } from '../db/schema';
import { eq } from 'drizzle-orm';

export default function AddPropertyScreen() {
    const router = useRouter();
    const { editId } = useLocalSearchParams<{ editId?: string }>();
    const [title, setTitle] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    // ... otros estados para precio, dirección, etc.

    const isEditing = !!editId;

    useEffect(() => {
        if (isEditing) {
            // Lógica para cargar los datos de la propiedad a editar...
        }
    }, [editId]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1 });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        let finalImageUri = imageUri;
        if (imageUri && !imageUri.startsWith('file://')) {
            // Guardar imagen permanentemente
            const filename = imageUri.split('/').pop();
            finalImageUri = FileSystem.documentDirectory + filename;
            await FileSystem.copyAsync({ from: imageUri, to: finalImageUri });
        }

        const propertyData = { title, imageUrl: finalImageUri /*, ...otros campos */ };

        if (isEditing) {
            await db.update(properties).set(propertyData).where(eq(properties.id, parseInt(editId)));
        } else {
            await db.insert(properties).values(propertyData);
        }

        router.back();
    };

    return (
        <View className="flex-1 p-4 bg-slate-900">
            <TextInput placeholder="Título" value={title} onChangeText={setTitle} className="bg-white p-2 rounded mb-2" />
            <Button title="Seleccionar Imagen" onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri }} className="w-24 h-24 my-2" />}
            <Button title={isEditing ? "Actualizar Propiedad" : "Añadir Propiedad"} onPress={handleSubmit} />
        </View>
    );
}
`,
		},
		{
			type: "paragraph",
			text: "¡Felicidades! Has completado una aplicación full-stack local, manejando datos, imágenes y navegación compleja.",
		},
	],
};
