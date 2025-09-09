import type { CurriculumTopic } from "../../../../types/types";

export const conference42: CurriculumTopic = {
	id: "conf-42",
	title: "Conf. 42: Mini Projeto de Imobiliária II",
	content: [
		{ type: "heading", text: "Mini Projeto: App de Imobiliária (Parte 2)" },
		{
			type: "paragraph",
			text: "Continuamos com a nossa aplicação de imobiliária. Nesta parte, construiremos o componente reutilizável `PropertyCard`, o ecrã de detalhes da propriedade, e o formulário para adicionar novas propriedades, incluindo a seleção de imagens do dispositivo.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 5: Criar o Componente `PropertyCard`" },
		{
			type: "paragraph",
			text: "Crie um ficheiro `components/PropertyCard.tsx`. Este componente mostrará um resumo de uma propriedade e será o elemento renderizado na nossa `FlatList`.",
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
              {property.bedrooms} quar. · {property.bathrooms} banh.
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
			text: "Não se esqueça de importar e usar este componente no `renderItem` da `FlatList` em `app/index.tsx`.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Passo 6: Criar o Ecrã de Detalhes (`app/property/[id].tsx`)",
		},
		{
			type: "paragraph",
			text: "Este ecrã mostrará toda a informação de uma propriedade específica.",
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
                {/* ... mais detalhes da propriedade ... */}
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
			text: "Passo 7: Criar o Formulário de Adicionar/Editar Propriedade",
		},
		{
			type: "paragraph",
			text: "Crie o ecrã `app/add-property.tsx`. Este formulário servirá tanto para criar novas propriedades como para editar as existentes.",
		},
		{
			type: "paragraph",
			text: "Instale as dependências necessárias para a seleção de imagens:",
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
    // ... outros estados para preço, morada, etc.

    const isEditing = !!editId;

    useEffect(() => {
        if (isEditing) {
            // Lógica para carregar os dados da propriedade a editar...
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
            // Guardar imagem permanentemente
            const filename = imageUri.split('/').pop();
            finalImageUri = FileSystem.documentDirectory + filename;
            await FileSystem.copyAsync({ from: imageUri, to: finalImageUri });
        }

        const propertyData = { title, imageUrl: finalImageUri /*, ...outros campos */ };

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
            <Button title="Selecionar Imagem" onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri }} className="w-24 h-24 my-2" />}
            <Button title={isEditing ? "Atualizar Propriedade" : "Adicionar Propriedade"} onPress={handleSubmit} />
        </View>
    );
}
`,
		},
		{
			type: "paragraph",
			text: "Parabéns! Você completou uma aplicação full-stack local, gerindo dados, imagens e navegação complexa.",
		},
	],
};
